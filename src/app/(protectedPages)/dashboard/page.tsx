"use client"
import AccountSearchTable from "@/components/AcountingLedger/AccountSearchTable";
import { AccountData, VoucherData } from "@/lib/Data";
import { getServerSession } from "next-auth";
import { useState } from "react";

export default function () {
    const [isOpen, setIsOpen] = useState(false)

    return <section className="p">
        <AccountSearchTable/>
    </section>
}