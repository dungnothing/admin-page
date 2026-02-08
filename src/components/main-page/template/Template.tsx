import PageBreadcrumb from "../../common/PageBreadCrumb"

import { useState } from "react"
import BasicTable from "@/components/common/basic/tables/BasicTable"
import Label from "@/components/form/Label"
import SearchInput from "@/components/common/basic/SearchInput"
import dayjs from "dayjs"
import MoreAction from "@/components/ui/dropdown/MoreAction"
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem"

import CreateTemplate from "./CreateTemplate"

const Template = () => {
  const [filter, setFilter] = useState<any>({
    page: 1,
    size: 20,
    term: "",
  })

  // Mock data for display
  const templateList = {
    data: [
      {
        _id: "1",
        name: "Mẫu báo cáo tuần",
        description: "Mẫu báo cáo công việc hàng tuần cho nhân viên",
        createdAt: "2023-11-01T08:00:00Z",
      },
      {
        _id: "2",
        name: "Mẫu kế hoạch dự án",
        description: "Khung kế hoạch chi tiết cho dự án mới",
        createdAt: "2023-11-05T09:30:00Z",
      },
      {
        _id: "3",
        name: "Mẫu đánh giá nhân sự",
        description: "Form đánh giá định kỳ hằng năm",
        createdAt: "2023-11-10T14:15:00Z",
      },
    ],
    total: 3,
  }

  const columns = [
    {
      id: "index",
      label: "STT",
      width: "48px",
      align: "center",
      labelRender: () => <div className="w-full text-center text-text-tertiary font-semibold">STT</div>,
    },
    {
      id: "name",
      label: "Tên mẫu",
      width: "240px",
      align: "left" as const,
      render: (info: any) => <div className="w-full text-brand-primary font-medium">{info.name}</div>,
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
          <CreateTemplate />
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
              data={templateList?.data || []}
              pagination={true}
              total={templateList?.total || 0}
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
