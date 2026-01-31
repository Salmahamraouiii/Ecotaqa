#!/usr/bin/env tsx

/**
 * Script to download and import Morocco Electricity Dataset from Kaggle
 * 
 * Prerequisites:
 * 1. Install Kaggle CLI: pip install kaggle
 * 2. Configure Kaggle API credentials: https://www.kaggle.com/docs/api
 * 3. Run: npm install csv-parser
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

const prisma = new PrismaClient();

interface CSVRow {
    timestamp: string;
    zone: string;
    consumption: string;
    [key: string]: string;
}

async function downloadKaggleDataset() {
    console.log('📥 Downloading Morocco Electricity Dataset from Kaggle...');
    console.log('Note: You need Kaggle CLI configured with API credentials');
    console.log('');

    // Instructions for manual download
    console.log('Manual Download Instructions:');
    console.log('1. Visit: https://www.kaggle.com/datasets/morocco-electricity-consumption');
    console.log('2. Download the dataset');
    console.log('3. Extract to: ./data/morocco-electricity.csv');
    console.log('4. Run this script again');
    console.log('');
}

async function importCSVData(filePath: string) {
    return new Promise<CSVRow[]>((resolve, reject) => {
        const results: CSVRow[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: CSVRow) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

async function importToDatabase(data: CSVRow[]) {
    console.log(`📊 Importing ${data.length} records to database...`);

    let imported = 0;
    let skipped = 0;

    for (const row of data) {
        try {
            // Parse consumption value
            const consumption = parseFloat(row.consumption || row.value || '0');

            if (isNaN(consumption) || consumption <= 0) {
                skipped++;
                continue;
            }

            // Create consumption record
            await prisma.consumption.create({
                data: {
                    value: consumption,
                    cost: consumption * 0.15, // Estimated cost per kWh
                    timestamp: new Date(row.timestamp || row.date),
                    // Optional: link to building or region if available
                }
            });

            imported++;

            // Progress indicator
            if (imported % 100 === 0) {
                console.log(`  ✓ Imported ${imported} records...`);
            }
        } catch (error) {
            skipped++;
            if (skipped < 10) {
                console.error(`  ⚠ Error importing row:`, error);
            }
        }
    }

    console.log('');
    console.log('✅ Import completed!');
    console.log(`  - Imported: ${imported} records`);
    console.log(`  - Skipped: ${skipped} records`);
}

async function main() {
    const csvPath = path.join(process.cwd(), 'data', 'morocco-electricity.csv');

    console.log('🌍 Morocco Electricity Dataset Importer');
    console.log('========================================');
    console.log('');

    // Check if file exists
    if (!fs.existsSync(csvPath)) {
        console.log('❌ Dataset file not found!');
        console.log('');
        await downloadKaggleDataset();
        process.exit(1);
    }

    try {
        // Import CSV data
        console.log('📖 Reading CSV file...');
        const data = await importCSVData(csvPath);
        console.log(`✓ Found ${data.length} records`);
        console.log('');

        // Import to database
        await importToDatabase(data);

        console.log('');
        console.log('🎉 All done! Your database now contains real Morocco electricity data.');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
