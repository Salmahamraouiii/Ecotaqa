import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with comprehensive demo data...\n');

    // Create Company
    const company = await prisma.company.upsert({
        where: { id: 'demo-company-id' },
        update: {},
        create: {
            id: 'demo-company-id',
            name: 'Ecotaqa Industries',
            industry: 'Manufacturing',
            subscription: 'PREMIUM',
        },
    });
    console.log('✅ Created company:', company.name);

    // Create Admin User
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@ecotaqa.com' },
        update: {},
        create: {
            email: 'admin@ecotaqa.com',
            password: 'admin',
            name: 'Admin Ecotaqa',
            role: 'ADMIN',
            energyScore: 95,
            points: 1250,
            companyId: company.id,
        },
    });
    console.log('✅ Created admin user:', adminUser.email);

    // Create Demo User
    const demoUser = await prisma.user.upsert({
        where: { email: 'demo@ecotaqa.com' },
        update: {},
        create: {
            email: 'demo@ecotaqa.com',
            password: 'demo123',
            name: 'Demo User',
            role: 'USER',
            energyScore: 85,
            points: 500,
            companyId: company.id,
        },
    });
    console.log('✅ Created demo user:', demoUser.email);

    // Create Buildings
    const building1 = await prisma.building.upsert({
        where: { id: 'building-1' },
        update: {},
        create: {
            id: 'building-1',
            name: 'Siège Social Casablanca',
            address: 'Boulevard Mohammed V, Casablanca',
            companyId: company.id,
        },
    });

    const building2 = await prisma.building.upsert({
        where: { id: 'building-2' },
        update: {},
        create: {
            id: 'building-2',
            name: 'Usine Tanger',
            address: 'Zone Industrielle, Tanger',
            companyId: company.id,
        },
    });
    console.log('✅ Created buildings:', building1.name, '&', building2.name);

    // Create Departments
    const dept1 = await prisma.department.create({
        data: {
            name: 'Bureau Principal',
            buildingId: building1.id,
        },
    });

    const dept2 = await prisma.department.create({
        data: {
            name: 'Ligne de Production A',
            buildingId: building2.id,
        },
    });
    console.log('✅ Created departments');

    // Create Regions
    const regions = [
        { name: 'Casablanca-Settat', latitude: 33.5731, longitude: -7.5898, status: 'HIGH' },
        { name: 'Rabat-Salé-Kénitra', latitude: 34.0209, longitude: -6.8416, status: 'MEDIUM' },
        { name: 'Marrakech-Safi', latitude: 31.6295, longitude: -7.9811, status: 'LOW' },
        { name: 'Tanger-Tétouan-Al Hoceïma', latitude: 35.7595, longitude: -5.834, status: 'MEDIUM' },
        { name: 'Fès-Meknès', latitude: 34.0181, longitude: -5.0078, status: 'CRITICAL' },
    ];

    for (const region of regions) {
        await prisma.region.upsert({
            where: { name: region.name },
            update: {},
            create: region,
        });
    }
    console.log('✅ Created regions');

    // Create Consumption Data
    const now = new Date();
    for (let i = 0; i < 24; i++) {
        const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
        await prisma.consumption.create({
            data: {
                value: Math.random() * 50 + 10,
                cost: Math.random() * 10 + 2,
                timestamp,
                buildingId: building1.id,
            },
        });
    }
    console.log('✅ Created consumption data (24 hours)');

    // Create Alerts
    await prisma.alert.create({
        data: {
            message: 'Pic de consommation détecté dans le Bureau Principal',
            type: 'SPIKE',
            severity: 'WARNING',
            userId: adminUser.id,
        },
    });

    await prisma.alert.create({
        data: {
            message: 'Heures de pointe approchent (18:00)',
            type: 'INFO',
            severity: 'INFO',
            userId: adminUser.id,
        },
    });
    console.log('✅ Created alerts');

    // Create Badges
    const badges = [
        { name: 'Économe d\'Énergie', description: 'Réduction de 10% de la consommation', iconUrl: '🌱' },
        { name: 'Série Hebdomadaire', description: 'Consommation basse pendant 7 jours', iconUrl: '🔥' },
        { name: 'Oiseau de Nuit', description: 'Utilisation en heures creuses', iconUrl: '🦉' },
        { name: 'Champion Vert', description: 'Score d\'efficacité > 90%', iconUrl: '🏆' },
    ];

    for (const badge of badges) {
        await prisma.badge.upsert({
            where: { name: badge.name },
            update: {},
            create: badge,
        });
    }
    console.log('✅ Created badges');

    // Create Goals
    await prisma.goal.create({
        data: {
            companyId: company.id,
            type: 'REDUCTION',
            targetValue: 20,
            currentValue: 12,
            unit: '%',
            startDate: new Date('2026-01-01'),
            endDate: new Date('2026-12-31'),
            status: 'ACTIVE',
        },
    });

    await prisma.goal.create({
        data: {
            companyId: company.id,
            type: 'EFFICIENCY',
            targetValue: 95,
            currentValue: 85,
            unit: '%',
            startDate: new Date('2026-01-01'),
            endDate: new Date('2026-06-30'),
            status: 'ACTIVE',
        },
    });
    console.log('✅ Created sustainability goals');

    // Create Tips
    const tips = [
        { title: 'Éteignez les lumières', content: 'Économisez jusqu\'à 15% en éteignant les lumières inutilisées', category: 'Office', audience: 'USER' },
        { title: 'Optimisez la climatisation', content: 'Réglez la température à 22°C pour un confort optimal et des économies', category: 'Office', audience: 'USER' },
        { title: 'Maintenance préventive', content: 'Un équipement bien entretenu consomme 20% de moins', category: 'Industrial', audience: 'ADMIN' },
    ];

    for (const tip of tips) {
        await prisma.tip.create({ data: tip });
    }
    console.log('✅ Created energy tips');

    // Create Lessons
    const lessons = [
        { title: 'Introduction à l\'Efficacité Énergétique', content: 'Apprenez les bases de la gestion énergétique', pointsReward: 50 },
        { title: 'Heures de Pointe et Tarification', content: 'Comprenez comment optimiser votre consommation', pointsReward: 75 },
        { title: 'Énergies Renouvelables', content: 'Découvrez les options vertes pour votre entreprise', pointsReward: 100 },
    ];

    for (const lesson of lessons) {
        await prisma.lesson.create({ data: lesson });
    }
    console.log('✅ Created educational lessons');

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Database seeded successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📋 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin Account:');
    console.log('  Email: admin@ecotaqa.com');
    console.log('  Password: admin');
    console.log('');
    console.log('Demo Account:');
    console.log('  Email: demo@ecotaqa.com');
    console.log('  Password: demo123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
