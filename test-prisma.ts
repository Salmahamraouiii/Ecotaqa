import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('✅ Testing Prisma Client...');

    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');

    // Test query
    const userCount = await prisma.user.count();
    console.log(`✅ User count: ${userCount}`);

    console.log('✅ All tests passed! Prisma Client is working correctly.');
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
