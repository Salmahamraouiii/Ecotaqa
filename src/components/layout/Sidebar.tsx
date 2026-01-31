'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Map,
    Building2,
    AlertTriangle,
    Trophy,
    Settings,
    LogOut,
    Leaf,
    ChevronLeft,
    ChevronRight,
    TrendingDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard' },
    { icon: Map, label: 'Cartographie', href: '/map' },
    { icon: Building2, label: 'Bâtiments', href: '/buildings' },
    { icon: AlertTriangle, label: 'Alertes', href: '/alerts' },
    { icon: Trophy, label: 'Défis & Badges', href: '/gamification' },
    { icon: Settings, label: 'Paramètres', href: '/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className={cn(
                "fixed left-0 top-0 h-screen bg-slate-900 border-r border-white/5 transition-all duration-300 z-50 flex flex-col",
                collapsed ? "w-20" : "w-72"
            )}
        >
            {/* Logo Section */}
            <div className="p-6 flex items-center gap-3">
                <div className="min-w-[40px] h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <Leaf size={20} />
                </div>
                {!collapsed && (
                    <span className="text-xl font-bold text-white tracking-tight">Ecotaqa</span>
                )}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Navigation */}
            <nav className="flex-1 px-3 mt-10 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                                isActive
                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon size={22} className={cn("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-400")} />
                            {!collapsed && (
                                <span className="font-medium">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Stats */}
            <div className="p-4 mt-auto border-t border-white/5">
                {!collapsed && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 mb-4">
                        <div className="flex items-center gap-2 text-emerald-400 mb-1">
                            <TrendingDown size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Eco-Score</span>
                        </div>
                        <div className="text-2xl font-bold text-white">85<span className="text-slate-500 text-sm ml-1">/100</span></div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[85%]" />
                        </div>
                    </div>
                )}

                <button
                    onClick={() => signOut()}
                    className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all w-full group",
                        collapsed && "justify-center"
                    )}
                >
                    <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
                    {!collapsed && <span className="font-medium">Déconnexion</span>}
                </button>
            </div>
        </div>
    );
}
