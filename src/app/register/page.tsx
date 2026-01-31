'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, ArrowRight, Loader2, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push('/login?registered=true');
        } catch {
            setError('Registration failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden font-sans">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
            </div>

            <div className="w-full max-w-lg p-8 relative z-10">
                <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                <Leaf size={24} />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Ecotaqa</span>
                        </Link>
                        <h1 className="text-3xl font-extrabold text-white mb-3">Rejoignez le futur</h1>
                        <p className="text-slate-400">Optimisez votre consommation énergétique avec intelligence.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Nom de l&apos;entreprise</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Ecotaqa Industries"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all hover:bg-slate-800/80"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email professionnel</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="contact@entreprise.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all hover:bg-slate-800/80"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Mot de passe</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all hover:bg-slate-800/80"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm animate-shake">
                                <ShieldCheck size={18} />
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-7 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-lg shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    <Loader2 className="animate-spin" size={24} />
                                    <span>Traitement...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <span>Créer mon compte</span>
                                    <ArrowRight size={20} />
                                </div>
                            )}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-slate-400 text-sm">
                        Déjà inscrit?{' '}
                        <Link href="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
