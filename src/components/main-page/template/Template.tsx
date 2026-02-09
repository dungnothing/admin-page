import PageBreadcrumb from "../../common/PageBreadCrumb"

import { useState, useEffect, useMemo } from "react"
import BasicTable from "@/components/common/basic/tables/BasicTable"
import Label from "@/components/form/Label"
import SearchInput from "@/components/common/basic/SearchInput"
import dayjs from "dayjs"
import MoreAction from "@/components/ui/dropdown/MoreAction"
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem"

import CreateTemplate from "./CreateTemplate"
import { getTemplatesAPI } from "@/apis/admin"
import { toast } from "react-toastify"
import { useDebounce } from "@/hooks/useDebounce"

const Template = () => {
  const [filter, setFilter] = useState<any>({
    page: 1,
    size: 20,
    term: "",
  })
  const [allTemplates, setAllTemplates] = useState<any[]>([])

  const debouncedSearchTerm = useDebounce(filter.term, 500)

  const fetchTemplateList = async () => {
    try {
      const data = await getTemplatesAPI()
      // Ensure data is an array
      setAllTemplates(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error("Lỗi khi tải danh sách mẫu")
      setAllTemplates([])
    }
  }

  useEffect(() => {
    fetchTemplateList()
  }, [])

  // Client-side filtering and pagination
  const { data, total } = useMemo(() => {
    let filtered = allTemplates

    if (debouncedSearchTerm) {
      const lowerTerm = debouncedSearchTerm.toLowerCase()
      filtered = filtered.filter(
        (item) => item.title?.toLowerCase().includes(lowerTerm) || item.description?.toLowerCase().includes(lowerTerm),
      )
    }

    const total = filtered.length
    const start = (filter.page - 1) * filter.size
    const end = start + filter.size
    const data = filtered.slice(start, end)

    return { data, total }
  }, [allTemplates, debouncedSearchTerm, filter.page, filter.size])

  const columns = [
    {
      id: "index",
      label: "STT",
      width: "48px",
      align: "center",
      labelRender: () => <div className="w-full text-center text-text-tertiary font-semibold">STT</div>,
      render: (_: any, index: number) => {
        const order = (filter.page - 1) * filter.size + index + 1
        return <div className="w-full text-center">{order}</div>
      },
    },
    {
      id: "title",
      label: "Tên mẫu",
      width: "240px",
      align: "left" as const,
      render: (info: any) => <div className="w-full text-brand-primary font-medium">{info.title}</div>,
    },
    {
      id: "description",
      label: "Mô tả",
      width: "300px",
      align: "left" as const,
    },
    {
      id: "createdAt",
      label: "Ngày tạo",
      width: "240px",
      align: "left" as const,
      render: (info: any) => <div>{dayjs(info.createdAt).format("HH:mm - DD/MM/YYYY ")}</div>,
    },
    {
      id: "action",
      width: "48px",
      align: "center" as const,
      render: (_info: any) => (
        <MoreAction>
          <DropdownItem
            onClick={() => {
              // Placeholder for future action
            }}
          >
            Xem chi tiết
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              // Placeholder for future action
            }}
          >
            Xóa mẫu
          </DropdownItem>
        </MoreAction>
      ),
    },
  ]

  return (
    <>
      <PageBreadcrumb pageTitle="Mẫu" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Danh sách mẫu</h3>
          <CreateTemplate fetchTemplateList={fetchTemplateList} />
        </div>
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="w-150">
              <Label htmlFor="input">Tìm kiếm</Label>
              <SearchInput
                searchValue={filter.term}
                setSearchValue={(value) => setFilter({ ...filter, term: value, page: 1 })}
                placeholder="Tìm kiếm mẫu"
              />
            </div>
            <BasicTable
              columns={columns}
              data={data}
              pagination={true}
              total={total}
              page={filter.page}
              pageSize={filter.size}
              onPageChange={(page) => setFilter({ ...filter, page: page })}
              onPageSizeChange={(size: any) => setFilter({ ...filter, size: size })}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Template
