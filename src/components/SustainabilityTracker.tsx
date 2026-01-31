'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { Leaf } from 'lucide-react';

const goalsData = [
    { name: 'Empreinte Carbone', current: 75, target: 100, color: '#10b981' },
    { name: 'Énergie Renouvelable', current: 40, target: 100, color: '#3b82f6' },
    { name: 'Réduction Déchets', current: 60, target: 100, color: '#8b5cf6' },
];

export default function SustainabilityTracker() {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-2xl">
            <div className="flex items-center gap-2 mb-6 px-1">
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                    <Leaf size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Objectifs Durabilité</h3>
            </div>

            <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={goalsData}
                        layout="vertical"
                        margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={110}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(8px)',
                                color: '#fff'
                            }}
                        />
                        <Bar dataKey="current" barSize={12} radius={[0, 10, 10, 0]} background={{ fill: '#1e293b', radius: 10 }}>
                            {goalsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Progression Globale</span>
                <span className="font-black text-emerald-400">58%</span>
            </div>
        </div>
    );
}
