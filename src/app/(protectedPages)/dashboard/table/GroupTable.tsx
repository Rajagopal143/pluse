"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// ----- Default Column Definition -----


// ----- Grouping Utility (unchanged) -----
type Group<T> = {
    groupKey: keyof T;
    groupValue: string | number;
    subRows: Array<Group<T> | T>;
};

function groupData<T extends Record<string, any>>(
    data: T[],
    groupingKeys: (keyof T)[]
): Array<Group<T> | T> {
    if (!groupingKeys || groupingKeys.length === 0) return data;
    const [firstKey, ...restKeys] = groupingKeys;

    const groups: Record<string, T[]> = data?.reduce((acc, row) => {
        const groupValue = row[firstKey];
        const key = String(groupValue);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(row);
        return acc;
    }, {} as Record<string, T[]>);

    return Object?.entries(groups).map(([groupValue, rows]) => ({
        groupKey: firstKey,
        groupValue,
        subRows: groupData(rows, restKeys),
    }));
}

// ----- Draggable Header Component (unchanged) -----
function DraggableColumn({ header }: { header: any }) {
    // Use the column’s accessorKey as the unique sortable id.
    const sortableId = header.column.columnDef.accessorKey;
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: sortableId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
        padding: "8px",
        userSelect: "none",
    };

    return (
        <TableCell
            as="th"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            {flexRender(header.column.columnDef.header, header.getContext())}
        </TableCell>
    );
}

// ----- Recursive Renderer for Grouped Data (unchanged) -----
function RenderGroupedRows<T extends Record<string, any>>({
    groupedData,
    columns,
    level = 0,
}: {
    groupedData: Array<Group<T> | T>;
    columns: ColumnDef<T>[];
    level?: number;
}) {
    return (
        <>
            {groupedData.map((item, index) => {
                if ("groupKey" in item) {
                    // Render group header row
                    return (
                        <React.Fragment key={`group-${item.groupKey}-${item.groupValue}-${index}`}>
                            <TableRow className="hover:bg-gray-50 cursor-pointer transition-colors ">
                                <TableCell colSpan={columns.length} style={{ paddingLeft: level * 20 }}>
                                    <strong>
                                        {item.groupKey}: {item.groupValue} ({item.subRows.length})
                                    </strong>
                                </TableCell>
                            </TableRow>
                            <RenderGroupedRows groupedData={item.subRows} columns={columns} level={level + 1} />
                        </React.Fragment>
                    );
                } else {
                    // Render normal row
                    return (
                        <TableRow key={`row-${item.id}`} className="hover:bg-gray-50">
                            {columns.map((col) => (
                                <TableCell key={`${item.id}-${col.accessorKey}`} style={{ paddingLeft: level * 20 }}>
                                    {item[col.accessorKey as keyof Person]}
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                }
            })}
        </>
    );
}
interface GroupedSortableTableProps {
    data: any[];
    columns?: ColumnDef<any>[];
    visibleColumns?:string[]
}

// ----- Main Component -----
export default function GroupedSortableTable({
    data: dynamicData,
    columns: dynamicColumns,
    visibleColumns: visibleColumns
}: GroupedSortableTableProps) {
    // Use dynamic data and allow dynamic columns (or fallback to defaultColumns)
    const [data, setData] = useState<any[]>(dynamicData);
    const [columns, setColumns] = useState<ColumnDef<any>[]>(
        dynamicColumns 
    );

    // Update local data if dynamicData prop changes.
    useEffect(() => {
        setData(dynamicData);
    }, [dynamicData]);

    // If you want to allow columns to be updated from outside, add a similar effect for columns:
    useEffect(() => {
        if (dynamicColumns) {
            setColumns(dynamicColumns);
        }
    }, [dynamicColumns, visibleColumns]);

    // Create a table instance for header rendering (rows not used in grouping)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Use the current column order (accessorKeys) as the grouping order.
    const groupingOrder = useMemo(() => columns.map((col) => col.accessorKey), [columns]);

    // Group the data based on the current header order.
    const groupedData = useMemo(() => {
        return groupData(data, groupingOrder as (keyof any)[]);
    }, [data, groupingOrder]);

    // Set up DnD sensors
    const sensors = useSensors(useSensor(PointerSensor));

    // Handle header drag end to update the column order (and thus the grouping order)
    const handleColumnDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        if (active.id !== over.id) {
            setColumns((prev) => {
                const oldIndex = prev.findIndex((col) => col.accessorKey === active.id);
                const newIndex = prev.findIndex((col) => col.accessorKey === over.id);
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className="rounded-lg border max-w-[88vw] ">
            {/* Header Section with draggable columns */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleColumnDragEnd}>
                <SortableContext items={columns.map((col) => col.accessorKey)}>
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                {table.getHeaderGroups().map((headerGroup) =>
                                    headerGroup.headers.map((header) => (
                                        // Use DraggableColumn to render a draggable header cell.
                                        <DraggableColumn key={header.id} header={header} />
                                    ))
                                )}
                            </TableRow>
                        </TableHeader>
                    </Table>
                </SortableContext>
            </DndContext>

            {/* Grouped Data Table */}
            <Table className="max-h-[600px] overflow-y-auto">
                <TableBody >
                    <RenderGroupedRows groupedData={groupedData} columns={columns} />
                </TableBody>
            </Table>
        </div>
    );
}
