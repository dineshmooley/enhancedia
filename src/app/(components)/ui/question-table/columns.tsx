"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { Checkbox } from "../checkbox";
import { Button } from "../button";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "question",
    header: "Question",
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(value));
    // },
    cell: ({ row }) => <div>{row.getValue("question")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "topic",
    header: "Topic",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => <div>{row.getValue("topic")}</div>,
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <>
          <Link href={`/questions/${row.getValue("id")}`}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Action</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </>
      );
    },
  },
];
