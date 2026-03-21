"use client"

import Header from "@/components/layout/header";
import { ArrowRight, BarChart, Calendar, CalendarX, CheckCircle, Pencil, Plus, Sparkles } from "lucide-react";

// import LandingPage from "@/components/layout/landingPage";
// import { cookies } from "next/headers";

export default function DashBoard() //client
{
    // const cookieStore = await cookies();
    // const token = await cookieStore.get("token")?.value;

    // if(!token)
    // {
    //     return <LandingPage/>;
    // }

    // const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api`,{
    //     credentials: "include",
    //     headers: {
    //         Cookie: `token=${token}`
    //     },
    //     cache: "no-store"
    // });
    // const data = await  res.json();
    // if(!data.connect)
    // {
    //     return <LandingPage/>
    // }
    
    return(
        <div>
            <Header/>
<main className="mt-23 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
<div>
<h1 className="text-3xl font-black text-slate-900 tracking-tight">Mes Invitations Electorales</h1>
<p className="text-slate-500 mt-1">Ici, seront afficher les scrutins auquels vous êtes conviés.</p>
</div>
<div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
<button className="px-4 py-1.5 rounded-md text-sm font-bold bg-primary text-white shadow-sm">Toutes</button>
<button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50">En cours</button>
<button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50">Terminées</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border-l-4 border-primary">
<div className="p-6">
<div className="flex justify-between items-start mb-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase tracking-wider">
En cours
</span>

<div className="flex items-center gap-1 text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">
<Sparkles/>
<span className="text-[11px] font-black uppercase tracking-tighter">IA Active</span>
</div>

</div>

<h3 className="text-lg font-bold text-slate-900 leading-tight mb-4 group-hover:text-primary transition-colors">
Élection du Comité Social Économique 2024
</h3>

<div className="space-y-3 mb-6">

<div className="flex items-center gap-3 text-slate-600">
<div className="p-2 bg-slate-50 rounded-lg">
<Calendar/>
</div>

<div>
<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Début</p>
<p className="text-sm font-semibold">12 Mai 2024 • 08:00</p>
</div>
</div>

<div className="flex items-center gap-3 text-slate-600">
<div className="p-2 bg-slate-50 rounded-lg">
<CalendarX/>
</div>

<div>
<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Fin</p>
<p className="text-sm font-semibold">15 Mai 2024 • 18:00</p>
</div>
</div>

</div>

<button className="w-full py-2.5 bg-primary text-white font-bold rounded-lg shadow-md shadow-primary/20 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
<span>Voir les détails</span>
<ArrowRight/>
</button>

</div>

<div className="h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-primary"></div>

</div>


<div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border-l-4 border-amber-500">

<div className="p-6">

<div className="flex justify-between items-start mb-4">

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">
Planifiée
</span>

<div className="flex items-center gap-1 text-slate-400 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
<Sparkles/>
<span className="text-[11px] font-black uppercase tracking-tighter">IA Désactivée</span>
</div>

</div>

<h3 className="text-lg font-bold text-slate-900 leading-tight mb-4 group-hover:text-amber-600 transition-colors">
Renouvellement du Conseil d'Administration
</h3>

<div className="space-y-3 mb-6">

<div className="flex items-center gap-3 text-slate-600">

<div className="p-2 bg-slate-50 rounded-lg">
<Calendar/>
</div>

<div>
<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Début</p>
<p className="text-sm font-semibold">01 Juin 2024 • 09:00</p>
</div>

</div>

<div className="flex items-center gap-3 text-slate-600">

<div className="p-2 bg-slate-50 rounded-lg">
<CalendarX/>
</div>

<div>
<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Fin</p>
<p className="text-sm font-semibold">05 Juin 2024 • 17:00</p>
</div>

</div>

</div>

<button className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
<span>Gérer le scrutin</span>
<Pencil/>
</button>

</div>

<div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500"></div>

</div>


<div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border-l-4 border-slate-400">

<div className="p-6">

<div className="flex justify-between items-start mb-4">

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
Terminée
</span>

<div className="flex items-center gap-1 text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">
<Sparkles/>
<span className="text-[11px] font-black uppercase tracking-tighter">IA Active</span>
</div>

</div>

<h3 className="text-lg font-bold text-slate-900 leading-tight mb-4 group-hover:text-slate-600 transition-colors">
Vote des Représentants du Personnel (VRP)
</h3>

<div className="space-y-3 mb-6">

<div className="flex items-center gap-3 text-slate-600 opacity-60">

<div className="p-2 bg-slate-50 rounded-lg">
<Calendar/>
</div>

<div>
<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Début</p>
<p className="text-sm font-semibold text-slate-400 line-through">10 Avr 2024</p>
</div>

</div>

<div className="flex items-center gap-3 text-slate-600">

<div className="p-2 bg-slate-50 rounded-lg">
<CheckCircle/>
</div>

<div>
<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Fin</p>
<p className="text-sm font-semibold">Archivé le 14 Avr 2024</p>
</div>

</div>

</div>

<button className="w-full py-2.5 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
<span>Résultats</span>
<BarChart/>
</button>

</div>

<div className="h-1 w-full bg-slate-200"></div>

</div>




</div>




</main>
            <div className="fixed bottom-8 right-8 z-50">
                <button className="group relative flex items-center justify-center size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 hover:bg-blue-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30">
                <Plus/>
                <span className="absolute right-full mr-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Créer une nouvelle
                        </span>
                </button>
            </div>
        </div>
    );
}