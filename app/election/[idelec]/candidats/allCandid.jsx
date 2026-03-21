"use client";

import Link from "next/link";
import { ArrowLeft, User, Pencil, Trash, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoginClient from "../../../login/login";

export default function AllCandid({ c })
{
    const [ca, setCa] = useState(c);
    const {idelec} = useParams()
    const [m, setM] = useState(null);
    useEffect(()=>{
        const ms = localStorage.getItem('message');
        if(ms)
        {
            setM(ms);
            localStorage.removeItem("message");
        }
    },[]);

    async function handleDelete(idcandid, photo) 
{
    try
    {
        const res = await fetch(`/api/delcandid/${idcandid}`, {
            method: "POST",
            body:JSON.stringify({photo}),
            cache: "no-store"
        });

        const data = await res.json();

        if (data.connect == false)
        {
            // redirection propre
            window.location.href = "/login";
            return;
        }

        if (data.error)
        {
            console.log("Erreur suppression");
            return;
        }

        // 🔥 force un nouveau tableau (important)
        setCa([...data.candidats]);

    }
    catch(e)
    {
        console.log(e);
    }
}

    return(
        <div className="p-6">

            {m && (
    
            <div className="flex gap-2.5 mt-2 mb-4 rounded-md bg-green-100 border border-green-400 transition-discrete p-1">
                <p className="mx-auto text-green-700 font-semibold">{m}</p> <X className="text-green-400 cursor-pointer" onClick={()=>{setM(null)}} />
            </div>
            )}

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-6">
                <Link href="/dashboard" className="p-2 rounded-lg hover:bg-slate-100 transition">
                    <ArrowLeft size={22}/>
                </Link>

                <h1 className="text-2xl font-extrabold text-slate-900">
                    Liste des candidats
                </h1>
            </div>


            {/* TABLE CARD */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

                {/* SEARCH */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Candidats</h3>

                    <Link href={`/election/${idelec}/candidats/ajout`} className="flex cursor-pointer gap-0.5 bg-blue-600 rounded p-2 border-blue-500">
                        <Plus className="text-white" />
                        <span className="text-white">Ajouter</span>
                    </Link>

                    <input
                        className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Rechercher..."
                        type="text"
                    />
                </div>


                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">

                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-6 py-4 text-xs font-extrabold uppercase text-slate-500">Photo</th>
                                <th className="px-6 py-4 text-xs font-extrabold uppercase text-slate-500">Libellé</th>
                                <th className="px-6 py-4 text-xs font-extrabold uppercase text-slate-500">Description</th>
                                <th className="px-6 py-4 text-xs font-extrabold uppercase text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">

                            {ca.map(cand => (

                                <tr key={cand.idcandid} className="hover:bg-slate-50 transition">

                                    {/* PHOTO */}
                                    <td className="px-6 py-6">
                                        <div className="w-15 h-15 rounded-lg overflow-hidden border flex items-center justify-center bg-slate-100">

                                            {cand.photo ? (
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_URL_API}/candidats/${cand.photo}`}
                                                    alt="photo candidat"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User size={20} className="text-slate-400"/>
                                            )}

                                        </div>
                                    </td>

                                    {/* LIB */}
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">
                                            {cand.lib || `Candidat ${cand.numcandid}`}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            Numero: {cand.numcandid}
                                        </div>
                                    </td>

                                    {/* DESC */}
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-500 max-w-xs truncate">
                                            {cand.desc || "Aucune description"}
                                        </p>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">

                                            <Link href={`/election/${cand.idelec}/candidats/modif/${cand.idcandid}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                                <Pencil size={18}/>
                                            </Link >

                                            <button onClick={()=> handleDelete(cand.idcandid,cand.photo)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                                                <Trash size={18}/>
                                            </button >

                                        </div>
                                    </td>

                                </tr>

                            ))}

                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}