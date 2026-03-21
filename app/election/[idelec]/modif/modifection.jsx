"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ModifElec({ e }) 
{
    const router = useRouter();
    function formatDate(date) {
        if (!date) return "";
        return new Date(date).toISOString().slice(0, 16);
    }

    const [data, setData] = useState({
        lib: e.lib || "",
        desc: e.desc || "",
        ia: e.ia,
        dd: formatDate(e.dd),
        df: formatDate(e.df)
    });

    function update(field, value) {
        setData(prev => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(evn) {
        evn.preventDefault();

        const payload = {
            ...data,
            ia: data.ia ? 1 : 0
        };

        console.log(payload);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/api/election/${e.idelec}`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload)
                }
            );

            const r = await res.json();
            console.log("data modif");
            
            console.log(r.message);
            if(r.error == false)
            {
                localStorage.setItem("message", r.message);
router.push(`/election/${e.idelec}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main className="pt-24 pb-12 md:pl-72 px-6 min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900">
                        Modifier une Élection
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Mettez à jour les paramètres de votre scrutin.
                    </p>
                </header>

                {/* CARD */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">

                        {/* INFOS */}
                        <div className="space-y-6">

                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Libellé
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary bg-slate-50"
                                    type="text"
                                    value={data.lib}
                                    onChange={(e) => update("lib", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Description
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary bg-slate-50"
                                    rows={4}
                                    value={data.desc}
                                    onChange={(e) => update("desc", e.target.value)}
                                />
                            </div>

                        </div>

                        {/* DATES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">

                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Date début
                                </label>
                                <input
                                    type="datetime-local"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50"
                                    value={data.dd}
                                    onChange={(e) => update("dd", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Date fin
                                </label>
                                <input
                                    type="datetime-local"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50"
                                    value={data.df}
                                    onChange={(e) => update("df", e.target.value)}
                                />
                            </div>

                        </div>

                        {/* IA */}
                        <div className="pt-6 border-t">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border">

                                <div>
                                    <h3 className="font-bold">
                                        Reconnaissance faciale
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Vérification biométrique des votants
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={data.ia}
                                    onChange={(e) => update("ia", e.target.checked)}
                                    className="w-5 h-5"
                                />

                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-4 pt-6">

                            <button
                                type="button"
                                className="px-6 py-3 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100"
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 rounded-lg text-sm font-bold bg-primary text-white shadow-md hover:opacity-90"
                            >
                                Enregistrer
                            </button>

                        </div>

                    </form>
                </div>

            </div>
        </main>
    );
}