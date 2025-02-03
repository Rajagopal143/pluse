"use client";

import { useState } from "react";
import { format, startOfToday, subDays, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear, subYears } from "date-fns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

/**
 * Preset ranges available in the dropdown.
 */
const presetRanges = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Month", value: "this_month" },
    { label: "Last Month", value: "last_month" },
    { label: "This Year", value: "this_year" },
    { label: "Last Year", value: "last_year" },
];

const DateRangePicker = ({ onChange, setDateRangeOpen }:any) => {
    // The state holds date strings in "yyyy-MM-dd" format for the native date inputs.
    const [dateRange, setDateRange] = useState({ from: "", to: "" });

    /**
     * When a preset is selected, compute the from/to values accordingly.
     */
    const handlePresetSelect = (preset:any) => {
        const today = new Date();
        let from, to;
        switch (preset) {
            case "today":
                from = today;
                to = today;
                break;
            case "yesterday":
                from = subDays(today, 1);
                to = subDays(today, 1);
                break;
            case "this_month":
                from = startOfMonth(today);
                to = endOfMonth(today);
                break;
            case "last_month":
                const lastMonthDate = subMonths(today, 1);
                from = startOfMonth(lastMonthDate);
                to = endOfMonth(lastMonthDate);
                break;
            case "this_year":
                from = startOfYear(today);
                to = endOfYear(today);
                break;
            case "last_year":
                const lastYearDate = subYears(today, 1);
                from = startOfYear(lastYearDate);
                to = endOfYear(lastYearDate);
                break;
            default:
                return;
        }

        const newRange = {
            from: format(from, "yyyy-MM-dd"),
            to: format(to, "yyyy-MM-dd"),
        };
        setDateRange(newRange);
        if (onChange) onChange(newRange);
    };

    /**
     * Update state when a date input changes.
     */
    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        const newRange = { ...dateRange, [name]: value };
        setDateRange(newRange);
        if (onChange) onChange(newRange);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Date inputs */}
            <div className="flex items-center gap-2">
                <input
                    type="date"
                    name="from"
                    value={dateRange.from}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                    placeholder="From"
                />
                <span>to</span>
                <input
                    type="date"
                    name="to"
                    value={dateRange.to}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                    placeholder="To"
                />
            </div>

            {/* Preset dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Select Preset</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[150px]">
                    {presetRanges.map((preset) => (
                        <DropdownMenuItem key={preset.value} onSelect={() => {
                            setDateRangeOpen(false)
                            handlePresetSelect(preset.value)
                        }
                        }>
                            {preset.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DateRangePicker;
