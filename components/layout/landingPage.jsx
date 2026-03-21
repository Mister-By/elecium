import HeaderLanding from '@/components/layout/headerLanding';
import { ChartNoAxesColumn, CirclePlus, Earth, FileSearchCorner, HatGlasses, Lock, Plus, Rocket, ShieldCheck, UserRoundPlus, Users } from 'lucide-react';
import droite from "@/public/droite.jpeg";
import Image from 'next/image';

export default function LandingPage()
{
    return(   
        <div className="relative  flex min-h-screen w-full flex-col overflow-x-hidden">

        <HeaderLanding/>

        <main className="flex-grow mt-20 ">
        <section className="@container px-6 py-12 md:py-20 lg:px-20 bg-white ">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6 lg:w-1/2">
        <div className="flex flex-col gap-4">
        <h1 className="text-4xl text-center font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                    Le Vote Électronique Sécurisé <span className="text-[#135bec]">Simplifié</span>
        </h1>
        <p className="text-lg text-center leading-relaxed text-slate-600">
                                    Elecium garantit l'intégrité et la confidentialité de chaque vote grâce à un chiffrement de pointe. Des résultats fiables pour les organisations de toutes tailles.
                                </p>
        </div>
        <div className="flex justify-center md:justify-baseline flex-wrap gap-4">
        <button className="flex h-12 min-w-[140px] items-center justify-center rounded-lg bg-[#135bec] px-6 text-base font-bold text-white shadow-md hover:bg-[#135bec]/90 transition-transform hover:scale-[1.02]">
                                    Commencer
                                </button>
        <button className="flex h-12 min-w-[140px] items-center justify-center rounded-lg bg-slate-100 px-6 text-base font-bold text-slate-900 hover:bg-slate-200 transition-transform hover:scale-[1.02]">
                                    En savoir plus
                                </button>
        </div>
        </div>
        <div className="w-full sm:w-1/2 sm:mx-auto">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-xl ring-1 ring-slate-900/5">
        <div className="absolute inset-0 bg-cover bg-center" data-alt="Personne africaine votant numériquement" >
            <Image src={droite} alt='vote' />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#135bec]/20 to-transparent mix-blend-multiply"></div>
        </div>
        </div>
        </div>
        </section>
        <section className="bg-background-light px-6 py-16 md:py-24 lg:px-20">
        <div className=" mx-auto flex items-center max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-4 text-center md:text-left md:max-w-2xl">
        <h2 className="text-3xl text-center font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Principes de Sécurité
                            </h2>
        <p className="text-lg text-center text-slate-600">
                                Notre plateforme repose sur les piliers fondamentaux de la sécurité de l'information pour garantir des élections justes et transparentes.
                            </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex size-12 mx-auto items-center justify-center rounded-lg bg-[#135bec]/10 text-[#135bec]">
        <Lock/>
        </div>
        <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-slate-900 text-center">Confidentialité</h3>
        <p className="text-sm leading-relaxed text-slate-600 text-center">Les votes restent secrets et anonymes. Le chiffrement de bout en bout garantit que la vie privée des électeurs n'est jamais compromise.</p>
        </div>
        </div>
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex size-12 mx-auto items-center justify-center rounded-lg bg-[#135bec]/10 text-[#135bec]">
        <ShieldCheck/>
        </div>
        <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-slate-900 text-center">Intégrité</h3>
        <p className="text-sm leading-relaxed text-slate-600 text-center">Les résultats ne peuvent être falsifiés. Une technologie inspirée de la blockchain crée un registre immuable.</p>
        </div>
        </div>
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex size-12 mx-auto items-center justify-center rounded-lg bg-[#135bec]/10 text-[#135bec]">
        <FileSearchCorner/>
        </div>
        <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-slate-900 text-center">Auditabilité</h3>
        <p className="text-sm leading-relaxed text-slate-600 text-center">Chaque étape est vérifiable. Des auditeurs indépendants peuvent vérifier mathématiquement le résultat de l'élection.</p>
        </div>
        </div>
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex size-12 mx-auto items-center justify-center rounded-lg bg-[#135bec]/10 text-[#135bec]">
        <Earth/>
        </div>
        <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-slate-900 text-center">Accessibilité</h3>
        <p className="text-sm leading-relaxed text-slate-600 text-center">Votez de n'importe où, en toute sécurité. Conçu pour être inclusif et facile à utiliser sur n'importe quel appareil.</p>
        </div>
        </div>
        </div>
        </div>
        </section>
        {/** comment faire */}
        <section className="bg-white px-6 py-16 md:py-24 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Comment ça marche</h2>
        <p className="mt-4 text-lg text-slate-600">Lancez une élection sécurisée en quelques minutes grâce à notre processus simplifié.</p>
        </div>
        <div className="relative">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
        <div className="flex items-start gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#135bec] text-white">
        <UserRoundPlus />
        </div>
        <div>
        <h3 className="font-bold text-slate-900">1. Enregistrer l'Organisation</h3>
        <p className="text-sm text-slate-600">Créez votre profil.</p>
        </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#135bec] text-[#135bec]">
        <Plus/>
        </div>
        <div>
        <h3 className="font-bold text-slate-900">2. Créer une Élection</h3>
        <p className="text-sm text-slate-600">Règles &amp; type de scrutins.</p>
        </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#135bec] text-[#135bec]">
        <HatGlasses/>
        </div>
        <div>
        <h3 className="font-bold text-slate-900">3. Ajouter des Agents d'enrôlement</h3>
        <p className="text-sm text-slate-600">Détails des agents.</p>
        </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#135bec] text-[#135bec]">
        <Users/>
        </div>
        <div>
        <h3 className="font-bold text-slate-900">4. Enrôler les electeurs</h3>
        <p className="text-sm text-slate-600">Enrôlement sécurisé.</p>
        </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#135bec] text-[#135bec]">
        <Rocket/>
        </div>
        <div>
        <h3 className="font-bold text-slate-900">5. Lancer l'Élection</h3>
        <p className="text-sm text-slate-600">Le vote est ouvert.</p>
        </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#135bec] text-[#135bec]">
        <ChartNoAxesColumn/>
        </div>
        <div>
        <h3 className="font-bold text-slate-900">6. Voir les Résultats</h3>
        <p className="text-sm text-slate-600">Analyser les issues.</p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        {/**tarifs */}
        <section className="bg-background-light px-6 py-16 md:py-24 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Tarification Simple et Transparente</h2>
        <p className="mt-4 text-lg text-slate-600">Choisissez le plan adapté à la taille de votre organisation.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:border-[#135bec]/30 transition-colors">
        <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Petit Groupe</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">Démarrage</span>
        </div>
        <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-slate-900">29€</span>
        <span className="text-base font-medium text-slate-500">/élection</span>
        </div>
        <p className="text-sm text-slate-500">Parfait pour les comités, clubs et petites équipes.</p>
        </div>
        <hr className="border-slate-100"/>
        <ul className="flex flex-col gap-3">
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Jusqu'à 100 électeurs</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Rapport de résultats basique</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Support par e-mail</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Chiffrement sécurisé</span>
        </li>
        </ul>
        <button className="mt-auto flex h-12 w-full items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                    Commencer
                                </button>
        </div>
        <div className="relative flex flex-col gap-6 rounded-2xl border-2 border-[#135bec] bg-white p-8 shadow-lg transform md:-translate-y-2">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#135bec] px-4 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                                    Le Plus Populaire
                                </div>
        <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-[#135bec]">Institution</h3>
        <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-slate-900">199€</span>
        <span className="text-base font-medium text-slate-500">/élection</span>
        </div>
        <p className="text-sm text-slate-500">Pour les écoles, universités et PME.</p>
        </div>
        <hr className="border-slate-100"/>
        <ul className="flex flex-col gap-3">
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Jusqu'à 1 000 électeurs</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Analyses avancées &amp; exports</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Support e-mail prioritaire</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Marque personnalisée</span>
        </li>
        </ul>
        <button className="mt-auto flex h-12 w-full items-center justify-center rounded-lg bg-[#135bec] text-sm font-bold text-white hover:bg-[#135bec]/90 transition-colors shadow-md">
                                    Commencer
                                </button>
        </div>
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:border-[#135bec]/30 transition-colors">
        <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Entreprise</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">Volume</span>
        </div>
        <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-slate-900">Sur mesure</span>
        </div>
        <p className="text-sm text-slate-500">Pour les grandes organisations, syndicats et organismes nationaux.</p>
        </div>
        <hr className="border-slate-100"/>
        <ul className="flex flex-col gap-3">
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Électeurs illimités</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Gestionnaire de compte dédié</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>Intégrations API personnalisées</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
        <span className="material-symbols-outlined text-[#135bec] text-[20px]">check</span>
        <span>SLA &amp; Journaux d'audit</span>
        </li>
        </ul>
        <button className="mt-auto flex h-12 w-full items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                    Contacter les Ventes
                                </button>
        </div>
        </div>
        </div>
        </section>
        </main>
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12">
        <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-slate-900">
        <div className="size-6 text-[#135bec]">
        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
        </svg>
        </div>
        <span className="text-xl font-bold">Elecium</span>
        </div>
        <p className="text-sm text-slate-500 max-w-xs">
                                Solutions de vote électronique sécurisées, transparentes et auditables pour le monde moderne. Renforcer la démocratie grâce à la technologie.
                            </p>
        </div>
        <div className="flex flex-col gap-3">
        <h4 className="font-bold text-slate-900">Produit</h4>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Fonctionnalités</a>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Sécurité</a>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Tarifs</a>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Études de cas</a>
        </div>
        <div className="flex flex-col gap-3">
        <h4 className="font-bold text-slate-900">Ressources</h4>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Documentation</a>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Référence API</a>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Blog</a>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Centre d'aide</a>
        </div>
        <div className="flex flex-col gap-3">
        <h4 className="font-bold text-slate-900">Entreprise</h4>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">À propos</a>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Carrières</a>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Légal</a>
        <a className="text-sm text-slate-600 hover:text-[#135bec]" href="#">Contact</a>
        </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t border-slate-100 pt-8 md:flex-row gap-4">
        <p className="text-sm text-slate-400">© 2023 Elecium Inc. Tous droits réservés.</p>
        <div className="flex gap-6">
        <a className="text-slate-400 hover:text-[#135bec]" href="#">
        <span className="sr-only">Twitter</span>
        <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
        </a>
        <a className="text-slate-400 hover:text-[#135bec]" href="#">
        <span className="sr-only">GitHub</span>
        <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
        </svg>
        </a>
        <a className="text-slate-400 hover:text-[#135bec]" href="#">
        <span className="sr-only">LinkedIn</span>
        <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fillRule="evenodd"></path>
        </svg>
        </a>
        </div>
        </div>
        </div>
        </footer>
        </div>
    )
}