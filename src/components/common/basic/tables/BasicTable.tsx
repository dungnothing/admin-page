import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/utils/constant"
import { TablePagination } from "./Pagination"

interface BasicTableProps {
  columns: any[]
  data: any[]
  pagination?: boolean
  total?: number
  page?: number
  sortDirection?: "asc" | "desc"
  pageSize?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (page: any) => void
  stickyHeader?: boolean
  maxHeight?: string
  minHeight?: string
  emptyContent?: React.ReactNode
  onSort?: (column: string, direction: "asc" | "desc") => void
}

const BasicTable = ({
  columns,
  data,
  pagination = true,
  total,
  page,
  sortDirection,
  pageSize,
  onPageChange,
  onPageSizeChange,
  emptyContent,
  onSort,
}: BasicTableProps) => {
  if (emptyContent && data.length === 0) {
    return <div className="flex flex-col gap-6">{emptyContent}</div>
  }

  return (
    <div className="flex flex-col gap-6 ">
      <Table
        className=""
        style={{
          ...(columns.some((col) => col.width?.includes("%")) && { tableLayout: "fixed", width: "100%" }),
        }}
      >
        <TableHeader className="bg-gray-secondary rounded-md">
          <TableRow className="rounded-md border-none hover:bg-transparent dark:hover:bg-transparent">
            {columns.map((column, index) => (
              <TableHead
                key={column.id}
                align={column.align || "left"}
                className={cn(
                  index === 0 && "rounded-l-md",
                  index === columns.length - 1 && "rounded-r-md ",
                  "dark:bg-[#5459AC]",
                )}
                style={{
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                  width: column.width,
                }}
                onClick={() => {
                  if (column.sortable && onSort) {
                    onSort(column.id, sortDirection === "asc" ? "desc" : "asc")
                  }
                }}
              >
                <div className="inline-flex items-center gap-1 w-full">
                  {typeof column.labelRender === "function" ? (
                    column.labelRender()
                  ) : (
                    <div
                      className={cn(
                        "text-body-M font-semibold text-text-tertiary dark:text-gray-200 w-full",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.align === "left" && "text-left",
                      )}
                    >
                      {column.label}
                    </div>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.id || row._id || index}
              className="hover:bg-gray-50 dark:hover:bg-white/[0.03] border-b border-gray-100 dark:border-white/[0.05]"
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={cn(
                    "font-medium",
                    column.verticalAlign === "top" && "align-top",
                    "overflow-hidden",
                    column.verticalAlign === "top" && "!whitespace-normal",
                  )}
                  style={{
                    width: column.width,
                    ...(column.width?.includes("%") ? {} : { maxWidth: column.width }),
                    minWidth: column.minWidth,
                  }}
                >
                  <div
                    className={cn(
                      "w-full max-w-full min-w-0",
                      column.verticalAlign === "top" ? "flex flex-col items-start" : "flex items-center",
                      column.align === "right" && "justify-end",
                      column.align === "center" && "justify-center",
                      column.align === "left" && "justify-start",
                    )}
                  >
                    {column.id === "index" ? (
                      <p className="text-body-M text-text-tertiary dark:text-gray-400">
                        {page ? (page - 1) * (pageSize || 10) + index + 1 : index + 1}
                      </p>
                    ) : (
                      <>
                        {typeof column.render === "function" ? (
                          column.render(row)
                        ) : (
                          <p className="text-label-lg text-primary font-normal dark:text-gray-200">{row[column.id]}</p>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pagination && (
        <TablePagination
          total={total || 0}
          page={page || 0}
          pageSize={pageSize || 0}
          onPageChange={onPageChange || (() => {})}
          onPageSizeChange={onPageSizeChange || (() => {})}
        />
      )}
    </div>
  )
}

export default BasicTable
