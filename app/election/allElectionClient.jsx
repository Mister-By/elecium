"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import {
ArrowRight,
BarChart,
Calendar,
CalendarX,
CheckCircle,
Pencil,
Plus,
Sparkles
} from "lucide-react";
import Link from "next/link";

export default function AllElectionClient({ elections })
{

const [filter, setFilter] = useState("Toutes");

const filtered = elections.filter(e =>
{
if(filter === "Toutes") return true;
return e.status === filter;
});

function formatDate(d)
{
const date = new Date(d);
return date.toLocaleDateString("fr-FR", {
day:"2-digit",
month:"short",
year:"numeric",
hour:"2-digit",
minute:"2-digit"
});
}

function getStatusStyle(status)
{
if(status === "En cours")
return {
border:"border-primary",
badge:"bg-green-100 text-green-700",
button:"bg-primary hover:bg-blue-700",
bottom:"from-primary via-blue-400 to-primary"
};

if(status === "Planifié")
return {
border:"border-amber-500",
badge:"bg-amber-100 text-amber-700",
button:"bg-primary-900 hover:bg-blue-800",
bottom:"from-amber-500 via-orange-400 to-amber-500"
};

return {
border:"border-slate-400",
badge:"bg-slate-100 text-slate-600",
button:"bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50",
bottom:"bg-slate-200"
};
}

return (
<div>

<Header/>

<main className="mt-23 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

<div>
<Link href={`/election`} className="text-3xl font-black text-slate-900 tracking-tight">
Tableau de Bord
</Link>

<p className="text-slate-500 mt-1">
Gérez et surveillez vos scrutins électroniques sécurisés.
</p>
</div>

<div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">

{["Toutes","En cours","Terminée","Planifié"].map(s => (

<button
key={s}
onClick={()=>setFilter(s)}
className={`px-4 py-1.5 rounded-md text-sm font-bold
${filter===s
? "bg-primary text-white shadow-sm"
: "text-slate-600 hover:bg-slate-50"
}`}
>
{s}
</button>

))}

</div>
</div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{filtered.map(e =>
{
const style = getStatusStyle(e.status);

return (

<div
key={e.idelec}
onClick={()=>window.location.href=`/election/${e.idelec}`}
className={`cursor-pointer group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border-l-4 ${style.border}`}
>

<div className="p-6">

<div className="flex justify-between items-start mb-4">

<div className="flex items-center gap-2">

<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${style.badge}`}>
{e.status}
</span>

<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
${e.createur ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-600"}`}>
{e.createur ? "Créateur" : "Agent"}
{console.log("crea: ",e.createur)}
</span>


</div>

<div className={`flex items-center gap-1 px-2 py-1 rounded-lg border
${e.ia
? "text-primary bg-primary/5 border-primary/10"
: "text-slate-400 bg-slate-100 border-slate-200"
}`}>
<Sparkles/>
<span className="text-[11px] font-black uppercase tracking-tighter">
{e.ia ? "IA Active" : "IA Désactivée"}
</span>
</div>

</div>

<h3 className="text-lg font-bold text-slate-900 leading-tight mb-3 group-hover:text-primary transition-colors">
{e.lib} ({e.type})

</h3>

{e.valid == false && e.status !== "Terminée" && (
    <span className={` inline-flex items-center px-1 py-0.5 text-red-600 rounded-full text-[9px] font-bold uppercase tracking-wider
     bg-red-100 "}`}>
        {(!e.createur)? "Liste electoral pas encore validé par le createur" : "Vous n'avez pas encore valider la liste electoral"}
    </span>
)}

<div className="space-y-3 mb-6 mt-4">

<div className="flex items-center gap-3 text-slate-600">

<div className="p-2 bg-slate-50 rounded-lg">
<Calendar/>
</div>

<div>
<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
Début
</p>
<p className="text-sm font-semibold">
{formatDate(e.dd)}
</p>
</div>

</div>


<div className="flex items-center gap-3 text-slate-600">

<div className="p-2 bg-slate-50 rounded-lg">
{e.status==="Terminée" ? <CheckCircle/> : <CalendarX/>}
</div>

<div>
<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
Fin
</p>
<p className="text-sm font-semibold">
{formatDate(e.df)}
</p>
</div>

</div>

</div>


<button
className={`w-full py-2.5 font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 ${style.button}`}
>

{e.status==="Terminée"
?
<>
<span>Résultats</span>
<BarChart/>
</>
:
e.createur
?
<>
<span>Gérer le scrutin</span>
<Pencil/>
</>
:
<>
<span>Voir les détails</span>
<ArrowRight/>
</>
}

</button>

</div>

<div className={`h-1 w-full bg-gradient-to-r ${style.bottom}`}></div>

</div>

);
})}

</div>

</main>


<div className="fixed bottom-8 right-8 z-50">
<Link href={"/election/add/online"} className="group relative flex items-center justify-center size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 hover:bg-blue-600 hover:scale-105 transition-all duration-300">

<Plus/>

<span className="absolute right-full mr-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
Créer une nouvelle
</span>

</Link>
</div>

</div>
);
}