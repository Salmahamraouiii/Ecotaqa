import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const alerts = await prisma.alert.findMany({
            where: { isRead: false },
            orderBy: { createdAt: 'desc' },
            take: 10
        });

        // Mock alerts if empty
        const finalAlerts = alerts.length > 0 ? alerts : [
            { id: 'a1', message: 'High energy usage detected in Office B', type: 'SPIKE', severity: 'WARNING', createdAt: new Date() },
            { id: 'a2', message: 'Wait! Peak hours approaching (18:00)', type: 'INFO', severity: 'INFO', createdAt: new Date(Date.now() - 3600000) },
        ];

        return NextResponse.json(finalAlerts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
    }
}
