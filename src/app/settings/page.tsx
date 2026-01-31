'use client';

import { useState } from 'react';
import { User, Bell, Target, Save, X } from 'lucide-react';

export default function SettingsPage() {
    const [form, setForm] = useState({
        name: 'Admin Ecotaqa',
        email: 'admin@ecotaqa.com',
        monthlyBudget: 5000,
        alertsEnabled: true,
        targetReduction: 20,
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-8 pb-10">
            <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Paramètres</h1>
                <p className="text-slate-400 mt-1">Gérez vos préférences et objectifs énergétiques</p>
            </div>

            {/* Profile Settings */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Profil Utilisateur</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Nom Complet</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Energy Goals */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Objectifs Énergétiques</h2>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Budget Mensuel (€)</label>
                        <input
                            type="number"
                            name="monthlyBudget"
                            value={form.monthlyBudget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Objectif de Réduction (%)</label>
                        <input
                            type="number"
                            name="targetReduction"
                            value={form.targetReduction}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Notifications</h2>
                </div>

                <label className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-white/5 hover:bg-slate-800/50 transition-all cursor-pointer">
                    <input
                        type="checkbox"
                        name="alertsEnabled"
                        checked={form.alertsEnabled}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-white/10 bg-slate-700 text-emerald-500 focus:ring-emerald-500/50"
                    />
                    <div>
                        <div className="text-white font-medium">Alertes de Surconsommation</div>
                        <div className="text-sm text-slate-400">Recevoir des notifications en cas de pic de consommation</div>
                    </div>
                </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white hover:bg-slate-800 transition-all"
                >
                    <X size={18} />
                    Annuler
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold hover:from-emerald-400 hover:to-green-500 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                >
                    <Save size={18} />
                    {saved ? '✅ Enregistré' : 'Sauvegarder'}
                </button>
            </div>
        </div>
    );
}
