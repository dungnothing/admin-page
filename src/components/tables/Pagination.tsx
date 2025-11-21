import { Button } from "@/components/ui/button"
import { BasicSelect, SelectOption } from "@/components/common/BasicSelect"
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react"

interface TablePaginationProps {
  total: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  showTotal?: boolean
  showPagination?: boolean
  hasFilter?: boolean
}

export function TablePagination({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  showTotal = true,
  showPagination = true,
}: TablePaginationProps) {
  const totalPages = Math.ceil(total / pageSize)

  const handlePageChange = (newPage: number) => {
    if (newPage !== page && newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage)
    }
  }

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const numbers: (number | string)[] = []
    const pageRange = 1 // How many pages to show directly around the current page
    const maxPagesToShowAll = 7 // If totalPages is <= this, show all pages

    if (totalPages <= maxPagesToShowAll) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i)
      }
      return numbers
    }

    // Always add first page
    numbers.push(1)

    // Determine the "left" segment of pages
    const startWindow = Math.max(2, page - pageRange)
    const endWindow = Math.min(totalPages - 1, page + pageRange)

    // Add ellipsis before the window if there's a gap
    if (startWindow > 2) {
      numbers.push("ellipsis-start")
    }

    // Add pages within the window
    for (let i = startWindow; i <= endWindow; i++) {
      numbers.push(i)
    }

    // Add ellipsis after the window if there's a gap
    if (endWindow < totalPages - 1) {
      numbers.push("ellipsis-end")
    }

    // Add last page
    numbers.push(totalPages)

    return numbers
  }

  const pageNumbers = getPageNumbers()

  const pageSizeOptions: SelectOption[] = [
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ]

  const handlePageSizeChange = (newPageSize: string | number | null) => {
    if (typeof newPageSize === "number" && onPageSizeChange) {
      onPageSizeChange(newPageSize)
    }
  }

  return (
    <div className="w-full flex items-center justify-between">
      {showTotal && total > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-body-md">Đang xem</span>
          <div className="min-w-14.5">
            <BasicSelect
              options={pageSizeOptions}
              value={pageSize}
              onChange={handlePageSizeChange}
              size="pagination-sm"
            />
          </div>
          <span className="text-body-md">hàng mỗi trang.</span>
        </div>
      )}

      {showPagination && total > 0 && (
        <div className="flex items-center justify-center border border-gray-200 rounded-md overflow-hidden">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="h-10 w-10 flex items-center justify-center border-r border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Previous page"
            tabIndex={0}
          >
            <ChevronLeft color="var(--color-gray-09)" width={20} height={20} />
          </button>

          {/* Page numbers */}
          {pageNumbers.map((pageNumber, index) => {
            if (pageNumber === "ellipsis-mid" || pageNumber === "ellipsis-start" || pageNumber === "ellipsis-end") {
              return (
                <div className="p-1" key={`ellipsis-${index}`}>
                  <div
                    className="rounded-xs h-8 min-w-8 flex items-center justify-center"
                    aria-label="Jump to intermediate pages"
                    tabIndex={0}
                  >
                    <Ellipsis color="var(--color-gray-03)" width={16} height={16} />
                  </div>
                </div>
              )
            }

            const isActive = page === pageNumber

            return (
              <div className="p-1" key={`page-${pageNumber}`}>
                <Button
                  variant={isActive ? "primary" : "tertiary-ghost"}
                  color={isActive ? "brand" : "gray"}
                  onClick={() => handlePageChange(Number(pageNumber))}
                  aria-label={`Page ${pageNumber}`}
                  aria-current={isActive ? "page" : undefined}
                  tabIndex={0}
                >
                  {pageNumber}
                </Button>
              </div>
            )
          })}

          {/* Next button */}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="h-10 w-10 flex items-center justify-center border-l border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Next page"
            tabIndex={0}
          >
            <ChevronRight color="var(--color-gray-09)" width={20} height={20} />
          </button>
        </div>
      )}
    </div>
  )
}
