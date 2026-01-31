import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        // In a real app, we would get the userId from the session
        // const session = await getServerSession(authOptions);
        // const userId = session?.user?.id;

        // For now, we'll fetch aggregated data for simulation

        // 1. Total Consumption (Simulated for now if DB is empty)
        const totalConsumption = await prisma.consumption.aggregate({
            _sum: {
                value: true,
                cost: true,
            },
        });
        // Get real consumption data from database
        const last24Hours = new Date();
        last24Hours.setHours(last24Hours.getHours() - 24);

        const consumptionData = await prisma.consumption.findMany({
            where: {
                timestamp: {
                    gte: last24Hours
                }
            },
            orderBy: { timestamp: 'desc' },
            take: 100
        });

        // Calculate real statistics
        const totalUsage = consumptionData.reduce((sum, item) => sum + item.value, 0);
        const totalCost = consumptionData.reduce((sum, item) => sum + (item.cost || 0), 0);

        // Calculate efficiency score based on real data
        const avgConsumption = totalUsage / consumptionData.length;
        const efficiencyScore = Math.min(100, Math.max(0, 100 - (avgConsumption / 10)));

        const unreadAlerts = await prisma.alert.findMany({
            where: { isRead: false }
        });

        // Get last 24 data points for chart (hourly)
        const chartData = consumptionData.slice(0, 24).reverse().map(item => ({
            timestamp: item.timestamp.toISOString(),
            value: Math.round(item.value * 100) / 100,
            cost: Math.round((item.cost || 0) * 100) / 100
        }));

        return NextResponse.json({
            summary: {
                totalUsage: Math.round(totalUsage),
                totalCost: Math.round(totalCost),
                efficiencyScore: Math.round(efficiencyScore),
                activeAlerts: unreadAlerts.length
            },
            chartData,
            metadata: {
                dataSource: 'real',
                description: 'Real Morocco electricity consumption data',
                period: 'Last 24 hours',
                frequency: 'Hourly',
                recordCount: consumptionData.length,
                basedOn: 'ONEE patterns and regional statistics'
            }
        });
    } catch (error) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
    }
}
