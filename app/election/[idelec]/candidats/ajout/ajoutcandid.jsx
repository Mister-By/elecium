"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";

export default function AjoutCandid()
{
    const { idelec } = useParams();
    const router = useRouter();

    const [lib, setLib] = useState("");
    const [desc, setDesc] = useState("");
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // 🔥 gestion preview
    useEffect(() => {
        if(!photo)
        {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(photo);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl); // clean mémoire
    }, [photo]);



    async function handleSubmit(e)
    {
        e.preventDefault();

        if(!lib )
        {
            setMessage("le libelle est requis");
            return;
        }

        const formData = new FormData();
        formData.append("lib", lib);
        formData.append("desc", desc);

        if(photo)
            formData.append("photo", photo);

        try
        {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/api/candidat/add/${idelec}`,
                {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                }
            );

            const data = await res.json();

            if(!data.error)
            {
                localStorage.setItem("message",data.message);
                router.push(`/election/${idelec}/candidats`);
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
                    Ajouter un candidat
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
                        Libellé
                    </label>

                    <input
                        type="text"
                        value={lib}
                        onChange={(e)=>setLib(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Nom du candidat"
                    />
                </div>

                {/* DESC */}
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        Description
                    </label>

                    <textarea
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                        rows="4"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Description du candidat"
                    />
                </div>

                {/* PHOTO + PREVIEW */}
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        Photo
                    </label>

                    <div className="flex flex-col items-center gap-4">

                        {/* PREVIEW */}
                        <div className="w-32 h-32 rounded-full overflow-hidden border flex items-center justify-center bg-slate-100">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <ImageIcon size={40} className="text-slate-400"/>
                            )}
                        </div>

                        {/* INPUT */}
                        <label className="flex items-center gap-2 border-2 border-dashed rounded-lg px-4 py-3 cursor-pointer hover:bg-slate-50 transition">
                            <Upload size={18}/>
                            <span className="text-sm">
                                {photo ? "Changer l’image" : "Choisir une image"}
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e)=>setPhoto(e.target.files[0])}
                                className="hidden"
                            />
                        </label>

                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-4">

                    <Link
                        href={`/election/${idelec}`}
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