"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Lock,
  LockKeyholeIcon,
  User,
  UserCheck,
} from "lucide-react";

import ModalError from "@/components/layout/modalerror"; 

export default function VoteClient({ formData, election }) {
  const { idelec } = useParams();
  const router = useRouter();

  const [saisieMdp, setSaisie] = useState(false);
  const [mdp, setMdp] = useState("");
  const [err, setErr] = useState(null);
  const [selectedCandidat, setSelectedCandidat] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    formData.append("mdp", mdp);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/election/authforvotingonline/${idelec}`,
        {
          method: "POST",
          body: formData,
          cache: "no-store",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.error === true) {
        formData.delete("mdp");
        setMdp("");
        setErr(data.message);
      } else {
        setSaisie(true);
        setErr(null);
      }
    } catch (error) {
      setErr("Erreur serveur, veuillez réessayer.");
    }
  }

  async function handleVote() {
    if (selectedCandidat == null) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/election/vote/online/${idelec}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            mdp,
            numcandid: Number(selectedCandidat),
          }),
        }
      );

      const data = await res.json();

      if (data.error === true) {
        setModalError(data.message);
        setShowConfirm(false);
      } else {
        setSuccessMsg(data.message);
        setShowConfirm(false);
      }
    } catch (error) {
      setModalError("Erreur serveur, veuillez réessayer.");
      setShowConfirm(false);
    } finally {
      setLoading(false);
    }
  }

  // ========================
  // ETAPE 1 : MDP
  // ========================
  if (!saisieMdp) {
    return (
      <section className="pt-8 space-y-6 px-4 md:px-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
            <LockKeyholeIcon />
          </div>
          <div>
            {err && <span className="text-red-600 text-sm">{err}</span>}
            <h3 className="text-lg font-bold text-slate-900">
              Mot de passe
            </h3>
            <p className="text-slate-600 text-sm">
              Saisissez le mot de passe de connexion.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input
              type="password"
              onChange={(e) => setMdp(e.target.value)}
              className="w-full p-3 rounded-lg border"
              placeholder="Mot de passe"
            />

            <button
              onClick={handleSend}
              className="w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center gap-2"
            >
              Continuer <ArrowRight />
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <CheckCircle className="mx-auto text-primary" />
            <p className="text-xs text-slate-500">
              Connexion sécurisée
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ========================
  // SUCCES
  // ========================
  if (successMsg) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
        <CheckCircle className="text-green-600 w-12 h-12" />
        <p className="text-lg font-semibold">{successMsg}</p>

        <button
          onClick={() => router.push("/")}
          className="bg-primary text-white px-6 py-2 rounded-lg"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">

      {/* Modal erreur */}
      {modalError && (
        <ModalError message={modalError} />
      )}

      {/* Modal confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center space-y-4">
            <h3 className="text-lg font-bold">
              Confirmer votre vote ?
            </h3>

            <p className="text-sm text-slate-600">
              Cette action est irréversible.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Annuler
              </button>

              <button
                onClick={handleVote}
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                {loading ? "Envoi..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">
        {election.lib}
      </h2>

      <div className="grid gap-4">
        {election.candidats.map((candidat) => (
          <label
            key={candidat.numcandid}
            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${
              selectedCandidat === candidat.numcandid
                ? "border-primary"
                : ""
            }`}
          >
            <input
              type="radio"
              checked={selectedCandidat === candidat.numcandid}
              onChange={() =>
                setSelectedCandidat(candidat.numcandid)
              }
            />

            <div className="flex items-center gap-4">
              {candidat.photo ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_URL_API}/candidats/${candidat.photo}`}
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                <User />
              )}

              <div>
                <p className="font-bold">{candidat.lib}</p>
                <p className="text-sm text-slate-500">
                  {candidat.desc}
                </p>
              </div>
            </div>

          </label>
        ))}

        {/* vote blanc */}
        <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer">
          <input
            type="radio"
            checked={selectedCandidat === 0}
            onChange={() => setSelectedCandidat(parseInt(0))}
          />
          <span>Vote Blanc</span>
        </label>
      </div>

      <button
        disabled={selectedCandidat == null}
        onClick={() => setShowConfirm(true)}
        className="mt-6 w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center gap-2"
      >
        Confirmer mon vote <UserCheck />
      </button>
    </main>
  );
}