import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Fetch regions. If empty, return mock data for the map
        const regions = await prisma.region.findMany({
            include: {
                consumption: {
                    take: 1,
                    orderBy: { timestamp: 'desc' }
                }
            }
        });

        if (regions.length === 0) {
            // Return mock regions for Morocco
            return NextResponse.json([
                { id: '1', name: 'Casablanca-Settat', latitude: 33.5731, longitude: -7.5898, status: 'HIGH', consumption: 450 },
                { id: '2', name: 'Rabat-Salé-Kénitra', latitude: 34.0209, longitude: -6.8416, status: 'MEDIUM', consumption: 320 },
                { id: '3', name: 'Marrakech-Safi', latitude: 31.6295, longitude: -7.9811, status: 'LOW', consumption: 210 },
                { id: '4', name: 'Tanger-Tétouan-Al Hoceïma', latitude: 35.7595, longitude: -5.8340, status: 'MEDIUM', consumption: 290 },
                { id: '5', name: 'Fès-Meknès', latitude: 34.0181, longitude: -5.0078, status: 'CRITICAL', consumption: 510 },
            ]);
        }

        const formattedRegions = regions.map(region => ({
            id: region.id,
            name: region.name,
            latitude: region.latitude,
            longitude: region.longitude,
            status: region.status,
            consumption: region.consumption[0]?.value || 0
        }));

        return NextResponse.json(formattedRegions);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch map data' }, { status: 500 });
    }
}
