'use client';

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
    timestamp: string;
    value: number;
    cost: number;
}

export default function RealTimeMonitor() {
    const [data, setData] = useState<DataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/dashboard');
                const result = await response.json();
                if (result.chartData) {
                    setData(result.chartData);
                }
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(() => {
            setData(prevData => {
                if (prevData.length === 0) return prevData;
                const lastTime = new Date(prevData[prevData.length - 1].timestamp);
                const newTime = new Date(lastTime.getTime() + 5000);
                const newValue = Math.floor(Math.random() * 50) + 10;
                const newPoint = {
                    timestamp: newTime.toISOString(),
                    value: newValue,
                    cost: Math.floor(Math.random() * 10) + 2
                };
                return [...prevData.slice(1), newPoint];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) return (
        <div className="h-64 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Synchronisation des données...</p>
        </div>
    );

    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={(str) => new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        stroke="#475569"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#475569"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ color: '#10b981' }}
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                        labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        animationDuration={1000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
