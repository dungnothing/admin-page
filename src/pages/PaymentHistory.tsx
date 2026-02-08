import PageBreadcrumb from "../components/common/PageBreadCrumb"
import SearchInput from "@/components/common/basic/SearchInput"
import { useEffect, useState } from "react"
import BasicTable from "@/components/common/basic/tables/BasicTable"
import { getPaymentsAPI } from "@/apis/admin"
import { useDebounce } from "@/hooks/useDebounce"
import dayjs from "dayjs"
import { toast } from "react-toastify"

export default function PaymentHistory() {
  const [payments, setPayments] = useState<any>()
  const [filter, setFilter] = useState<any>({ page: 1, size: 20, term: "" })
  const debouncedSearchValue = useDebounce(filter.term)

  const fetchPayments = async () => {
    try {
      const response = await getPaymentsAPI({ page: filter.page, size: filter.size, term: debouncedSearchValue })
      setPayments(response)
    } catch (error) {
      toast.error("Lỗi khi tải lịch sử thanh toán")
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [filter.page, filter.size, debouncedSearchValue])

  const columns = [
    {
      id: "index",
      label: "STT",
      width: "48px",
      align: "center",
      labelRender: () => <div className="w-full text-center text-text-tertiary font-semibold">STT</div>,
    },
    {
      id: "user",
      label: "Người dùng",
      width: "240px",
      align: "left" as const,
      render: (info: any) => <div className="w-full text-brand-primary ">{info.user?.userName || "-"}</div>,
    },
    {
      id: "email",
      label: "Email",
      width: "220px",
      align: "left" as const,
      render: (info: any) => <div>{info.user?.email || "-"}</div>,
    },
    { id: "price", label: "Số tiền", width: "140px", align: "left" as const },
    { id: "plan", label: "Gói", width: "120px", align: "left" as const },
    {
      id: "startedAt",
      label: "Thời gian",
      width: "220px",
      align: "left" as const,
      render: (info: any) => <div>{dayjs(info.startedAt).format("HH:mm - DD/MM/YYYY")}</div>,
    },
  ]

  return (
    <>
      <PageBreadcrumb pageTitle="Lịch sử thanh toán" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Lịch sử giao dịch</h3>
        </div>

        <div className="space-y-6">
          <div className="w-150">
            <SearchInput
              searchValue={filter.term}
              setSearchValue={(value) => setFilter({ ...filter, term: value, page: 1 })}
              placeholder="Tìm theo tên người dùng, email hoặc gói"
            />
          </div>

          <BasicTable
            columns={columns}
            data={payments?.data || []}
            pagination={true}
            total={payments?.total || 0}
            page={filter.page}
            pageSize={filter.size}
            onPageChange={setFilter}
            onPageSizeChange={(size: any) => setFilter({ ...filter, size: size })}
          />
        </div>
      </div>
    </>
  )
}
