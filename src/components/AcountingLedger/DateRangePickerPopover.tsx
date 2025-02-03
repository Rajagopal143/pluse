import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import DateRangePicker from "../Datepicker";

interface DateRangePickerPopoverProps {
    dateRange: { from: string; to: string };
    handleDateRangeChange: (newRange: { from: string; to: string }) => void;
}

export const DateRangePickerPopover = ({
    dateRange,
    handleDateRangeChange,
}: DateRangePickerPopoverProps) => (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline">
                {dateRange.from && dateRange.to
                    ? `${format(new Date(dateRange.from), "LLL dd, yyyy")} - ${format(new Date(dateRange.to), "LLL dd, yyyy")}`
                    : "Select Date Range"}
                <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
            <DateRangePicker onChange={handleDateRangeChange} />
        </PopoverContent>
    </Popover>
);