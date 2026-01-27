'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    BarChart3,
    Map,
    Zap,
    Settings,
    LogOut,
    Leaf
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Regional Map', href: '/map', icon: Map },
    { name: 'Live Monitor', href: '/monitor', icon: Zap },
    { name: 'Sustainability', href: '/sustainability', icon: Leaf },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-white dark:bg-dark-bg border-r border-gray-200 dark:border-dark-border fixed left-0 top-0 flex flex-col z-50">
            <div className="p-6 flex items-center gap-2 border-b border-gray-200 dark:border-dark-border">
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                    E
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">EcoTrack</span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-dark-border">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
