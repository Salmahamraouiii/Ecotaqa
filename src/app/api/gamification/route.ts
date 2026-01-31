import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        // parsing query params for userId specific data if needed
        // const { searchParams } = new URL(request.url);
        // const userId = searchParams.get('userId');

        // Return aggregated gamification data (Leaderboard, available badges, etc.)

        const leaderboard = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                points: true,
                badges: {
                    include: {
                        badge: true
                    }
                }
            },
            orderBy: {
                points: 'desc'
            },
            take: 5
        });

        // Mock leaderboard if empty
        const finalLeaderboard = leaderboard.length > 0 ? leaderboard : [
            { id: '1', name: 'EcoHero', points: 1200, badges: [] },
            { id: '2', name: 'GreenEnergy', points: 950, badges: [] },
            { id: '3', name: 'SolarPower', points: 800, badges: [] },
        ];

        const badges = [
            { id: 'b1', name: 'Energy Saver', description: 'Reduced energy by 10%', icon: '🌱' },
            { id: 'b2', name: 'Week Streak', description: 'Kept usage low for 7 days', icon: '🔥' },
            { id: 'b3', name: 'Night Owl', description: 'Shifted usage to off-peak hours', icon: '🦉' },
        ];

        return NextResponse.json({
            leaderboard: finalLeaderboard,
            availableBadges: badges,
            userPoints: 0, // Valid user would see their points here
            userBadges: []
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch gamification data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    // Logic to award points or badges
    return NextResponse.json({ success: true });
}
