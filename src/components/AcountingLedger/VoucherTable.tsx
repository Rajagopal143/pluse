import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Account, columnDefinitions, Voucher } from "@/lib/Types";

interface VoucherTableProps {
    visibleColumns: (keyof Voucher)[];
    paginatedVouchers: Voucher[];
    isVouchersLoading: boolean;
    selectedAccount: Account | null;
}

export const VoucherTable = ({
    visibleColumns,
    paginatedVouchers,
    isVouchersLoading,
    selectedAccount,
}: VoucherTableProps) => (
    <div className="rounded-lg border">
        <Table>
            <TableHeader className="bg-gray-50">
                <TableRow>
                    {visibleColumns.map((columnKey) => {
                        const column = columnDefinitions.find(c => c.key === columnKey);
                        return (
                            <TableHead key={columnKey} className="font-semibold text-gray-700">
                                {column?.label || columnKey}
                            </TableHead>
                        );
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {isVouchersLoading ? (
                    Array(5).fill(0).map((_, index) => (
                        <TableRow key={index}>
                            {visibleColumns.map((columnKey) => (
                                <TableCell key={columnKey}>
                                    <Skeleton className="h-4 w-[80%]" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : paginatedVouchers.length > 0 ? (
                    paginatedVouchers.map((voucher:any) => (
                        <TableRow key={`${voucher.VoucherNo}-${voucher.AccountHead}`} className="hover:bg-gray-50 transition-colors">
                            {visibleColumns.map((columnKey) => (
                                <TableCell key={columnKey} className="py-3">
                                    {["VoucherDate", "VoucherEffectiveDate"].includes(columnKey)
                                        ? new Date(voucher[columnKey]).toLocaleDateString()
                                        : columnKey === "DrAmount" || columnKey === "CrAmount"
                                            ? `$${voucher[columnKey].toFixed(2)}`
                                            : voucher[columnKey]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={visibleColumns.length} className="h-24 text-center text-gray-500">
                            {selectedAccount
                                ? "No vouchers found for the selected criteria."
                                : "Select an account and date range to view vouchers."}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
);