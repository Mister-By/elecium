

import { CheckCircle, Lightbulb } from "lucide-react";
import OnlineClient from './onlineClient';
import { handleConnect } from "../../../../lib/handleConnect";
import LoginClient from "../../../login/login";
import Header from "@/components/layout/header";

export default async function online() {
    
  const isConnected = await handleConnect();

  if (!isConnected) {
    return <LoginClient />;
  }


  return (
    <div>
      <Header/>
      <main className=" mt-23 flex-1 w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-[-0.033em]">
              Créer une Nouvelle Élection 
            </h1>
            <p className="text-slate-500 text-lg font-normal leading-normal">
              Configurez votre scrutin sécurisé avec les dernières technologies de vérification.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <OnlineClient/>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h4 className="flex items-center gap-2 text-primary font-bold text-lg mb-4">
                <span className="material-symbols-outlined"><Lightbulb/> </span>
                Conseils Rapides
              </h4>

              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle/>
                  <span>
                    Assurez-vous que le titre de l'élection est clair et concis.
                  </span>
                </li>

                <li className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle/>
                  <span>
                    La reconnaissance faciale augmente la sécurité mais nécessite une caméra.
                  </span>
                </li>

                <li className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle/>
                  <span>Vérifiez l'orthographe des noms des candidats.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}