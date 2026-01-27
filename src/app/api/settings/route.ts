import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, monthlyBudget, alertsEnabled } = body;

        // Here you would typically update the user in the database via Prisma
        // const user = await prisma.user.update({...})

        console.log('Received settings update:', { name, email, monthlyBudget, alertsEnabled });

        // Simulate network delay and DB operation
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({
            success: true,
            message: 'Settings updated successfully',
            data: body
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
