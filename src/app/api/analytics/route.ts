import { NextResponse } from 'next/server';

export async function GET() {
    // Mock data - in a real app, this would query Prisma
    // const data = await prisma.consumption.findMany(...)

    const monthlyData = [
        { name: 'Jan', usage: 4000, waste: 240 },
        { name: 'Feb', usage: 3000, waste: 139 },
        { name: 'Mar', usage: 2000, waste: 980 },
        { name: 'Apr', usage: 2780, waste: 390 },
        { name: 'May', usage: 1890, waste: 480 },
        { name: 'Jun', usage: 2390, waste: 380 },
        { name: 'Jul', usage: 3490, waste: 430 },
    ];

    const stats = {
        efficiencyScore: 92,
        projectedCost: 1240.50,
        potentialSavings: 156.00
    };

    return NextResponse.json({
        success: true,
        data: {
            history: monthlyData,
            stats: stats
        }
    });
}
