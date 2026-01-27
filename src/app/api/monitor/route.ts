import { NextResponse } from 'next/server';

export async function GET() {
    // Simulate live data reading
    // In a real app, this might connect to an IoT hub or Redis

    const currentLoad = Math.floor(Math.random() * (500 - 300 + 1) + 300); // Random between 300 and 500
    const timestamp = new Date().toISOString();

    return NextResponse.json({
        timestamp,
        value: currentLoad,
        unit: 'kWh',
        status: currentLoad > 450 ? 'HIGH' : 'NORMAL'
    });
}
