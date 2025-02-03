// pages/api/accounts.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req:any, res:any) {
    if (req.method === 'POST') {
        try {
            const accounts = req.body;

            if (!Array.isArray(accounts)) {
                return res.status(400).json({ error: 'Expected an array of accounts' });
            }

            const result = await prisma.account.createMany({
                data: accounts,
                skipDuplicates: true,
            });

            return res.status(200).json({ message: 'Accounts inserted successfully', count: result.count });
        } catch (error) {
            console.error('Error inserting accounts:', error);
            return res.status(500).json({ error: 'An error occurred while inserting accounts.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
