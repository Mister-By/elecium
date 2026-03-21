"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import HeaderLanding from '@/components/layout/headerLanding';
import { ArrowLeft, ArrowRight, Loader, Lock, LockKeyhole, Mail, Shield } from 'lucide-react';

export default function RegisterClient({mails})
{

const router = useRouter()

/* ---------------- STATES ---------------- */

const [modalOtpOpen,setModalOtpOpen] = useState(false);
const [load, setLoad] = useState(false);
const inputRefs = useRef([]);

const [form,setForm] = useState({
prenom:"",
nom:"",
email:"",
password:"",
confirmPassword:"",
terms:false
})

const [errors,setErrors] = useState({})

const [otp,setOtp] = useState(["","","","","",""]);

const [timer,setTimer] = useState(60);

const [apiError,setApiError] = useState(null)

/* ---------------- REGEX ---------------- */

const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

const passwordRegex =
/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

/* ---------------- HANDLE RETOUR ---------------- */

function handleRetour(){

if(modalOtpOpen){
setModalOtpOpen(false)
}else{
router.push("/")
}

}

/* ---------------- VALIDATION CHAMP ---------------- */

function validateField(name,value){

let error=""

switch(name){

case "prenom":
if(!value) error="Prénom requis"
break

case "nom":
if(!value) error="Nom requis"
break

case "email":

if(!value){
error="Email requis"
}
else if(!emailRegex.test(value)){
error="Email invalide"
}
else if(mails.includes(value)){
error="Email déjà utilisé"
}

break

case "password":

if(!passwordRegex.test(value)){
error="8 caractères avec lettre, chiffre et symbole"
}

break

case "confirmPassword":

if(value !== form.password){
error="Les mots de passe ne correspondent pas"
}

break

case "terms":

if(!value){
error="Vous devez accepter les conditions"
}

break

}

setErrors(prev=>({
...prev,
[name]:error
}))

}

/* ---------------- HANDLE CHANGE ---------------- */

function handleChange(e){

const {name,value,type,checked} = e.target

const val = type==="checkbox" ? checked : value

setForm(prev=>({
...prev,
[name]:val
}))

validateField(name,val)

}

/* ---------------- VALIDATION COMPLETE ---------------- */

function validateForm(){

let valid=true

Object.keys(form).forEach(key=>{

validateField(key,form[key])

if(!form[key] && key!=="terms") valid=false

})

if(errors.email || errors.password || errors.confirmPassword){
valid=false
}

return valid

}

/* ---------------- SEND OTP ---------------- */

async function handleSubmit(){

if(!validateForm()) return

try{
setLoad(true);
const res = await fetch(
`${process.env.NEXT_PUBLIC_URL_API}/api/otp`,
{
    credentials:"include",
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({mail:form.email})
}
)
console.log(res);


const data = await res.json()
console.log(data);
if(!data.error){
setLoad(false);
setModalOtpOpen(true)
console.log("modal ouvert");


setTimer(60)

}else{

setApiError(data.message)

}

}catch{

setApiError("Erreur serveur")

}

}

/* ---------------- OTP INPUT ---------------- */

function handleOtpChange(value,index){

if(!/^[0-9]?$/.test(value)) return

let newOtp=[...otp]

newOtp[index]=value

setOtp(newOtp)

/* focus automatique champ suivant */

if(value && index < 5){
inputRefs.current[index+1]?.focus()
}

}

/* ---------------- TIMER ---------------- */

useEffect(()=>{

if(!modalOtpOpen) return

if(timer<=0) return

const interval=setInterval(()=>{
setTimer(t=>t-1)
},1000)

return ()=>clearInterval(interval)

},[modalOtpOpen,timer])

/* ---------------- RESEND OTP ---------------- */

async function resendOtp(){

if(timer>0) return
    setLoad(true);
await fetch(
`${process.env.NEXT_PUBLIC_URL_API}/api/otp`,
{
    credentials:"include",
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({mail:form.email})
}
)
setLoad(false);
setTimer(60)

}

/* ---------------- REGISTER ---------------- */

async function handleRegister(){

const code = otp.join("")

if(code.length !== 6){
setApiError("OTP invalide")
return
}

try{
setLoad(true);
const res = await fetch(
`${process.env.NEXT_PUBLIC_URL_API}/api/register`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
credentials:"include",
body:JSON.stringify({
otp:code,
prenom:form.prenom,
nom:form.nom,
mail:form.email,
mdp:form.password
})
}
)

const data = await res.json()

if(!data.error){

setLoad(false);
router.push("/");

}else{

setApiError(data.message)

}

}catch{

setApiError("Erreur serveur")

}

}

return(
<div>

<HeaderLanding/>

<button onClick={handleRetour} className='ml-5 p-2 flex mt-23 rounded'>
<ArrowLeft className=' size-10 '/>
<span className='mt-1 font-bold'>Retour</span>
</button>

<main className="mt-1 flex-grow flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">

<div className="absolute inset-0 z-0 pointer-events-none opacity-40">

<div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl transform translate-x-1/2"></div>

<div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

</div>

<div className="w-full max-w-[960px] grid lg:grid-cols-2 gap-12 items-start relative z-10">

{/* FORM */}

{!modalOtpOpen && (<div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">

<div className="p-8 sm:p-10">

<div className="mb-8">

<h2 className="text-2xl font-bold text-slate-900 mb-2">
Créer votre compte
</h2>

<p className="text-slate-500">
Rejoignez la plateforme de vote électronique sécurisée.
</p>

</div>

<form className="space-y-5">

<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

<label className="block">

<span className="text-sm font-medium text-slate-700 mb-1.5 block">
Prénom
</span>

<input
name="prenom"
value={form.prenom}
onChange={handleChange}
className="w-full rounded-lg border-slate-300 bg-slate-50 h-11 px-4"
/>

{errors.prenom && (
<p className="text-red-500 text-xs mt-1">{errors.prenom}</p>
)}

</label>

<label className="block">

<span className="text-sm font-medium text-slate-700 mb-1.5 block">
Nom
</span>

<input
name="nom"
value={form.nom}
onChange={handleChange}
className="w-full rounded-lg border-slate-300 bg-slate-50 h-11 px-4"
/>

{errors.nom && (
<p className="text-red-500 text-xs mt-1">{errors.nom}</p>
)}

</label>

</div>

<label className="block">

<span className="text-sm font-medium text-slate-700 mb-1.5 block">
Email
</span>

<div className="relative">

<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
<Mail/>
</span>

<input
name="email"
value={form.email}
onChange={handleChange}
type="email"
className="w-full rounded-lg border-slate-300 bg-slate-50 h-11 pl-10 pr-4"
/>

</div>

{errors.email && (
<p className="text-red-500 text-xs mt-1">{errors.email}</p>
)}

</label>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

<label className="block">

<span className="text-sm font-medium text-slate-700 mb-1.5 block">
Mot de passe
</span>

<div className="relative">

<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
<Lock/>
</span>

<input
name="password"
value={form.password}
onChange={handleChange}
type="password"
className="w-full rounded-lg border-slate-300 bg-slate-50 h-11 pl-10"
/>

</div>

{errors.password && (
<p className="text-red-500 text-xs mt-1">{errors.password}</p>
)}

</label>

<label className="block">

<span className="text-sm font-medium text-slate-700 mb-1.5 block">
Confirmer le mot de passe
</span>

<div className="relative">

<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
<LockKeyhole/>
</span>

<input
name="confirmPassword"
value={form.confirmPassword}
onChange={handleChange}
type="password"
className="w-full rounded-lg border-slate-300 bg-slate-50 h-11 pl-10"
/>

</div>

{errors.confirmPassword && (
<p className="text-red-500 text-xs mt-1">
{errors.confirmPassword}
</p>
)}

</label>

</div>

<div className="flex items-center gap-2 mb-6">

<input
type="checkbox"
name="terms"
checked={form.terms}
onChange={handleChange}
/>

<label className="text-sm text-slate-600">
J'accepte les conditions
</label>

</div>

{errors.terms && (
<p className="text-red-500 text-xs mb-3">{errors.terms}</p>
)}

{!load? (<button
type="button"
onClick={handleSubmit}
className="w-full rounded-lg bg-[#135bec] text-white font-bold h-12 flex items-center justify-center gap-2"
>

Continuer
<ArrowRight/>

</button>): (<button disabled className="w-full rounded-lg bg-[#135bec] text-white font-bold h-12 flex items-center justify-center gap-2"><Loader className="animate-spin" /></button>)}

</form>

</div>

</div>)}

{/* OTP */}

{modalOtpOpen && (

<div className="flex flex-col justify-center h-full mt-10">

<div className="bg-white/60 backdrop-blur-xl rounded-xl border border-slate-200 p-8 shadow-lg max-w-sm mx-auto w-full relative">

<div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">

<Shield/>

SECURISE

</div>

<div className="flex justify-center gap-3 mb-6">

{otp.map((digit,i)=>(

<input
key={i}
value={digit}
ref={(el)=>inputRefs.current[i]=el}
onChange={(e)=>handleOtpChange(e.target.value,i)}
maxLength="1"
className="w-12 h-14 text-center text-xl font-bold rounded-lg border"
/>

))}

</div>

<button
onClick={handleRegister}
className="w-full rounded-lg bg-[#135bec] text-white font-bold h-10"
>

Terminer

</button>

<p className="text-center text-xs mt-3">

{timer>0
?`Renvoyer dans ${timer}s`
:<button onClick={resendOtp} className="text-[#135bec]">
Renvoyer
</button>
}

</p>

</div>

</div>

)}

</div>

</main>

{apiError && (

<div className="fixed inset-0 flex items-center justify-center bg-black/40">

<div className="bg-white p-6 rounded-lg">

<p>{apiError}</p>

<button
onClick={()=>setApiError(null)}
className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
>
OK
</button>

</div>

</div>

)}

</div>
)

}