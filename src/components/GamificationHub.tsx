'use client';

import { useEffect, useState } from 'react';
import { Trophy, Star, BookOpen, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
}

interface LeaderboardEntry {
    id: string;
    name: string;
    points: number;
}

export default function GamificationHub() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [badges, setBadges] = useState<Badge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGamificationData = async () => {
            try {
                const res = await fetch('/api/gamification');
                const data = await res.json();
                if (data.leaderboard) setLeaderboard(data.leaderboard);
                if (data.availableBadges) setBadges(data.availableBadges);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchGamificationData();
    }, []);

    if (loading) return null;

    return (
        <div className="space-y-8">
            {/* Stats Summary */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-5 rounded-3xl flex items-center gap-4 group hover:border-emerald-500/20 transition-all">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/5 group-hover:scale-110 transition-transform">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Mes Points</p>
                        <p className="text-2xl font-bold text-white">1,250</p>
                    </div>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-5 rounded-3xl flex items-center gap-4 group hover:border-blue-500/20 transition-all">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 shadow-lg shadow-blue-500/5 group-hover:scale-110 transition-transform">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Rang</p>
                        <p className="text-2xl font-bold text-white">#42</p>
                    </div>
                </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-2xl">
                <div className="flex items-center gap-2 mb-6 px-1">
                    <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                        <Award size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white">Classement</h3>
                </div>

                <div className="space-y-3">
                    {leaderboard.slice(0, 5).map((user, idx) => (
                        <div key={user.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black",
                                    idx === 0 ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20" :
                                        idx === 1 ? "bg-slate-300 text-black" :
                                            idx === 2 ? "bg-amber-700 text-white" : "text-slate-500"
                                )}>
                                    {idx + 1}
                                </span>
                                <span className="font-semibold text-sm text-white">{user.name}</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-400">{user.points} pts</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badges Preview */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-2xl">
                <div className="flex justify-between items-center mb-6 px-1">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
                            <BookOpen size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white">Mes Badges</h3>
                    </div>
                    <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">Voir Tout</button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {badges.slice(0, 3).map((badge) => (
                        <div key={badge.id} className="p-4 bg-slate-800/50 border border-white/5 rounded-2xl flex flex-col items-center text-center group hover:bg-white/10 transition-all cursor-pointer">
                            <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{badge.icon}</span>
                            <h4 className="text-[10px] font-bold text-white uppercase tracking-tight leading-tight">{badge.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
