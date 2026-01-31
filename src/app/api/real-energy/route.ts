import { NextResponse } from 'next/server';
import { getEIAClient } from '@/lib/energy-apis/eia';
import { getElectricityMapsClient } from '@/lib/energy-apis/electricity-maps';

/**
 * API Route for Real Energy Data
 * GET /api/real-energy?source=eia|electricity-maps|all
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source') || 'all';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    try {
        const results: any = {
            success: true,
            timestamp: new Date().toISOString(),
            sources: []
        };

        // EIA Data
        if (source === 'eia' || source === 'all') {
            const eiaClient = getEIAClient();
            const eiaData = await eiaClient.getMoroccoElectricityData({
                startDate: startDate || undefined,
                endDate: endDate || undefined
            });

            results.sources.push({
                name: 'EIA',
                type: 'official',
                dataPoints: eiaData.length,
                data: eiaClient.transformToEcotaqaFormat(eiaData).slice(0, 12), // Last 12 months
                latest: eiaData.length > 0 ? eiaData[0] : null
            });
        }

        // Electricity Maps Data
        if (source === 'electricity-maps' || source === 'all') {
            const emClient = getElectricityMapsClient();
            const carbonIntensity = await emClient.getCarbonIntensity('MA');
            const powerBreakdown = await emClient.getPowerBreakdown('MA');

            results.sources.push({
                name: 'Electricity Maps',
                type: 'real-time',
                carbonIntensity,
                powerBreakdown
            });
        }

        return NextResponse.json(results);
    } catch (error: any) {
        console.error('Real Energy API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}
