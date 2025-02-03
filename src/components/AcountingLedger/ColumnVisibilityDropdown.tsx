import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Columns } from "lucide-react";
import { columnDefinitions } from "@/lib/Types";

interface ColumnVisibilityDropdownProps {
    visibleColumns: string[];
    handleColumnToggle: (columnKey: string, checked: boolean) => void;
}

export const ColumnVisibilityDropdown = ({
    visibleColumns,
    handleColumnToggle,
}: ColumnVisibilityDropdownProps) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">
                <Columns className="mr-2 h-4 w-4" />
                Columns
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[200px]">
            {columnDefinitions.map((column) => (
                <DropdownMenuCheckboxItem
                    key={column.key}
                    checked={visibleColumns.includes(column.key)}
                    onCheckedChange={(checked) => handleColumnToggle(column.key, checked)}
                >
                    {column.label}
                </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);