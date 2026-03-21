"use client";

import { useState } from "react";
import { ArrowLeft, User, Upload, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ModifCandid({ c })
{
    const router = useRouter();

    // 🧠 champs existants
    const [lib, setLib] = useState(c.lib || "");
    const [desc, setDesc] = useState(c.desc || "");

    // 🧠 gestion photo
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(
        c.photo ? `${process.env.NEXT_PUBLIC_URL_API}/candidats/${c.photo}` : null
    );
    const [removePhoto, setRemovePhoto] = useState(false);

    // 📸 selection fichier
    function handleFile(e)
    {
        const f = e.target.files[0];
        if (!f) return;

        setFile(f);
        setRemovePhoto(false);

        const url = URL.createObjectURL(f);
        setPreview(url);
    }

    // ❌ suppression photo
    function handleRemovePhoto()
    {
        setFile(null);
        setPreview(null);
        setRemovePhoto(true);
    }

    // 🚀 submit
    async function handleSubmit(e)
    {
        e.preventDefault();

        const formData = new FormData();

        // ✅ champs normaux (ta base fonctionne déjà)
        formData.append("lib", lib);
        formData.append("desc", desc);

        // 🧠 LOGIQUE PHOTO (100% selon ton API)

        if (removePhoto)
        {
            // ❌ supprimer photo existante
            if (c.photo)
                formData.append("photo", c.photo);
        }
        else if (file)
        {
            // 🔁 remplacer ou ajouter
            formData.append("nouv_photo", file);
            formData.append("photo", c.photo || null);
        }
        else
        {
            // ✔️ conserver photo
            if (c.photo)
                formData.append("nouv_photo", c.photo);
        }

        try
        {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/api/candidat/${c.idcandid}`,
                {
                    method: "POST",
                    body: formData,
                    credentials:"include"
                },
            );

            const data = await res.json();

            if (data.error)
            {
                console.log("Erreur");
                return;
            }

            // ✅ message + retour
            localStorage.setItem("message", data.message);
            router.push(`/election/${c.idelec}/candidats`);
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
                <Link href={`/election/${c.idelec}/candidats`} className="p-2 rounded-lg hover:bg-slate-100">
                    <ArrowLeft/>
                </Link>

                <h1 className="text-2xl font-extrabold text-slate-900">
                    Modifier candidat
                </h1>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">

                {/* PHOTO */}
                <div className="flex flex-col items-center gap-4">

                    <div className="w-32 h-32 rounded-xl border flex items-center justify-center overflow-hidden bg-slate-100">
                        {preview ? (
                            <img
                                src={preview}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={40} className="text-slate-400"/>
                        )}
                    </div>

                    <div className="flex gap-3 flex-wrap justify-center">

                        {/* changer */}
                        <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                            <Upload size={18}/>
                            Changer
                            <input type="file" hidden onChange={handleFile}/>
                        </label>

                        {/* supprimer */}
                        {preview && (
                            <button
                                type="button"
                                onClick={handleRemovePhoto}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded"
                            >
                                <Trash size={18}/>
                                Supprimer
                            </button>
                        )}

                    </div>

                </div>

                {/* LIB */}
                <div>
                    <label className="block text-sm font-bold mb-1">
                        Libellé
                    </label>
                    <input
                        value={lib}
                        onChange={(e)=>setLib(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Nom du candidat"
                    />
                </div>

                {/* DESC */}
                <div>
                    <label className="block text-sm font-bold mb-1">
                        Description
                    </label>
                    <textarea
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows={4}
                        placeholder="Description"
                    />
                </div>

                {/* SUBMIT */}
                <button className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:opacity-90">
                    Enregistrer les modifications
                </button>

            </form>

        </div>
    )
}