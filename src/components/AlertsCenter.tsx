'use client';

import { useEffect, useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
    id: string;
    message: string;
    type: string;
    severity: string; // "INFO", "WARNING", "CRITICAL"
    createdAt: string;
}

export default function AlertsCenter() {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch('/api/alerts');
                const data = await res.json();
                if (Array.isArray(data)) setAlerts(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchAlerts();
    }, []);

    const getIcon = (severity: string) => {
        switch (severity) {
            case 'CRITICAL': return <AlertTriangle className="text-red-400" size={18} />;
            case 'WARNING': return <Info className="text-amber-400" size={18} />;
            default: return <CheckCircle className="text-emerald-400" size={18} />;
        }
    };

    const getStyles = (severity: string) => {
        switch (severity) {
            case 'CRITICAL': return 'bg-red-500/10 border-red-500/20 text-red-100';
            case 'WARNING': return 'bg-amber-500/10 border-amber-500/20 text-amber-100';
            default: return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-100';
        }
    };

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-2xl">
            <div className="flex justify-between items-center mb-6 px-1">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                        <Bell size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white">Alertes & Notifications</h3>
                </div>
                {alerts.length > 0 && (
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {alerts.length} Nouveau
                    </span>
                )}
            </div>

            <div className="space-y-3">
                {alerts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-800/20 border border-white/5 rounded-2xl">
                        <CheckCircle size={32} className="text-slate-700 mb-2" />
                        <p className="text-slate-500 text-sm">Système stable. Aucune alerte.</p>
                    </div>
                ) : (
                    alerts.slice(0, 3).map((alert) => (
                        <div key={alert.id} className={cn("p-4 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer group flex items-start gap-4", getStyles(alert.severity))}>
                            <div className="pt-0.5">{getIcon(alert.severity)}</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{alert.message}</p>
                                <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-widest leading-none">
                                    {new Date(alert.createdAt).toLocaleTimeString()} • {alert.severity}
                                </p>
                            </div>
                            <ArrowUpRight size={14} className="text-white/20 group-hover:text-white transition-colors" />
                        </div>
                    ))
                )}
            </div>

            {alerts.length > 3 && (
                <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-bold rounded-xl transition-all uppercase tracking-widest">
                    Voir toutes les alertes
                </button>
            )}
        </div>
    );
}
