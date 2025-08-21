"use client";

import React, { useMemo, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export type Column<T> = {
  /** Header label */
  header: string;
  /** Row field key, or virtual key if you use render */
  key: keyof T | string;
  /** Optional custom cell renderer */
  render?: (row: T, rowIndex: number) => React.ReactNode;
  /** Optional class for td */
  cellClassName?: string;
  /** Optional class for th */
  headerClassName?: string;
  /** Optional width (e.g., 'w-48', 'min-w-[200px]') */
  widthClassName?: string;
  /** Enable sort on this column (only if key is keyof T and its values are comparable) */
  sortable?: boolean;
};

export type SortState = {
  key: string | null;
  direction: "asc" | "desc";
};

type CommonTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  /** A unique key for each row */
  rowKey: (row: T, index: number) => React.Key;
  /** Container className (scroll, margins, etc.) */
  containerClassName?: string;
  /** Table className */
  tableClassName?: string;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Zebra rows */
  zebra?: boolean;
  /** Message when there is no data */
  emptyMessage?: string;
  /** Default sort */
  defaultSort?: Partial<SortState>;
  /** Called when sort changes */
  onSortChange?: (state: SortState) => void;
};

function compareValues(a: unknown, b: unknown) {
  // string/number/date-safe compare
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;

  // Dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }

  // Numbers (strings that are numeric -> number)
  const na = typeof a === "string" && !isNaN(Number(a)) ? Number(a) : a;
  const nb = typeof b === "string" && !isNaN(Number(b)) ? Number(b) : b;

  if (typeof na === "number" && typeof nb === "number") {
    return na - nb;
  }

  // Fallback to string compare
  return String(a).localeCompare(String(b));
}

export default function CommonTable<T>({
  columns,
  data,
  rowKey,
  containerClassName = "flex-1 overflow-auto m-6 rounded-lg",
  tableClassName = "w-full",
  stickyHeader = true,
  zebra = true,
  emptyMessage = "No records found.",
  defaultSort,
  onSortChange,
}: CommonTableProps<T>) {
  const [sort, setSort] = useState<SortState>({
    key: defaultSort?.key ?? null,
    direction: defaultSort?.direction ?? "asc",
  });

  const sortedData = useMemo(() => {
    if (!sort.key) return data;
    // find column to ensure valid key
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return data;

    // Only sort if key maps directly to a value on the row
    return [...data].sort((r1, r2) => {
      const v1 = (r1 as any)[sort.key!];
      const v2 = (r2 as any)[sort.key!];
      const base = compareValues(v1, v2);
      return sort.direction === "asc" ? base : -base;
    });
  }, [data, sort, columns]);

  const toggleSort = (key: string) => {
    setSort((prev) => {
      let next: SortState;
      if (prev.key !== key) {
        next = { key, direction: "asc" };
      } else {
        next = { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      onSortChange?.(next);
      return next;
    });
  };

  return (
    <div className={containerClassName}>
      <table className={tableClassName}>
        <thead
          className={`bg-[linear-gradient(135deg,#31acef,#3873bf)] text-white ${stickyHeader ? "sticky top-0 z-10" : ""}`}
        >
          <tr>
            {columns.map((col) => {
              const isSorted = sort.key === col.key;
              return (
                <th
                  key={String(col.key)}
                  className={[
                    "px-6 py-4 text-left text-sm font-medium uppercase tracking-wider select-none",
                    col.headerClassName ?? "",
                    col.widthClassName ?? "",
                    col.sortable ? "cursor-pointer" : "",
                  ].join(" ")}
                  onClick={() => col.sortable && typeof col.key === "string" && toggleSort(String(col.key))}
                >
                  <span className="inline-flex items-center">
                    {col.header}
                    {col.sortable && (
                      <ChevronDownIcon
                        className={[
                          "w-4 h-4 ml-1 transition-transform",
                          isSorted && sort.direction === "asc" ? "rotate-180" : "",
                          !isSorted ? "opacity-70" : "",
                        ].join(" ")}
                      />
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.length === 0 ? (
            <tr>
              <td
                className="px-6 py-8 text-center text-sm text-gray-500"
                colSpan={columns.length}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowKey(row, rowIndex)}
                className={
                  zebra
                    ? rowIndex % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                    : ""
                }
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={["px-6 py-4 whitespace-nowrap", col.cellClassName ?? ""].join(" ")}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : (row as any)[col.key as any]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
