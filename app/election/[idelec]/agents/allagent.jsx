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
  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-[1.01] duration-300 w-full max-w-lg mx-auto p-6 flex flex-col sm:flex-row items-center gap-4"
>
  {/* LEFT: Avatar + Infos */}
  <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
      {initials.toUpperCase()}
    </div>
    <div className="flex flex-col">
      <span className="text-slate-900 font-semibold text-md sm:text-lg">
        {user.nom} {user.prenom}
      </span>
      <span className="text-slate-500 text-sm sm:text-base">
        {user.mail}
      </span>
    </div>
  </div>

  {/* RIGHT: Status + Actions */}
  
    {/* STATUS */}
    <span
      className={` px-3 py-1 rounded-full text-xs font-semibold ${
        user.agent
          ? "bg-green-100 text-green-600"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {user.agent ? "Agent" : "Utilisateur"}
    </span>

    {/* ACTION */}
    {user.agent ? (
      <button
        onClick={() => handleRemove(user)}
        className="px-5 py-2 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition-colors duration-300"
      >
        Supprimer
      </button>
    ) : (
      <button
        onClick={() => handleAdd(user)}
        className="px-5 py-2 rounded-xl bg-blue-100 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300"
      >
        Ajouter
      </button>
    )}
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