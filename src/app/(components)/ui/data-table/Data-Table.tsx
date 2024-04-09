"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-view-options";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { Button } from "../button";
import { Input } from "../input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../select";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  getDepartments,
  getDepartmentById,
} from "../../../../lib/services/departments/service";
import { getClass } from "../../../../lib/services/class/service";
import {
  getStaffs,
  getDepartmentStaffs,
} from "../../../../lib/services/users/service";

import { usePathname } from "next/navigation";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const pathname = usePathname();
  const [departments, setDepartments] = React.useState([]);
  const [classList, setClassList] = React.useState([]);
  const [classData, setClassData] = React.useState([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const fetchDepartments = async () => {
    try {
      setDepartments(await getDepartments());
    } catch (error) {
      setDepartments([]);
    }
  };

  const fetchDepartment = async (id: string) => {
    try {
      const department = await getDepartmentById(id);
      setClassList(department.classes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClass = async (id: string) => {
    try {
      const data = await getClass(id);
      setClassData(data.students);
    } catch (Error) {
      console.log(Error);
    }
  };

  const fetchStaffs = async () => {
    try {
      const data = await getStaffs();
      setClassData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const FetchDeptStaffs = async (id: string) => {
    try {
      const data = await getDepartmentStaffs(id);
      setClassData(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  data = data ? data : classData;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const isFiltered = table.getState().columnFilters.length > 0;

  React.useEffect(() => {
    if (pathname == "/staffs") fetchStaffs();
    fetchDepartments();
  }, []);

  React.useEffect(() => {}, [classData]);

  if (!departments) return <div>Loading...</div>;

  return (
    <div>
      <div className="my-2 flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter Email"
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {pathname == "/students" ? (
            <>
              <Select
                onValueChange={(value) => {
                  fetchDepartment(value);
                  setClassData([]);
                }}
              >
                <SelectTrigger className="w-[275px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Department</SelectLabel>
                    {departments &&
                      departments?.map((department: any) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {classList.length > 0 && (
                <Select
                  onValueChange={(value) => {
                    fetchClass(value);
                  }}
                >
                  <SelectTrigger className="w-[275px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Class</SelectLabel>
                      {classList &&
                        classList?.map((classItem: any) => (
                          <SelectItem key={classItem.id} value={classItem.id}>
                            {classItem.batch} {classItem.section}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </>
          ) : null}
          {pathname == "/staffs" ? (
            <>
              <Select
                onValueChange={(value) => {
                  value == "admin" ? fetchStaffs() : FetchDeptStaffs(value);
                }}
              >
                <SelectTrigger className="w-[275px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Department</SelectLabel>
                    <SelectItem value="admin">Admin</SelectItem>
                    {departments &&
                      departments?.map((department: any) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          ) : null}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
