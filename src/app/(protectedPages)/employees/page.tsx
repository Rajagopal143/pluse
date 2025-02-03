// app/page.tsx (Client Component)
'use client';

import { Button } from '@/components/ui/button';
import { VoucherData } from '@/lib/Data';
import { useState } from 'react';

export default function Home() {
  const [responseMessage, setResponseMessage] = useState('');

  async function sendVouchers() {
    try {
      const res = await fetch('/api/voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(VoucherData),
      });

      if (!res.ok) throw new Error('Failed to submit vouchers');

      const data = await res.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error('Error sending vouchers:', error);
      setResponseMessage(error instanceof Error ? error.message : 'Error sending vouchers');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Send Vouchers</h1>
      <Button onClick={sendVouchers}>Send Voucher Data</Button>
      {responseMessage && <p className="mt-4 text-sm">{responseMessage}</p>}
    </div>
  );
}