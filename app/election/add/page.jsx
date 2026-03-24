

import { ArrowRight, Globe, Network, Vote } from "lucide-react";
import Header from '@/components/layout/header';
import Link from "next/link";
import { handleConnect } from "../../../lib/handleConnect";

export default async function  AddElect() {

    handleConnect();

  return (
    
        
        <main className=" flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 ">
            <Header/>
        <div className="mt-23 max-w-5xl mx-auto flex flex-col gap-8 ">

            <div className="flex flex-col items-center text-center gap-3">
            <h1 className="text-slate-900 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Sélectionnez le format de l'élection
            </h1>

            <p className="text-slate-500 text-lg max-w-2xl">
                Choisissez la méthode de vote qui convient le mieux aux besoins de votre organisation.
                Vous pourrez modifier ce paramètre plus tard dans la configuration de l'élection.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-6">

            {/* Election en ligne */}
            <Link href={"./add/online"}>
                <div className="group relative flex flex-col h-full bg-white rounded-xl border border-slate-200 hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer overflow-hidden">

                    <div className="h-2 w-full bg-slate-100 group-hover:bg-primary transition-colors"></div>

                    <div className="p-6 lg:p-8 flex flex-col flex-1 gap-4">

                    <div className="mx-auto size-14 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                        <Globe/>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                        Élection en ligne
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed flex-1">
                        Vote à distance sécurisé accessible depuis n'importe quel appareil connecté à Internet.
                        Idéal pour les organisations réparties et une portée maximale.
                    </p>

                    <div className="mt-4 pt-4 border-t mx-auto border-slate-100 flex items-center text-primary font-bold text-sm">
                        <span>Sélectionner</span>
                        <ArrowRight className="mt-1 "/>
                    </div>

                    </div>
                </div>
            </Link>
            {/* Election physique */}
            <div className="group relative flex flex-col h-full bg-white rounded-xl border border-slate-200 hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer overflow-hidden">

                <div className="h-2 w-full bg-slate-100 group-hover:bg-primary transition-colors"></div>

                <div className="p-6 lg:p-8 flex flex-col flex-1 gap-4">

                <div className="size-14 mx-auto rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                    <Vote/>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    Élection physique
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed flex-1">
                    Vote traditionnel en bureau de vote géré électroniquement pour plus de précision.
                    Idéal pour les événements locaux sécurisés avec un contrôle élevé.
                </p>

                <div className="mt-4 pt-4 border-t mx-auto border-slate-100 flex items-center text-primary font-bold text-sm">
                    <span>Sélectionner</span>
                    <ArrowRight className="mt-1 "/>
                </div>

                </div>
            </div>

            {/* Election hybride */}
            <div className="group relative flex flex-col h-full bg-white rounded-xl border border-slate-200 hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer overflow-hidden">

                <div className="h-2 w-full bg-slate-100 group-hover:bg-primary transition-colors"></div>

                <div className="p-6 lg:p-8 flex flex-col flex-1 gap-4">

                <div className="size-14 mx-auto rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mb-2 group-hover:scale-110 transition-transform">
                    <Network/>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    Élection hybride
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed flex-1">
                    Combinez la commodité du vote en ligne avec les bureaux de vote physiques.
                    Maximisez la participation en offrant aux électeurs leur méthode préférée.
                </p>

                <div className="mt-4 pt-4 border-t mx-auto border-slate-100 flex items-center text-primary font-bold text-sm">
                    <span>Sélectionner</span>
                    <ArrowRight className="mt-1 "/>
                </div>

                </div>
            </div>

            </div>

            <div className="flex justify-center mt-8">
            <Link href={"/"}  className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-white border border-slate-300 text-slate-700 text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
                Annuler
            </Link >
            </div>

        </div>
        </main>
  
  );
}