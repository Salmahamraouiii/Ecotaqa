'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const monthlyData = [
    { name: 'Jan', usage: 4000, waste: 240 },
    { name: 'Feb', usage: 3000, waste: 139 },
    { name: 'Mar', usage: 2000, waste: 980 },
    { name: 'Apr', usage: 2780, waste: 390 },
    { name: 'May', usage: 1890, waste: 480 },
    { name: 'Jun', usage: 2390, waste: 380 },
    { name: 'Jul', usage: 3490, waste: 430 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass">
                    <CardHeader>
                        <CardTitle>Monthly Consumption vs Waste</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                                    <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="usage" fill="#6366f1" radius={[4, 4, 0, 0]} name="Total Usage (kWh)" />
                                    <Bar dataKey="waste" fill="#ef4444" radius={[4, 4, 0, 0]} name="Est. Waste (kWh)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Efficiency Score History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-[350px]">
                            <div className="relative w-48 h-48 rounded-full border-8 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-8 border-green-500 border-t-transparent animate-spin-slow" style={{ transform: 'rotate(-45deg)' }}></div>
                                <div className="text-center">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white">92</span>
                                    <p className="text-gray-500 text-sm">Excellent</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Projected Costs</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                            <span>Current Month Forecast</span>
                            <span className="font-bold text-lg">$1,240.50</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                            <span>Potential Savings</span>
                            <span className="font-bold text-lg text-green-500">-$156.00</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
