"use client";

import { useMemo, useState } from "react";

export default function Audit({ data = [] }) {

    const [selected, setSelected] = useState(0);

    const current = useMemo(() => {
        return data[selected] || null;
    }, [data, selected]);

    async function copyCommand() {
        try {
            await navigator.clipboard.writeText("");

            alert("Commande copiée");
        } catch (e) {
            console.log(e);
        }
    }

    if (!data || data.length === 0) {
        return (
            <main className="p-6">
                <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
                    Aucun audit disponible
                </div>
            </main>
        );
    }

    return (
        <main className="w-full max-w-5xl mx-auto p-4 md:p-8">

            {/* Elections */}
            <div className="flex gap-3 overflow-x-auto pb-3 mb-8 scrollbar-thin">

                {data.map((e, index) => (
                    <button
                        key={`${e.idelec}-${index}`}
                        onClick={() => setSelected(index)}
                        className={`
                            shrink-0 px-5 py-3 rounded-xl border transition text-sm font-medium
                            ${
                                selected === index
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
                            }
                        `}
                    >
                        {e.lib}
                    </button>
                ))}
            </div>

            {/* Details */}
            {current && (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-8">

                    {/* Election */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {current.lib}
                        </h1>

                        {current.desc && (
                            <p className="mt-2 text-slate-600">
                                {current.desc}
                            </p>
                        )}
                    </div>

                    {/* Blockchain Data */}
                    <div className="space-y-5">

                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-1">
                                Nullifier
                            </p>

                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm break-all font-mono text-slate-800">
                                {current.nullifier}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-1">
                                TX Hash
                            </p>

                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm break-all font-mono text-slate-800">
                                {current.tx_hash}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-1">
                                Block Hash
                            </p>

                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm break-all font-mono text-slate-800">
                                {current.block_hash}
                            </div>
                        </div>
                    </div>

                    {/* Command */}
                    <div>
                        <p className="text-sm font-semibold text-slate-500 mb-3">
                            Commande de vérification
                        </p>

                        <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 border border-slate-800">

                            {/* Tu écriras ta commande ici */}
                            <div className="font-mono text-sm min-h-[60px] whitespace-pre-wrap break-all">
                                {`curl -s -X POST http://localhost:9000 \
                                -H 'Content-Type: application/json' \
                                -d '{"id":1,"jsonrpc":"2.0","method":"chain_getBlock","params":["0x${current.block_hash}"]}' \
                                | python3 -m json.tool`}
                            </div>

                            <button
                                onClick={copyCommand}
                                className="mt-4 px-4 py-2 rounded-xl bg-white text-slate-900 text-sm font-medium hover:opacity-90 transition"
                            >
                                Copier la commande
                            </button>
                        </div>
                    </div>

                    {/* Explication */}
                    <div className="space-y-4">

                        <h2 className="text-xl font-bold text-slate-900">
                            Comment s'assurer que la blockchain est fiable ?
                        </h2>

                        <p className="text-slate-600 leading-7">
                            La blockchain utilise un programme informatique pour gérer 
                            les transactions de votes dont on peut detecter 
                            moindre le changement (même l'ajout une virgule) en cas de 
                            mise à jour ou de corruption.
                            <br />
                            L'ensemble des programmes constituent le runtime et ce runtime à une empreinte 
                            numérique qu'on peut trouver à l'aide de la blockchain.
                            <br/>
                            Si on a le code source, on peut vérifier aisement que le programme informatique 
                            de la blockchain est authentique (c'est le même qui est en production) et non corrompue.
                            <br />
                            Ainsi, même le concepteur de la plateforme ne peut tricher sans qu'un auditeur le découvre
                            car c'est ce programme qui gère les transactions de votes
                        </p>

                        <a
                            href="https://github.com/Mister-By/elecium-substrate/blob/main/README.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline"
                        >
                            Voici le projet et comment faire sur GitHub
                        </a>
                    </div>
                </div>
            )}
        </main>
    );
}