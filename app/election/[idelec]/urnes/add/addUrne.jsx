"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";

export default function AjoutUrneClient()
{
    const { idelec } = useParams();
    const router = useRouter();

    const [addr, setAddr] = useState("");


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);


    async function handleSubmit(e)
    {
        e.preventDefault();

        if(!addr )
        {
            setMessage("l'adresse est requise");
            return;
        }

        try
        {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/api/urne/add/${idelec}`,
                {
                    method: "POST",
                    body: JSON.stringify({adresse: addr}),
                    credentials: "include",
                    headers:{
                        "content-type": "application/json"
                    }
                }
            );

            const data = await res.json();

            if(!data.error)
            {
                localStorage.setItem("message",data.message);
                router.push(`/election/${idelec}/urnes`);
            }
            else
            {
                setMessage(data.message || "Erreur");
            }

        }
        catch(err)
        {
            setMessage("Erreur serveur");
        }
        finally
        {
            setLoading(false);
        }
    }



    return(
        <div className="p-6 max-w-3xl mx-auto">

            

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-8">
                <Link href={`/election/${idelec}`} className="p-2 rounded-lg hover:bg-slate-100 transition">
                    <ArrowLeft size={22}/>
                </Link>

                <h1 className="text-2xl font-extrabold text-slate-900">
                    Ajouter un urne
                </h1>
            </div>

            {/* MESSAGE */}
            {message && (
                <div className="mb-4 p-3 rounded bg-red-100 text-red-600 text-sm">
                    {message}
                </div>
            )}

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl border shadow-sm space-y-6"
            >

                {/* LIB */}
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        adresse
                    </label>

                    <input
                        type="text"
                        value={addr}
                        onChange={(e)=>setAddr(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Nom du urne"
                    />
                </div>

                
                {/* ACTIONS */}
                <div className="flex justify-end gap-4">

                    <Link
                        href={`/election/${idelec}/urnes/`}
                        className="px-6 py-2 rounded-lg border text-slate-600 hover:bg-slate-50"
                    >
                        Annuler
                    </Link>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Envoi..." : "Ajouter"}
                    </button>

                </div>

            </form>

        </div>
    )
}