'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Trophy, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tips = [
    {
        title: "Switch to LED",
        description: "Replace all incandescent bulbs with LEDs to save up to 80% on lighting costs.",
        difficulty: "Easy",
        impact: "High"
    },
    {
        title: "Unplug Idle Electronics",
        description: "Devices in standby mode still consume power. Use smart power strips.",
        difficulty: "Easy",
        impact: "Medium"
    },
    {
        title: "Optimize HVAC",
        description: "Maintain HVAC systems annually and change filters regularly.",
        difficulty: "Medium",
        impact: "High"
    }
];

export default function CommunityPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Education & Community</h1>
                    <p className="text-gray-500 dark:text-gray-400">Learn how to save energy and track your sustainability goals.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
                    <Trophy className="w-5 h-5" />
                    <span className="font-bold">Level 5 Saver</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-yellow-500" />
                            Daily Energy Saving Tips
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tips.map((tip, i) => (
                                <div key={i} className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h3>
                                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                                            {tip.impact} Impact
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tip.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="font-medium">Difficulty:</span> {tip.difficulty}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="glass bg-gradient-to-br from-primary-600 to-purple-700 text-white border-none">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="w-8 h-8 opacity-80" />
                                <h3 className="text-lg font-bold">Weekly Challenge</h3>
                            </div>
                            <p className="text-primary-100 mb-6">Reduce your peak hour consumption by 10% this week compared to last week.</p>
                            <div className="w-full bg-black/20 rounded-full h-2 mb-2">
                                <div className="bg-white h-2 rounded-full w-[65%]"></div>
                            </div>
                            <div className="flex justify-between text-sm text-primary-100 mb-6">
                                <span>65% Complete</span>
                                <span>2 days left</span>
                            </div>
                            <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white hover:text-white">
                                View Details
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-blue-500" />
                                Mini-Lessons
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                <p className="font-medium text-sm">Understanding kWh</p>
                                <p className="text-xs text-gray-500">2 min read</p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                <p className="font-medium text-sm">The Vampire Power Myth</p>
                                <p className="text-xs text-gray-500">4 min read</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
