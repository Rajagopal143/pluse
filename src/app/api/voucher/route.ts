// app/api/voucher/route.ts (Server Component)
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const vouchers = await req.json();

        if (!Array.isArray(vouchers)) {
            return NextResponse.json(
                { error: 'Expected an array of vouchers' },
                { status: 400 }
            );
        }

        const result = await prisma.voucher.createMany({
            data: vouchers,
            skipDuplicates: true,
        });

        return NextResponse.json({
            message: `${result.count} vouchers inserted successfully`
        });

    } catch (error) {
        console.error('Error inserting vouchers:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}