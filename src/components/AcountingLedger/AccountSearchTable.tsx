"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Columns, Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";

// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DateRangePicker from "../Datepicker";
import { LedgerAccountDialog } from "@/app/(protectedPages)/dashboard/ledger/ledgerForm";
import GroupedSortableTable from "@/app/(protectedPages)/dashboard/table/GroupTable";

// Lib
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import AccountingBoxes from "../AccountingBox";

// Types
interface Account {
    AccountId: string;
    AccountHead: string;
    ReferenceNo?: string;
    MasterGroup: string;
}

interface Voucher {
    VoucherNo: string;
    VoucherDate: string;
    AccountHead: string;
    AccountHeadName: string;
    DrAmount: number;
    CrAmount: number;
    VoucherType: string;
    VoucherEffectiveDate: string;
    MasterGroup?: string;
}

// Constants
const API_URLS = {
    ACCOUNTS: "https://qd-erp.uaenorth.cloudapp.azure.com/api/AccountingLedgers/GetLedgerAccounts",
    VOUCHERS: "https://qd-erp.uaenorth.cloudapp.azure.com/api/AccountingLedgers/GetVouchers"
};

const COLUMN_CONFIG = [
    { key: "VoucherNo", label: "Voucher Number" },
    { key: "VoucherDate", label: "Voucher Date" },
    { key: "AccountHeadName", label: "Account Name" },
    { key: "DrAmount", label: "Debit Amount" },
    { key: "CrAmount", label: "Credit Amount" },
    { key: "VoucherType", label: "Voucher Type" },
    { key: "VoucherEffectiveDate", label: "Effective Date" },
];

const PAGE_SIZE = 10;

const AccountSearchTable: React.FC = () => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [visibleColumns, setVisibleColumns] = useState<(keyof Voucher)[]>([
        "VoucherNo", "VoucherDate", "AccountHeadName", "DrAmount", "CrAmount"
    ]);
    const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" });
    const [loading, setLoading] = useState({ accounts: false, vouchers: false });
    const [currentPage, setCurrentPage] = useState(1);
    const [groupBy, setGroupBy] = useState(false);
    const [dateRangeOpen, setDateRangeOpen] = useState(false);

    // Memoized derived data
    const filteredAccounts = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        return accounts.filter(account =>
            account.AccountHead.toLowerCase().includes(query) ||
            account.AccountId.includes(query) ||
            account.MasterGroup?.toLowerCase().includes(query)
        );
    }, [searchQuery, accounts]);

    const filteredVouchers = useMemo(() => {
        if (!selectedAccount) return [];
        return vouchers.filter(voucher => voucher.MasterGroup === selectedAccount.MasterGroup);
    }, [vouchers, selectedAccount]);
    console.log(filteredVouchers)
    const paginatedVouchers = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredVouchers.slice(start, start + PAGE_SIZE);
    }, [filteredVouchers, currentPage]);

    const totalPages = Math.ceil(filteredVouchers.length / PAGE_SIZE);
    const columns = useMemo(() => COLUMN_CONFIG.map(col => ({
        accessorKey: col.key,
        header: col.label,
        cell: ({ row }) => row.getValue(col.key),
    })), []);

    // Handlers
    const handleDateRangeChange = useCallback((newRange: { from: string; to: string }) => {
        setDateRange(newRange);
    }, []);

    const handleColumnToggle = useCallback((columnKey: keyof Voucher, checked: boolean) => {
        setVisibleColumns(prev => checked ? [...prev, columnKey] : prev.filter(c => c !== columnKey));
    }, []);

    const handleAccountSelect = useCallback((account: Account) => {
        setSelectedAccount(account);
        setSearchQuery("");
        toast({ title: "Success", description: `Account "${account.AccountHead}" selected` });
        setVouchers([]);
    }, [toast]);

    // Data fetching
    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(prev => ({ ...prev, accounts: true }));
            try {
                const res = await fetch(`${API_URLS.ACCOUNTS}?_=${Date.now()}`);
                if (!res.ok) throw new Error("Failed to fetch accounts");
                const { data } = await res.json();
                setAccounts(data);
            } catch (error) {
                toast({ variant: "destructive", title: "Error", description: error.message });
            } finally {
                setLoading(prev => ({ ...prev, accounts: false }));
            }
        };

        fetchAccounts();
    }, [toast]);

    useEffect(() => {
        const fetchVouchers = async () => {
            if (!selectedAccount || !dateRange.from || !dateRange.to) return;

            setLoading(prev => ({ ...prev, vouchers: true }));
            try {
                const params = new URLSearchParams({
                    accountId: selectedAccount.AccountId,
                    frmDate: format(new Date(dateRange.from), "MM/dd/yyyy"),
                    toDate: format(new Date(dateRange.to), "MM/dd/yyyy")
                });

                const res = await fetch(`${API_URLS.VOUCHERS}?${params}`);
                if (!res.ok) throw new Error("Failed to fetch vouchers");
                const data = await res.json();
                setVouchers(data);
                setCurrentPage(1);
            } catch (error) {
                toast({ variant: "destructive", title: "Error", description: error.message });
            } finally {
                setLoading(prev => ({ ...prev, vouchers: false }));
            }
        };

        fetchVouchers();
    }, [selectedAccount, dateRange, toast]);

    return (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
          <h1 className="absolute font-semibold">Accounting Ledger</h1>
            {/* Controls Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex gap-2 flex-1 w-full relative">
                            <Input
                                placeholder="Search accounts..."
                        value={searchQuery ? searchQuery : selectedAccount?.AccountHead}
                        onChange={(e) => {
                            if (selectedAccount) setSelectedAccount(null);
                            setSearchQuery(e.target.value)
                        }
}
                            />
                            {filteredAccounts.length > 0  ? (
                        <Card className="min-w-[70vw] absolute top-10 sm:w-[600px] h-[400px] overflow-auto z-10">
                                <Table>
                                    <TableHeader className="bg-gray-50">
                                        <TableRow>
                                            <TableHead>Account Head</TableHead>
                                            <TableHead>Account ID</TableHead>
                                            <TableHead>Master Group</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredAccounts.map(account => (
                                            <TableRow
                                                key={account.AccountId}
                                                onClick={() => handleAccountSelect(account)}
                                                className="hover:bg-gray-50 cursor-pointer"
                                            >
                                                <TableCell>{account.AccountHead}</TableCell>
                                                <TableCell>{account.AccountId}</TableCell>
                                                <TableCell>{account.MasterGroup}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                    </Card>
                            ) : null
                            }
                    <Button onClick={() => setIsOpen(true)} variant="outline">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex gap-2 items-center">
                    <label className="flex items-center gap-2 text-sm">
                        <span>Group By</span>
                        <Switch checked={groupBy} onCheckedChange={setGroupBy} />
                    </label>

                    <Popover onOpenChange={ setDateRangeOpen} open={dateRangeOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                {dateRange.from && dateRange.to ? (
                                    `${format(new Date(dateRange.from), "LLL dd, yyyy")} - ${format(new Date(dateRange.to), "LLL dd, yyyy")}`
                                ) : "Select Date Range"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4" >
                            <DateRangePicker onChange={handleDateRangeChange} setDateRangeOpen={setDateRangeOpen} />
                        </PopoverContent>
                    </Popover>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Columns className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {COLUMN_CONFIG.map(({ key, label }) => (
                                <DropdownMenuCheckboxItem
                                    key={key}
                                    checked={visibleColumns.includes(key as keyof Voucher)}
                                    onCheckedChange={(checked) => handleColumnToggle(key as keyof Voucher, checked)}
                                >
                                    {label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AccountingBoxes data={filteredVouchers} />

                </div>
            </div>

            {/* Table Section */}
            {groupBy ? (
                <GroupedSortableTable data={vouchers} columns={COLUMN_CONFIG
                    .filter((col:any) => visibleColumns.includes(col.key))
                    .map((col:any) => ({
                        accessorKey: col.key,
                        header: col.label,
                        cell: ({ row }) => row.getValue(col.key),
                    }))} visibleColumns={visibleColumns} />
            ) : (
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader className="bg-gray-200">
                            <TableRow>
                                {visibleColumns.map(key => (
                                    <TableHead key={key} className="font-semibold text-gray-700">
                                        {COLUMN_CONFIG.find(c => c.key === key)?.label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading.vouchers ? (
                                Array(PAGE_SIZE).fill(0).map((_, i) => (
                                    <TableRow key={i}>
                                        {visibleColumns.map(key => (
                                            <TableCell key={key}>
                                                <Skeleton className="h-4 w-[80%]" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : paginatedVouchers.length > 0 ? (
                                paginatedVouchers.map((voucher,index) => (
                                    <TableRow key={`${voucher.VoucherNo}-${voucher.AccountHeadName}`} className={` cursor-pointer ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                                        {visibleColumns.map(key => (
                                            <TableCell key={key}>
                                                {["VoucherDate", "VoucherEffectiveDate"].includes(key) ? (
                                                    new Date(voucher[key]).toLocaleDateString()
                                                ) : ["DrAmount", "CrAmount"].includes(key) ? (
                                                        <span className={`${key=="DrAmount" ? "bg-red-500 text-white" : "bg-green-500 text-white"} px-2 rounded-2xl`}>
                                                            {`$${voucher[key].toFixed(2)}`}
                                                            </span>
                                                ) : voucher[key]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={visibleColumns.length} className="h-96 text-center">
                                        {selectedAccount ? "No vouchers found" : "Select an account"}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Pagination */}
            {!groupBy && totalPages > 1 && (
                <div className="flex justify-end items-center gap-4">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    >
                        Previous
                    </Button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    >
                        Next
                    </Button>
                </div>
            )}

            <LedgerAccountDialog open={isOpen} onOpenChange={setIsOpen} />
        </div>
    );
};

export default AccountSearchTable;