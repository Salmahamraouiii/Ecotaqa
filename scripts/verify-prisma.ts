
import { PrismaClient } from '@prisma/client';

async function main() {
    console.log('Initializing Prisma Client...');
    const prisma = new PrismaClient({
        log: ['query'],
    });

    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Successfully connected to database!');

        const userCount = await prisma.user.count();
        console.log(`Found ${userCount} users.`);

    } catch (e) {
        console.error('Error connecting to database:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
