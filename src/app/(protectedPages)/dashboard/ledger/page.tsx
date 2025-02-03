// page.tsx
'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { LedgerAccountDialog } from './ledgerForm'

export default function Page() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="p-4">
            <Button onClick={() => setIsOpen(true)}>
                Open Ledger Account
            </Button>

            <LedgerAccountDialog
                open={isOpen}
                onOpenChange={setIsOpen}
            />
        </div>
    )
}