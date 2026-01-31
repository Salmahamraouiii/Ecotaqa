'use client';

import { useState, useEffect } from 'react';
import { Zap, TrendingDown, Leaf, TrendingUp, LucideIcon, Calendar, Filter, Share2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import RealTimeMonitor from '@/components/RealTimeMonitor';
import AlertsCenter from '@/components/AlertsCenter';
import RegionalMap from '@/components/RegionalMap';
import GamificationHub from '@/components/GamificationHub';
import SustainabilityTracker from '@/components/SustainabilityTracker';
import { Button } from '@/components/ui/button';

interface StatCardProps {
    title: string;
    value: string;
    subtext: string;
    icon: LucideIcon;
    trend: 'up' | 'down';
    color: string;
    delay?: string;
}

const StatCard = ({ title, value, subtext, icon: Icon, trend, color, delay }: StatCardProps) => (
    <div className={cn(
        "bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:border-emerald-500/30 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-4",
        delay
    )}>
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-slate-400 mb-2">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
                </div>
                <div className={cn(
                    "flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase w-fit tracking-wider",
                    trend === 'down' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                )}>
                    {trend === 'down' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                    {subtext}
                </div>
            </div>
            <div className={cn("p-4 rounded-2xl bg-gradient-to-br transition-transform group-hover:scale-110 duration-300", color)}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    </div>
);

export default function DashboardPage() {
    const [summary, setSummary] = useState({
        totalUsage: 0,
        totalCost: 0,
        efficiencyScore: 0,
        activeAlerts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch('/api/dashboard');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                if (data.summary) {
                    setSummary(data.summary);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard summary", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
        const interval = setInterval(fetchSummary, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return (
        <div className="h-[80vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-10 pb-10">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Bonjour, Équipe Ecotaqa</h1>
                    <p className="text-slate-400 mt-1">Voici un aperçu de la performance énergétique de votre entreprise.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-slate-900/50 border-white/5 text-white hover:bg-slate-800 rounded-2xl h-12">
                        <Calendar className="mr-2 h-4 w-4" />
                        7 derniers jours
                    </Button>
                    <Button variant="outline" className="bg-slate-900/50 border-white/5 text-white hover:bg-slate-800 rounded-2xl h-12">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtres
                    </Button>
                    <Button className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl h-12 shadow-lg shadow-emerald-500/20">
                        <Share2 className="mr-2 h-4 w-4" />
                        Exporter
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Consommation Totale"
                    value={`${(summary.totalUsage / 1000).toFixed(1)} MWh`}
                    subtext="2.4% Économisé"
                    icon={Zap}
                    trend="down"
                    color="from-emerald-400 to-green-600 shadow-emerald-500/20 shadow-lg"
                    delay="delay-0"
                />
                <StatCard
                    title="Coût Estimé"
                    value={`${summary.totalCost.toLocaleString()} €`}
                    subtext="Sous le budget"
                    icon={Leaf}
                    trend="down"
                    color="from-blue-400 to-indigo-600 shadow-blue-500/20 shadow-lg"
                    delay="delay-75"
                />
                <StatCard
                    title="Score d'Efficacité"
                    value={`${summary.efficiencyScore}/100`}
                    subtext="+5 pts vs région"
                    icon={TrendingUp}
                    trend="up"
                    color="from-purple-400 to-indigo-600 shadow-purple-500/20 shadow-lg"
                    delay="delay-150"
                />
                <StatCard
                    title="Alertes Actives"
                    value={summary.activeAlerts.toString()}
                    subtext={summary.activeAlerts > 0 ? "Action requise" : "Tout est normal"}
                    icon={AlertTriangle}
                    trend={summary.activeAlerts > 0 ? 'up' : 'down'}
                    color={summary.activeAlerts > 0 ? "from-red-400 to-orange-600 shadow-red-500/20 shadow-lg" : "from-slate-400 to-slate-600 shadow-slate-500/20 shadow-lg"}
                    delay="delay-300"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-8 gap-8">
                {/* Left: Charts & Map */}
                <div className="xl:col-span-5 space-y-8">
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white">Monitoring en Temps Réel</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">En Direct</span>
                            </div>
                        </div>
                        <RealTimeMonitor />
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white">Cartographie Régionale</h3>
                            <p className="text-sm text-slate-400 mt-1">Status de consommation par zone géographique.</p>
                        </div>
                        <div className="h-[450px] rounded-2xl overflow-hidden border border-white/5">
                            <RegionalMap />
                        </div>
                    </div>
                </div>

                {/* Right: Sidebar Widgets */}
                <div className="xl:col-span-3 space-y-8">
                    <AlertsCenter />
                    <SustainabilityTracker />
                    <GamificationHub />
                </div>
            </div>
        </div>
    );
}

// Ensure AlertTriangle is imported from lucide
import { AlertTriangle as AlertIcon } from 'lucide-react';
