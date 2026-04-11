"use client";

import Link from "next/link";
import { ArrowLeft, User, Pencil, Trash, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AllUrne({ u })
{
    const [urne, setUrne] = useState(u);
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

    async function handleDelete(idurne) 
{
    try
    {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/urne/${idurne}`, {
            method: "DELETE",
            cache: "no-store",
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);
        
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
        setUrne(urne.filter(e=>e.idurne !== idurne));
        setM(data.message)
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
                <Link href={`/election/${idelec}`} className="p-2 rounded-lg hover:bg-slate-100 transition">
                    <ArrowLeft size={22}/>
                </Link>

                <h1 className="text-2xl font-extrabold text-slate-900">
                    Liste des urnes
                </h1>
            </div>


            {/* TABLE CARD */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

                {/* SEARCH */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">urne</h3>

                    <Link href={`/election/${idelec}/urnes/add`} className="flex cursor-pointer gap-0.5 bg-blue-600 rounded p-2 border-blue-500">
                        <Plus className="text-white" />
                        <span className="text-white">Ajouter</span>
                    </Link>

                    {/* <input
                        className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Rechercher..."
                        type="text"
                    /> */}
                </div>


                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">

                        <thead>
                            <tr className="bg-slate-50">
                                
                                <th className="px-6 py-4 text-xs font-extrabold uppercase text-slate-500">Adresse</th>
                                <th className="px-6 py-4 text-xs font-extrabold uppercase text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">

                            {urne.map(ur => (

                                <tr key={ur.idurne} className="hover:bg-slate-50 transition">


                                    {/* DESC */}
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-500 max-w-xs truncate">
                                            {ur.adresse || "Aucune description"}<br/>
                                            <span className="size-4 text-slate-600">id: {ur.idurne}</span>
                                        </p>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">

                                            <Link href={`/election/${ur.idelec}/urnes/modif/${ur.idurne}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                                <Pencil size={18}/>
                                            </Link >

                                            <button onClick={()=> handleDelete(ur.idurne)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
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