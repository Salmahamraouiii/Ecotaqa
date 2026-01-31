'use client';

import { useEffect, useState } from 'react';
import { Building2, MapPin, Zap, Users } from 'lucide-react';

interface Building {
    id: string;
    name: string;
    address: string | null;
    departments: number;
    consumption: number;
}

export default function BuildingsPage() {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data with realistic values
        const mockBuildings: Building[] = [
            { id: '1', name: 'Siège Social Casablanca', address: 'Boulevard Mohammed V, Casablanca', departments: 5, consumption: 4500 },
            { id: '2', name: 'Usine Tanger', address: 'Zone Industrielle, Tanger', departments: 3, consumption: 8200 },
            { id: '3', name: 'Bureau Rabat', address: 'Avenue Hassan II, Rabat', departments: 2, consumption: 1200 },
        ];
        setBuildings(mockBuildings);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        Bâtiments
                    </h1>
                    <p className="text-slate-400 mt-1">Surveillez la consommation de chaque site</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buildings.map((building) => (
                    <div
                        key={building.id}
                        className="group bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-2xl hover:bg-slate-900/60 hover:border-emerald-500/20 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    >
                        {/* Gradient Overlay */}
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Building2 className="w-6 h-6 text-blue-500" />
                                </div>
                                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <span className="text-xs font-bold text-emerald-500">ACTIF</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                {building.name}
                            </h3>

                            <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                                <MapPin size={14} />
                                <span>{building.address || 'Adresse non spécifiée'}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Zap className="w-4 h-4 text-yellow-500" />
                                        <span className="text-xs text-slate-400 uppercase font-bold">Consommation</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">{building.consumption.toLocaleString()}</p>
                                    <p className="text-xs text-slate-500">kWh/mois</p>
                                </div>

                                <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Users className="w-4 h-4 text-purple-500" />
                                        <span className="text-xs text-slate-400 uppercase font-bold">Départements</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">{building.departments}</p>
                                    <p className="text-xs text-slate-500">actifs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Analyses Détaillées
                </h3>
                <p className="text-sm text-slate-300">
                    Cliquez sur un bâtiment pour voir la répartition énergétique par étage et département.
                </p>
            </div>
        </div>
    );
}
