"use client";

import { useState } from "react";
import { ArrowLeft, User, Upload, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ModifUrne({ u })
{
    const router = useRouter();
console.log(u);

    // 🧠 champs existants
    const [addr, setAddr] = useState(u.adresse || "");

    // 🚀 submit
    async function handleSubmit(e)
{
    e.preventDefault(); // ✅ IMPORTANT

    try
    {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/api/urne/${u.idurne}/`,
            {
                method: "POST",
                body: JSON.stringify({ adresse: addr }),
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            }
        );
        

        const data = await res.json();
        console.log(data);

        if (data.error)
        {
            console.log("Erreur");
            return;
        }

        localStorage.setItem("message", data.message);
        router.push(`/election/${u.idelec}/urnes`);
    }
    catch (e)
    {
        console.log(e);
    }
}

    return(
        <div className="p-6 max-w-3xl mx-auto">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-6">
                <Link href={`/election/${u.idelec}/urnes`} className="p-2 rounded-lg hover:bg-slate-100">
                    <ArrowLeft/>
                </Link>

                <h1 className="text-2xl font-extrabold text-slate-900">
                    Modifier urne
                </h1>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">

                {/* PHOTO */}
                

                {/* LIB */}
                <div>
                    <label className="block text-sm font-bold mb-1">
                        Adresse
                    </label>
                    <input
                        value={addr}
                        onChange={(e)=>setAddr(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Nom du urne"
                    />
                </div>

                {/* SUBMIT */}
                <button disabled={!addr} className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:opacity-90">
                    Enregistrer les modifications
                </button>

            </form>

        </div>
    )
}