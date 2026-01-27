'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TrendingDown, Leaf, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

// Initial data structure for the chart
const initialChartData = Array(7).fill(0).map((_, i) => ({
    name: new Date(Date.now() - (6 - i) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    value: 0
}));

const StatCard = ({ title, value, subtext, icon: Icon, trend, color }: any) => (
    <Card>
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{value}</h3>
                    <p className={cn("text-xs mt-1 flex items-center", trend === 'up' ? 'text-red-500' : 'text-green-500')}>
                        {trend === 'down' ? <TrendingDown className="w-3 h-3 mr-1" /> : <Zap className="w-3 h-3 mr-1" />}
                        {subtext}
                    </p>
                </div>
                <div className={cn("p-3 rounded-full bg-opacity-10", color)}>
                    <Icon className={cn("w-6 h-6", color.replace('bg-', 'text-'))} />
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function DashboardPage() {
    const [chartData, setChartData] = useState(initialChartData);
    const [currentLoad, setCurrentLoad] = useState(0);
    const [status, setStatus] = useState('NORMAL');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/monitor');
                const data = await res.json();

                setCurrentLoad(data.value);
                setStatus(data.status);

                setChartData(prev => {
                    const newData = [...prev.slice(1), {
                        name: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        value: data.value
                    }];
                    return newData;
                });
            } catch (err) {
                console.error("Failed to fetch monitor data");
            }
        };

        // Initial fetch
        fetchData();

        // Polling every 2 seconds
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                <div className="flex gap-2">
                    <span className={cn(
                        "text-xs font-medium px-2.5 py-0.5 rounded",
                        status === 'HIGH'
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    )}>
                        System {status === 'HIGH' ? 'Overload' : 'Normal'}
                    </span>
                    <button
                        onClick={() => window.location.href = '/api/auth/signout'}
                        className="text-xs text-red-400 hover:text-red-300 underline ml-2"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Current Load"
                    value={`${currentLoad} kWh`}
                    subtext={status === 'HIGH' ? "High Usage!" : "Optimal Range"}
                    icon={Zap}
                    trend={status === 'HIGH' ? 'up' : 'down'}
                    color={status === 'HIGH' ? "bg-red-500 text-red-500" : "bg-blue-500 text-blue-500"}
                />
                <StatCard
                    title="Carbon Footprint"
                    value="2.4 Tons"
                    subtext="-5% this month"
                    icon={Leaf}
                    trend="down"
                    color="bg-green-500 text-green-500"
                />
                <StatCard
                    title="Cost Estimate"
                    value="$1,240"
                    subtext="+2% variance"
                    icon={AlertTriangle}
                    trend="up"
                    color="bg-yellow-500 text-yellow-500"
                />
                <StatCard
                    title="Avg Efficiency"
                    value="94%"
                    subtext="Top 10% of users"
                    icon={TrendingDown}
                    trend="up"
                    color="bg-purple-500 text-purple-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Real-Time Consumption</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} domain={[0, 600]} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                        itemStyle={{ color: '#F3F4F6' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" isAnimationActive={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Side Panel / Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">High Usage Detected</h4>
                                        <p className="text-xs text-gray-500">Building A, Floor 3 exceeded threshold by 15%.</p>
                                        <span className="text-[10px] text-gray-400">2 mins ago</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
