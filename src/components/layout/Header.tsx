'use client';

import { Bell, Search, User } from 'lucide-react';

export function Header() {
    return (
        <header className="h-20 bg-slate-950/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-6 w-1/3">
                <div className="relative w-full max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Rechercher un bâtiment, une région..."
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/5 bg-slate-900/50 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-3 rounded-2xl bg-slate-900/50 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800 transition-all group">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
                </button>

                <div className="flex items-center gap-4 pl-6 border-l border-white/5">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-white tracking-tight">Utilisateur Eco</p>
                        <p className="text-[10px] text-emerald-500 uppercase font-black tracking-widest">Admin Global</p>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group cursor-pointer hover:scale-110 transition-transform">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </header>
    );
}
