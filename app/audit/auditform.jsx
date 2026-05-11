"use client";

import { useMemo, useState } from "react";
import Audit from "./audit";

export default function AuditForm({ mails = [] }) {
    const [mode, setMode] = useState("online");

    const [mail, setMail] = useState("");
    const [tag, setTag] = useState("");
    const [mdp, setMdp] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [auditData, setAuditData] = useState(null);

    // Vérification mot de passe online
    const onlinePasswordValid = useMemo(() => {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(mdp);
    }, [mdp]);

    // Vérification mail existant
    const mailExists = useMemo(() => {
        return mails.includes(mail);
    }, [mail, mails]);

    // Vérification tag physique
    const tagValid = useMemo(() => {
        return tag.length === 8;
    }, [tag]);

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        // =========================
        // VALIDATIONS
        // =========================

        if (mode === "online") {
            if (!mail) {
                setError("Veuillez entrer un email");
                return;
            }

            if (!mailExists) {
                setError("Cet email n'existe pas");
                return;
            }

            if (!onlinePasswordValid) {
                setError(
                    "Le mot de passe doit contenir 8 caractères avec lettres, chiffres et symbole"
                );
                return;
            }
        }

        if (mode === "physical") {
            if (!tagValid) {
                setError("Le tag doit contenir exactement 8 caractères");
                return;
            }

            if (mdp.length !== 4) {
                setError("Le mot de passe doit contenir exactement 4 caractères");
                return;
            }
        }

        // =========================
        // ENVOI API
        // =========================

        try {
            setLoading(true);

            const body =
                mode === "online"
                    ? { mail, mdp }
                    : { tag, mdp };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/api/audit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            const data = await res.json();

            if (data.error) {
                setError(data.message || "Une erreur est survenue");
                return;
            }

            if (data.data) {
                setAuditData(data.data);
            }

        } catch (e) {
            console.log(e);

            setError("Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    }

    // =========================
    // SUCCESS
    // =========================

    if (auditData) {
        return <Audit data={auditData} />;
    }

    return (
        <main className="w-full flex justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

                {/* SWITCH */}
                <div className="flex mb-6 bg-slate-100 rounded-xl p-1">
                    <button
                        type="button"
                        onClick={() => {
                            setMode("online");
                            setError("");
                            setMdp("");
                        }}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                            mode === "online"
                                ? "bg-white shadow text-slate-900"
                                : "text-slate-500"
                        }`}
                    >
                        En Ligne
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setMode("physical");
                            setError("");
                            setMdp("");
                        }}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                            mode === "physical"
                                ? "bg-white shadow text-slate-900"
                                : "text-slate-500"
                        }`}
                    >
                        Physique
                    </button>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* ONLINE */}
                    {mode === "online" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={mail}
                                    onChange={(e) => setMail(e.target.value)}
                                    placeholder="exemple@email.com"
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                                        mail && !mailExists
                                            ? "border-red-300"
                                            : "border-slate-300 focus:border-slate-500"
                                    }`}
                                />

                                {mail && (
                                    <p
                                        className={`mt-2 text-xs ${
                                            mailExists
                                                ? "text-green-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {mailExists
                                            ? "Email valide"
                                            : "Email inexistant"}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Mot de passe
                                </label>

                                <input
                                    type="password"
                                    value={mdp}
                                    onChange={(e) => setMdp(e.target.value)}
                                    placeholder="********"
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                                        mdp && !onlinePasswordValid
                                            ? "border-red-300"
                                            : "border-slate-300 focus:border-slate-500"
                                    }`}
                                />

                                {mdp && !onlinePasswordValid && (
                                    <p className="mt-2 text-xs text-red-500">
                                        8 caractères minimum avec lettre, chiffre et symbole
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    {/* PHYSICAL */}
                    {mode === "physical" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Tag
                                </label>

                                <input
                                    type="text"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    placeholder="XXXXXXXX"
                                    maxLength={8}
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                                        tag && !tagValid
                                            ? "border-red-300"
                                            : "border-slate-300 focus:border-slate-500"
                                    }`}
                                />

                                {tag && !tagValid && (
                                    <p className="mt-2 text-xs text-red-500">
                                        Le tag doit contenir 8 caractères
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Mot de passe
                                </label>

                                <input
                                    type="password"
                                    value={mdp}
                                    onChange={(e) => setMdp(e.target.value)}
                                    placeholder="****"
                                    maxLength={4}
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                                        mdp && mdp.length !== 4
                                            ? "border-red-300"
                                            : "border-slate-300 focus:border-slate-500"
                                    }`}
                                />

                                {mdp && mdp.length !== 4 && (
                                    <p className="mt-2 text-xs text-red-500">
                                        4 caractères requis
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    {/* BTN */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-slate-900 text-white py-3 font-medium hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Chargement..." : "Auditer"}
                    </button>
                </form>
            </div>
        </main>
    );
}