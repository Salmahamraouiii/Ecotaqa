'use client';

import dynamic from 'next/dynamic';
import { MapPin, Activity } from 'lucide-react';

// Dynamically import map to avoid SSR issues
const RegionalMap = dynamic(() => import('@/components/RegionalMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[600px] flex items-center justify-center bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-slate-400 font-medium animate-pulse">Chargement de la carte...</p>
            </div>
        </div>
    )
});

export default function MapPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        Carte Régionale
                    </h1>
                    <p className="text-slate-400 mt-1">Visualisez la consommation énergétique par région</p>
                </div>

                {/* Legend */}
                <div className="hidden md:flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></span>
                        <span className="text-slate-300 font-medium">Optimal</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></span>
                        <span className="text-slate-300 font-medium">Moyen</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50"></span>
                        <span className="text-slate-300 font-medium">Élevé</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></span>
                        <span className="text-slate-300 font-medium">Critique</span>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden" style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}>
                <RegionalMap />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm text-slate-400 uppercase font-bold">Régions Surveillées</span>
                    </div>
                    <p className="text-3xl font-bold text-white">5</p>
                    <p className="text-xs text-slate-500 mt-1">Maroc</p>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm text-slate-400 uppercase font-bold">Zones Critiques</span>
                    </div>
                    <p className="text-3xl font-bold text-white">1</p>
                    <p className="text-xs text-slate-500 mt-1">Fès-Meknès</p>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm text-slate-400 uppercase font-bold">Performance Globale</span>
                    </div>
                    <p className="text-3xl font-bold text-white">87%</p>
                    <p className="text-xs text-slate-500 mt-1">Efficacité moyenne</p>
                </div>
            </div>
        </div>
    );
}
