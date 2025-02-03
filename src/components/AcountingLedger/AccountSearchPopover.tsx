import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Account } from "@prisma/client";

interface AccountSearchPopoverProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredAccounts: Account[];
    isAccountsLoading: boolean;
    handleAccountSelect: (account: Account) => void;
}

export const AccountSearchPopover = ({
    searchQuery,
    setSearchQuery,
    filteredAccounts,
    isAccountsLoading,
    handleAccountSelect,
}: AccountSearchPopoverProps) => (
    <Popover>
        <PopoverTrigger className="w-full sm:w-auto">
            <Input
                placeholder="Search accounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
            />
        </PopoverTrigger>
        <PopoverContent className="w-[95vw] sm:w-[600px] h-[400px] overflow-auto p-2" align="start">
            {isAccountsLoading ? (
                <div className="flex justify-center">
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : filteredAccounts.length > 0 ? (
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead>Account Head</TableHead>
                            <TableHead>Account Id</TableHead>
                            <TableHead>Master Group</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAccounts.map((account) => (
                            <TableRow
                                key={account.AccountId}
                                onClick={() => handleAccountSelect(account)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <TableCell>{account.AccountHead}</TableCell>
                                <TableCell>{account.AccountId}</TableCell>
                                <TableCell>{account.MasterGroup}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="p-2 text-gray-500">No accounts found</p>
            )}
        </PopoverContent>
    </Popover>
);