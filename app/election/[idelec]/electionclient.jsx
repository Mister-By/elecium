"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/header";

import {
ArrowLeft,
User,
Users,
Vote,
BadgeCheck,
Timer,
UserSearch,
UserPlus,
Pencil,
Trash,
X,
ListCheck
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ElectionClient({ data })
{
    const {idelec} = useParams();
    const [message, setMessage] = useState(null);
useEffect(() => {
    const msg = localStorage.getItem("message");
    if(msg)
    {
        setMessage(msg);
        localStorage.removeItem("message");
    }
}, []);
const [timeLeft,setTimeLeft] = useState("");
const [progress,setProgress] = useState(0);

useEffect(()=>{

function updateTimer()
{

const now = new Date().getTime();
const start = new Date(data.dd).getTime();
const end = new Date(data.df).getTime();

if(now < start)
{
    setTimeLeft("Pas encore commencé");
    setProgress(0);
    return;
}

const total = end - start;
const elapsed = now - start;
const remain = end - now;

if(remain <= 0)
{
setTimeLeft("Terminée");
setProgress(100);
return;
}

const hours = Math.floor(remain/(1000*60*60));
const minutes = Math.floor((remain%(1000*60*60))/(1000*60));
const seconds = Math.floor((remain%(1000*60))/1000);

setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

let p = (elapsed/total)*100;

if(p < 0) p = 0;
if(p > 100) p = 100;

setProgress(p);

}

updateTimer();

const interval = setInterval(updateTimer,1000);

return ()=>clearInterval(interval);

},[data]);



const participation =
data.nbr_votant === 0
? 0
: Math.round((data.nbr_vote/data.nbr_votant)*100);



return(

<div>

<Header/>

<main className="mt-23 flex-1 px-4 sm:px-6 lg:px-40 py-8 max-w-[1440px] mx-auto w-full">

{message && (
    
  <div className="flex gap-2.5 mt-2 mb-4 rounded-md bg-green-100 border border-green-400 transition-discrete p-1">
    <p className="mx-auto text-green-700 font-semibold">{message}</p> <X className="text-green-400 cursor-pointer" onClick={()=>{setMessage(null)}} />
  </div>
)}


<div className="mb-8">

<a className="inline-flex items-center text-slate-500 hover:text-primary mb-4 transition-colors">

<ArrowLeft size={20} className="mr-1"/>

<span className="text-sm font-medium">
Retour au tableau de bord
</span>

</a>

<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

<div className="max-w-2xl">

<h1 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight">
{data.lib} 
</h1>

<div className="flex">

    {data.valid == 0  && (<Link href={`/election/${data.idelec}/modif/`} className="mt-2 w-30 shadow-black cursor-pointer flex gap-1 px-2 py-2 border rounded-2xl">
        <span>Modifier</span>
        <Pencil/>
    </Link>)}

    {["Planifié", "Terminée"].includes(data.status) &&(<Link href={""} className="mt-2 ml-4 w-30 shadow-black cursor-pointer flex gap-1 px-2 py-2 border rounded-2xl">
        <span>Supprimer</span>
        <Trash/>
    </Link>)}
</div>

<p className="text-slate-600 mt-2 text-base">
{data.desc}
</p>

<div className="flex flex-wrap items-center gap-3 mt-4">

<span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">

<span className="relative flex h-2 w-2">

<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>

<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>

</span>

{data.status}

</span>

<span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
{data.createur ? "Créateur" : "Agent"}
</span>

{data.createur && !data.valid  && <button
className={`px-1 py-2.5 font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 border-primary 
    bg-green-200 text-green-600 text-xs bg-green hover:bg-green-100 from-primary via-white to-primary
`}
>
<span>Valider liste electoral</span>
</button>}

<span className="text-slate-500 text-sm">
Début : {data.dd}
</span>

</div>

</div>

</div>

</div>



<div className="mb-10">

<h3 className="text-slate-900 text-lg font-bold mb-4">
Actions Rapides
</h3>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

{data.createur && (

<Link href={`/election/${idelec}/candidats`} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-primary hover:shadow-md transition-all group">

<div className="rounded-full bg-blue-50 p-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">

<UserSearch size={24}/>

</div>

<span className="text-slate-900 font-bold">
Gérer les candidats
</span>

</Link>

)}



{data.createur && (

<Link href={`/election/${idelec}/agents`} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-primary hover:shadow-md transition-all group">

<div className="rounded-full bg-blue-50 p-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">

<BadgeCheck size={24}/>

</div>

<span className="text-slate-900 font-bold">
Gérer les agents
</span>

</Link>

)}



<Link href={`/election/${idelec}/enrolements`} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-primary hover:shadow-md transition-all group">

<div className="rounded-full bg-blue-50 p-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">

<UserPlus size={24}/>

</div>

<span className="text-slate-900 font-bold">
Enrôler
</span>

</Link >

<Link href={`/election/${idelec}/`} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-primary hover:shadow-md transition-all group">

<div className="rounded-full bg-blue-50 p-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">

<ListCheck size={24}/>

</div>

<span className="text-slate-900 font-bold">
Liste Electoral
</span>

</Link >

</div>

</div>



<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">


<div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-slate-200 shadow-sm">

<div className="flex items-center justify-between">

<p className="text-slate-500 text-sm font-medium">
Total Électeurs
</p>

<Users size={20} className="text-slate-400"/>

</div>

<p className="text-slate-900 text-2xl font-bold">
{data.nbr_votant}
</p>

</div>



<div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-slate-200 shadow-sm">

<div className="flex items-center justify-between">

<p className="text-slate-500 text-sm font-medium">
Votes Exprimés
</p>

<Vote size={20} className="text-slate-400"/>

</div>

<p className="text-slate-900 text-2xl font-bold">
{data.nbr_vote}
</p>

<div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">

<div
className="bg-green-500 h-1.5 rounded-full"
style={{width:`${participation}%`}}
></div>

</div>

<p className="text-xs text-slate-400 mt-1">
{participation}% Participation
</p>

</div>



<div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-slate-200 shadow-sm">

<div className="flex items-center justify-between">

<p className="text-slate-500 text-sm font-medium">
Agents Actifs
</p>

<BadgeCheck size={20} className="text-slate-400"/>

</div>

<p className="text-slate-900 text-2xl font-bold">
{data.nbr_agent}
</p>

</div>



<div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-slate-200 shadow-sm">

<div className="flex items-center justify-between">

<p className="text-slate-500 text-sm font-medium">
Temps Restant
</p>

<Timer size={20} className="text-slate-400"/>

</div>

<p className="text-slate-900 text-2xl font-bold">
{timeLeft}
</p>

<div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">

<div
className="bg-purple-500 h-1.5 rounded-full"
style={{width:`${progress}%`}}
></div>

</div>

</div>

</div>



<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

<div className="lg:col-span-2 flex flex-col gap-6">

<h3 className="text-slate-900 text-xl font-bold">
Liste des Candidats
</h3>


{data.candidats.map(c=>(
<div
key={c.idcandid}
className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl bg-white border border-slate-200 shadow-sm"
>

<div className="relative">

{c.photo ?

<img
src={`${process.env.NEXT_PUBLIC_URL_API}/candidats/${c.photo}`}
className="size-20 rounded-full object-cover border-2 border-white shadow-sm"
/>

:

<div className="size-20 rounded-full bg-slate-100 flex items-center justify-center">
<User size={30}/>
</div>

}

<div className="absolute -bottom-1 -right-1 size-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-xs font-bold border-2 border-white">
{c.numcandid}
</div>

</div>


<div className="flex-1 text-center md:text-left">

<h4 className="text-lg font-bold text-slate-900">
{c.lib || "Candidat"}
</h4>

<p className="text-slate-500 text-sm">
{c.desc || "Description non disponible"}
</p>

</div>

</div>
))}

</div>

</div>

</main>

</div>

)

}