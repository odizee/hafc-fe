"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

interface GetColumnsProps {
  setSelected: React.Dispatch<React.SetStateAction<any | null>>;
  handleOpenConfirm: () => void;
}

export function getPlayersColumns({
  handleOpenConfirm,
  setSelected,
}: GetColumnsProps): ColumnDef<any>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue("name")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "positions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Positions" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("positions")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("status") ? "Present" : "Absent"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        // const label = tasks.label.enumValues.find(
        //   (label: any) => label === row.original.label
        // );

        return (
          <div className="flex space-x-2">
            {/* {label && <Badge variant="outline">{label}</Badge>} */}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("role")}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <Button
            // onClick={() => console.log(row.getValue())}
            onClick={() => {
              handleOpenConfirm();
              setSelected(row.original);
            }}
          >
            {row.original.status ? "Mark Absent" : "Mark Present"}
          </Button>
        );
      },
      size: 40,
    },
  ];
}
