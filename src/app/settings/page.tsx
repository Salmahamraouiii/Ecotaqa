'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
    const [form, setForm] = useState({
        name: 'Admin User',
        email: 'admin@company.com',
        monthlyBudget: 5000,
        alertsEnabled: true,
    });

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
            body: JSON.stringify(form),
        });
        alert('Settings saved ✅');
    };

    return (
        <div className="max-w-4xl space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="rounded-md border p-2"
                    />
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="rounded-md border p-2"
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Energy Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <input
                        type="number"
                        name="monthlyBudget"
                        value={form.monthlyBudget}
                        onChange={handleChange}
                        className="w-full rounded-md border p-2"
                    />

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="alertsEnabled"
                            checked={form.alertsEnabled}
                            onChange={handleChange}
                        />
                        Enable Over-consumption Alerts
                    </label>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    className="rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
