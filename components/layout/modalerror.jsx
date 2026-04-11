"use client";

import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModalError({ message }) {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50  px-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full space-y-6 text-center">
        {/* Icône d'erreur */}
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <X className="w-8 h-8" />
        </div>

        {/* Titre et sous-titre */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 ">
            Désolé
          </h3>
          <p className="text-slate-600  mt-2">
            Quelque chose a mal tourné
          </p>
        </div>

        {/* Message d'erreur */}
        <div className="bg-gray-100 border-4 rounded-lg p-4 text-sm text-slate-700 ">
          {message}
        </div>

        {/* Bouton retour */}
        <button
          onClick={() => router.back()}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
      </div>
    </section>
  );
}
