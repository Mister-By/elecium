"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function AllAgent({ u })
{
    const { idelec } = useParams();

    const [users, setUsers] = useState(u);
    const [search, setSearch] = useState("");

    // 🔍 filtre dynamique
    const filteredUsers = users.filter(user =>
        `${user.nom} ${user.prenom} ${user.mail}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // 🔥 Ajouter agent
    async function handleAdd(user)
    {
        const confirm = window.confirm(`Ajouter ${user.nom} comme agent ?`);
        if (!confirm) return;

        try
        {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/api/agent/${user.iduser}/${idelec}`,
                { method: "POST", credentials:"include" }
            );

            const data = await res.json();

            if (data.error) return;

            // update local
            setUsers(prev =>
                prev.map(u =>
                    u.iduser === user.iduser ? { ...u, agent: true } : u
                )
            );
        }
        catch(e)
        {
            console.log(e);
        }
    }

    // ❌ Supprimer agent
    async function handleRemove(user)
    {
        const confirm = window.confirm(`Retirer ${user.nom} des agents ?`);
        if (!confirm) return;

        try
        {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/api/agent/${user.iduser}/${idelec}`,
                { method: "DELETE", credentials:"include" }
            );

            const data = await res.json();
            console.log(data);
            
            if (data.error) return;

            // update local
            setUsers(prev =>
                prev.map(u =>
                    u.iduser === user.iduser ? { ...u, agent: false } : u
                )
            );
        }
        catch(e)
        {
            console.log(e);
        }
    }

    return (
        <div className="px-4 md:px-20 lg:px-40 py-8">

            {/* HEADER */}
            <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">
                        Gérer les Agents
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Liste des utilisateurs et gestion des accès agents.
                    </p>
                </div>
            </div>

            {/* SEARCH */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Rechercher (nom, prénom, mail)..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            {/* LIST */}
            <div className="flex flex-col gap-3">

                {filteredUsers.map(user => {

                    const initials = `${user.nom[0] || ""}${user.prenom[0] || ""}`;

                    return (
                        <div
                            key={user.iduser}
                            className="flex items-center justify-between w-full bg-white border rounded-full px-6 py-4 shadow-sm hover:shadow-md transition"
                        >

                            {/* LEFT */}
                            <div className="flex items-center gap-6 flex-1">

                                <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                    {initials.toUpperCase()}
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-slate-900 font-bold">
                                        {user.nom} {user.prenom}
                                    </span>
                                    <span className="text-slate-500 text-xs">
                                        {user.mail}
                                    </span>
                                </div>

                            </div>

                            {/* STATUS */}
                            <div className="hidden md:flex flex-1">
                                {user.agent ? (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">
                                        Agent
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                                        Utilisateur
                                    </span>
                                )}
                            </div>

                            {/* ACTION */}
                            <div className="flex items-center gap-3">

                                {user.agent ? (
                                    <button
                                        onClick={()=>handleRemove(user)}
                                        className="px-5 py-2 rounded-full bg-red-100 text-red-600 font-bold hover:bg-red-600 hover:text-white transition"
                                    >
                                        Supprimer
                                    </button>
                                ) : (
                                    <button
                                        onClick={()=>handleAdd(user)}
                                        className="px-5 py-2 rounded-full bg-blue-100 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition"
                                    >
                                        Ajouter
                                    </button>
                                )}

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* EMPTY */}
            {filteredUsers.length === 0 && (
                <div className="py-12 flex flex-col items-center text-slate-400">
                    <p className="text-sm">
                        Aucun utilisateur trouvé.
                    </p>
                </div>
            )}

        </div>
    );
}