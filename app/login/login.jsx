"use client"

import { useState } from "react"
import { EyeOff, Mail, MoveLeft } from "lucide-react"
import HeaderLanding from '@/components/layout/headerLanding'

export default function LoginClient() {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    const [mailError, setMailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [serverError, setServerError] = useState("")

    const [modalError, setModalError] = useState("")
    const [loading, setLoading] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // lettre + chiffre + symbole + 8 caractères
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/


    const handleSubmit = async (e) => {

        e.preventDefault()

        setMailError("")
        setPasswordError("")
        setServerError("")

        let hasError = false

        if(!emailRegex.test(mail)){
            setMailError("Adresse email invalide")
            hasError = true
        }

        if(!passwordRegex.test(password)){
            setPasswordError("8 caractères minimum avec lettre, chiffre et symbole")
            hasError = true
        }


        if(hasError) return

        try{

            setLoading(true)

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/connect`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    mail,
                    mdp: password
                })
            })

            const data = await res.json()

            if(data.error){
                setServerError(data.message)
                setLoading(false)
                return
            }

            window.location.href = "/"

        }catch(err){

            setModalError("Impossible de contacter le serveur")
            setLoading(false)

        }

    }

    return(
        <div className="pb-10">
            <HeaderLanding/>
            <MoveLeft/>

            <main className="pt-23 flex-1 flex justify-center items-center py-10 px-4 sm:px-6 lg:px-8 relative">

                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl"></div>
                    <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-400/5 blur-3xl"></div>
                </div>

                <div className="w-full max-w-[480px] z-10">
                    <div className="bg-white shadow-xl rounded-xl border border-slate-200 p-8 sm:p-10">

                        <div className="mb-8 text-center sm:text-left">
                            <h1 className="text-3xl font-black text-slate-900 mb-2">
                                Bon retour
                            </h1>
                            <p className="text-slate-500 text-base">
                                Accédez en toute sécurité à votre espace de vote pour continuer.
                            </p>
                        </div>

                        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

                            {/* EMAIL */}

                            <label className="flex flex-col gap-1.5">
                                <span className="text-slate-900 text-sm font-semibold">
                                    Adresse Email
                                </span>

                                <div className="relative">

                                    <input
                                        type="email"
                                        value={mail}
                                        onChange={(e)=>setMail(e.target.value)}
                                        placeholder="nom@exemple.com"
                                        className="form-input w-full rounded-lg border-slate-300 bg-white text-slate-900 h-12 px-4"
                                    />

                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                                        <Mail/>
                                    </div>

                                </div>

                                {mailError && (
                                    <p className="text-red-500 text-sm">
                                        {mailError}
                                    </p>
                                )}

                            </label>


                            {/* PASSWORD */}

                            <label className="flex flex-col gap-1.5">

                                <div className="flex justify-between">
                                    <span className="text-slate-900 text-sm font-semibold">
                                        Mot de passe
                                    </span>

                                    <a className="text-primary text-sm font-medium">
                                        Mot de passe oublié ?
                                    </a>
                                </div>

                                <div className="relative flex items-center">

                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        placeholder="Entrez votre mot de passe"
                                        className="form-input w-full rounded-lg border-slate-300 bg-white text-slate-900 h-12 px-4 pr-12"
                                    />

                                    {/* <button
                                        type="button"
                                        className="absolute right-0 px-3 text-slate-400"
                                    >
                                        <EyeOff/>
                                    </button> */}

                                </div>

                                {passwordError && (
                                    <p className="text-red-500 text-sm">
                                        {passwordError}
                                    </p>
                                )}

                            </label>


                            {/* SERVER ERROR */}

                            {serverError && (
                                <p className="text-red-500 text-sm">
                                    {serverError}
                                </p>
                            )}


                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-blue-700 text-white font-bold"
                            >
                                {loading ? "Connexion..." : "Se connecter"}
                            </button>

                        </form>

                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>

                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-slate-500">
                                        Protégé par Sécurité Elecium
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <p className="text-center mt-8 text-slate-500 text-sm">
                        Vous n'avez pas de compte ?
                        <a className="font-bold text-primary ml-1">
                            Créer un compte
                        </a>
                    </p>

                </div>

            </main>


            {/* MODAL FETCH ERROR */}

            {modalError && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl p-6 w-[320px] shadow-xl">

                        <h2 className="text-lg font-bold text-slate-900 mb-2">
                            Erreur réseau
                        </h2>

                        <p className="text-slate-600 text-sm mb-4">
                            {modalError}
                        </p>

                        <button
                            onClick={()=>setModalError("")}
                            className="w-full h-10 bg-primary text-white rounded-lg font-semibold"
                        >
                            Réessayer
                        </button>

                    </div>

                </div>
            )}

        </div>
    )
}