'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid credentials');
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6">
            <Card className="w-full max-w-md glass border-white/10">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
                    <p className="text-gray-400">Sign in to access your energy dashboard</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@company.com"
                                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <Link href="#" className="text-sm text-primary-400 hover:text-primary-300">Forgot password?</Link>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-6 text-lg font-semibold bg-primary-600 hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/20"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-gray-400 mt-4">
                        Don't have an account? <Link href="/register" className="text-primary-400 hover:text-primary-300 font-medium">Sign up</Link>
                    </div>
                </CardContent>
            </Card>

            {/* Demo Credentials Hint */}
            <div className="fixed bottom-4 right-4 bg-slate-800 p-4 rounded-lg border border-slate-700 text-xs text-gray-400 shadow-xl">
                <p className="font-bold text-gray-200 mb-1">Demo Credentials:</p>
                <p>User: admin@company.com</p>
                <p>Pass: password</p>
            </div>
        </div>
    );
}
