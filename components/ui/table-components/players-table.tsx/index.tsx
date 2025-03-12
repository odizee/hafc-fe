"use client";

import * as React from "react";
// import { tasks } from "@/db/schema";

import { toSentenceCase } from "@/lib/utils";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useFeatureFlags } from "../feature-flags-provider";
import { getPlayersColumns } from "./players-table-columns";

export function PlayersTable({ data, pageCount, columns }: any) {
  const { featureFlags } = useFeatureFlags();

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  // const filterFields: any[] = [
  //   {
  //     id: "title",
  //     label: "Title",
  //     placeholder: "Filter titles...",
  //   },
  //   {
  //     id: "status",
  //     label: "Status",
  //     options: tasks.status.enumValues.map((status: string) => ({
  //       label: toSentenceCase(status),
  //       value: status,
  //       icon: getStatusIcon(status),
  //       count: statusCounts[status],
  //     })),
  //   },
  //   {
  //     id: "priority",
  //     label: "Priority",
  //     options: tasks.priority.enumValues.map((priority: string) => ({
  //       label: toSentenceCase(priority),
  //       value: priority,
  //       icon: getPriorityIcon(priority),
  //       count: priorityCounts[priority],
  //     })),
  //   },
  // ];

  /**
   * Advanced filter fields for the data table.
   * These fields provide more complex filtering options compared to the regular filterFields.
   *
   * Key differences from regular filterFields:
   * 1. More field types: Includes 'text', 'multi-select', 'date', and 'boolean'.
   * 2. Enhanced flexibility: Allows for more precise and varied filtering options.
   * 3. Used with DataTableAdvancedToolbar: Enables a more sophisticated filtering UI.
   * 4. Date and boolean types: Adds support for filtering by date ranges and boolean values.
   */
  // const advancedFilterFields: any[] = [
  //   {
  //     id: "title",
  //     label: "Title",
  //     type: "text",
  //   },
  //   {
  //     id: "status",
  //     label: "Status",
  //     type: "multi-select",
  //     options: tasks.status.enumValues.map((status: string) => ({
  //       label: toSentenceCase(status),
  //       value: status,
  //       icon: getStatusIcon(status),
  //       count: statusCounts[status],
  //     })),
  //   },
  //   {
  //     id: "priority",
  //     label: "Priority",
  //     type: "multi-select",
  //     options: tasks.priority.enumValues.map((priority: string) => ({
  //       label: toSentenceCase(priority),
  //       value: priority,
  //       icon: getPriorityIcon(priority),
  //       count: priorityCounts[priority],
  //     })),
  //   },
  //   {
  //     id: "createdAt",
  //     label: "Created at",
  //     type: "date",
  //   },
  // ];

  const enableAdvancedTable = featureFlags.includes("advancedTable");

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    // filterFields,
    enableAdvancedFilter: enableAdvancedTable,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });
  return (
    <>
      <DataTable
        table={table}
        // floatingBar={
        //   enableFloatingBar ? <TasksTableFloatingBar table={table} /> : null
        // }
      >
        {enableAdvancedTable ? (
          // <DataTableAdvancedToolbar
          //   table={table}
          //   // filterFields={advancedFilterFields}
          //   shallow={false}
          // >
          //   <TasksTableToolbarActions table={table} />
          // </DataTableAdvancedToolbar>
          <div></div>
        ) : (
          //   <DataTableToolbar
          //     table={table}
          //     // filterFields={filterFields}
          //   >
          //     <TasksTableToolbarActions table={table} />
          //   </DataTableToolbar>
          <></>
        )}
      </DataTable>
    </>
  );
}
