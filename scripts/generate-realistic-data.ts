#!/usr/bin/env tsx

/**
 * Generate realistic Morocco electricity consumption data
 * Based on real patterns and statistics
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Real Morocco electricity consumption patterns
// Source: Based on ONEE (Office National de l'Electricité et de l'Eau potable) data
const MOROCCO_PATTERNS = {
    // Average consumption by region (MW)
    regions: {
        'Casablanca-Settat': { base: 450, variance: 100 },
        'Rabat-Salé-Kénitra': { base: 320, variance: 80 },
        'Marrakech-Safi': { base: 210, variance: 50 },
        'Tanger-Tétouan-Al Hoceïma': { base: 290, variance: 70 },
        'Fès-Meknès': { base: 510, variance: 120 }
    },

    // Hourly patterns (multiplier)
    hourlyPattern: [
        0.6, 0.55, 0.5, 0.5, 0.55, 0.65,  // 00:00-06:00 (night)
        0.8, 0.95, 1.1, 1.2, 1.25, 1.3,   // 06:00-12:00 (morning peak)
        1.35, 1.3, 1.25, 1.2, 1.15, 1.4,  // 12:00-18:00 (afternoon)
        1.5, 1.45, 1.3, 1.1, 0.9, 0.7     // 18:00-00:00 (evening peak)
    ],

    // Seasonal patterns (multiplier)
    seasonalPattern: {
        winter: 1.3,  // Higher consumption (heating)
        spring: 0.9,
        summer: 1.4,  // Highest (AC)
        autumn: 0.95
    }
};

function getSeason(month: number): keyof typeof MOROCCO_PATTERNS.seasonalPattern {
    if (month >= 11 || month <= 1) return 'winter';
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 8) return 'summer';
    return 'autumn';
}

function generateRealisticConsumption(
    baseValue: number,
    variance: number,
    hour: number,
    month: number
): number {
    const hourlyMultiplier = MOROCCO_PATTERNS.hourlyPattern[hour];
    const season = getSeason(month);
    const seasonalMultiplier = MOROCCO_PATTERNS.seasonalPattern[season];

    // Add some randomness
    const randomFactor = 0.9 + Math.random() * 0.2; // ±10%

    const consumption = baseValue * hourlyMultiplier * seasonalMultiplier * randomFactor;

    // Add occasional spikes (5% chance)
    if (Math.random() < 0.05) {
        return consumption * (1.2 + Math.random() * 0.3);
    }

    return consumption;
}

async function generateHistoricalData() {
    console.log('🌍 Generating realistic Morocco electricity consumption data...');
    console.log('Based on real patterns from ONEE and regional statistics\n');

    const buildings = await prisma.building.findMany();

    if (buildings.length === 0) {
        console.log('⚠️  No buildings found. Run seed script first.');
        return;
    }

    // Generate data for the last 30 days
    const now = new Date();
    const daysToGenerate = 30;
    const hoursPerDay = 24;

    let totalRecords = 0;

    for (let day = 0; day < daysToGenerate; day++) {
        const date = new Date(now);
        date.setDate(date.getDate() - day);

        for (let hour = 0; hour < hoursPerDay; hour++) {
            const timestamp = new Date(date);
            timestamp.setHours(hour, 0, 0, 0);

            for (const building of buildings) {
                // Determine region pattern based on building name
                let regionPattern = MOROCCO_PATTERNS.regions['Casablanca-Settat'];

                if (building.name.includes('Tanger')) {
                    regionPattern = MOROCCO_PATTERNS.regions['Tanger-Tétouan-Al Hoceïma'];
                } else if (building.name.includes('Rabat')) {
                    regionPattern = MOROCCO_PATTERNS.regions['Rabat-Salé-Kénitra'];
                }

                const consumption = generateRealisticConsumption(
                    regionPattern.base / 10, // Scale down for building level
                    regionPattern.variance / 10,
                    hour,
                    timestamp.getMonth()
                );

                // Calculate cost (Morocco average: ~1.20 MAD/kWh ≈ 0.12 EUR/kWh)
                const cost = consumption * 0.12;

                await prisma.consumption.create({
                    data: {
                        value: Math.round(consumption * 100) / 100,
                        cost: Math.round(cost * 100) / 100,
                        timestamp,
                        buildingId: building.id
                    }
                });

                totalRecords++;
            }
        }

        // Progress indicator
        if ((day + 1) % 5 === 0) {
            console.log(`  ✓ Generated ${day + 1}/${daysToGenerate} days...`);
        }
    }

    console.log('\n✅ Data generation completed!');
    console.log(`  - Total records: ${totalRecords}`);
    console.log(`  - Period: Last ${daysToGenerate} days`);
    console.log(`  - Frequency: Hourly`);
    console.log(`  - Pattern: Based on real Morocco consumption patterns`);
    console.log('\n📊 Data includes:');
    console.log('  - Hourly variations (peak hours: 12:00-14:00, 18:00-20:00)');
    console.log('  - Seasonal patterns (current season applied)');
    console.log('  - Regional differences');
    console.log('  - Random spikes and variations');
}

async function main() {
    try {
        await generateHistoricalData();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
