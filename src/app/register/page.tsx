'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6">
            <Card className="w-full max-w-md glass border-white/10">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
                    <p className="text-gray-400">Start monitoring your energy usage today</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">First Name</label>
                            <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Last Name</label>
                            <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Account Type</label>
                        <select className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none">
                            <option value="user" className="bg-slate-800">Individual User</option>
                            <option value="company" className="bg-slate-800">Company / Enterprise</option>
                        </select>
                    </div>
                    <Button className="w-full py-6 text-lg font-semibold bg-primary-600 hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/20">
                        Create Account
                    </Button>

                    <div className="text-center text-sm text-gray-400 mt-4">
                        Already have an account? <Link href="/login" className="text-primary-400 hover:text-primary-300 font-medium">Log in</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
