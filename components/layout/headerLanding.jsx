"use client";

import { useState } from "react";
import Logo from "@/components/ui/logo";
import { Menu, X } from "lucide-react";

export default function HeaderLanding() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="fixed w-full top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:px-10"
      role="banner"
    >
      {/* Logo + titre optimisé SEO */}
      <div className="flex items-center w-40">
        <Logo />
        <div className="text-xl font-bold leading-tight tracking-tight text-primary">
          lecium
        </div>
      </div>

      {/* Navigation desktop */}
      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
        
        <div className="flex gap-3">
          <a
            className="flex h-10 items-center justify-center rounded-lg px-4 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            href="/login"
          >
            Connexion
          </a>
          <a
            className="flex h-10 items-center justify-center rounded-lg bg-[#135bec] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#135bec]/90 transition-colors"
            href="/register"
          >
            Inscription
          </a>
        </div>
      </div>

      {/* Menu burger mobile */}
      <button
        className="md:hidden flex size-10 items-center justify-center rounded-lg"
        aria-label="Ouvrir le menu"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>

      {/* Offcanvas mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <aside
            className="absolute top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col gap-6"
            role="dialog"
            aria-label="Menu mobile"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end"
              aria-label="Fermer le menu"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-slate-700 hover:text-[#135bec]">
                Audits
              </a>
              <a href="#pricing" className="text-slate-700 hover:text-[#135bec]">
                Tarifs
              </a>
              
            </nav>
            <div className="flex flex-col gap-3 mt-auto">
              <a
                href="/login"
                className="flex h-10 items-center justify-center rounded-lg px-4 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Connexion
              </a>
              <a
                href="/register"
                className="flex h-10 items-center justify-center rounded-lg bg-[#135bec] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#135bec]/90 transition-colors"
              >
                Inscription
              </a>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
