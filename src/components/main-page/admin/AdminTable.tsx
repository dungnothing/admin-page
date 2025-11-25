import SearchInput from "@/components/common/basic/SearchInput"
import Label from "@/components/form/Label"
import { useState, useEffect } from "react"
import BasicTable from "@/components/common/basic/tables/BasicTable"
import { getAllAdminsAPI, deleteAdminAPI } from "@/apis/admin"
import { useDebounce } from "@/hooks/useDebounce"
import dayjs from "dayjs"
import { toast } from "react-toastify"
import { TrashBinIcon } from "@/icons"
import BasicDialog from "@/components/common/basic/BasicDialog"
import { Button } from "@/components/ui/button"

const AdminTable = () => {
  const [adminList, setAdminList] = useState<any>()
  const [filter, setFilter] = useState<any>({
    page: 1,
    size: 20,
    term: "",
  })
  const debouncedSearchValue = useDebounce(filter.term)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const fetchAdminList = async () => {
    try {
      const response = await getAllAdminsAPI({ page: filter.page, size: filter.size, term: debouncedSearchValue })
      setAdminList(response)
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu")
    }
  }

  useEffect(() => {
    fetchAdminList()
  }, [filter.page, filter.size, debouncedSearchValue])

  const handleDelete = async () => {
    if (!selectedId) return
    try {
      await deleteAdminAPI(selectedId)
      toast.success("Xóa admin thành công")
      setOpenDelete(false)
      fetchAdminList()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi xóa admin")
    }
  }

  const columns = [
    {
      id: "index",
      label: "STT",
      width: "48px",
      align: "center",
    },
    {
      id: "userName",
      label: "Tên Admin",
      width: "200px",
      align: "left" as const,
      render: (info: any) => <div className="w-full text-brand-primary font-medium">{info.userName}</div>,
    },
    {
      id: "isOwner",
      label: "Vai trò",
      width: "200px",
      align: "center" as const,
      render: (info: any) => (
        <div className="flex justify-center">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              info.isOwner
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-blue-100 text-blue-700 border border-blue-200"
            }`}
          >
            {info.isOwner ? "Chủ sở hữu" : "Admin"}
          </div>
        </div>
      ),
    },
    {
      id: "createdAt",
      label: "Ngày tạo",
      width: "200px",
      align: "left" as const,
      render: (info: any) => <div>{dayjs(info.createdAt).format("HH:mm - DD/MM/YYYY ")}</div>,
    },
    {
      id: "action",
      width: "48px",
      align: "center" as const,
      render: (info: any) => (
        <div className="flex justify-center">
          {!info.isOwner && (
            <button
              onClick={() => {
                setSelectedId(info._id)
                setOpenDelete(true)
              }}
              className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors"
            >
              <TrashBinIcon />
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="w-150">
        <Label htmlFor="input">Tìm kiếm</Label>
        <SearchInput
          searchValue={filter.term}
          setSearchValue={(value) => setFilter({ ...filter, term: value, page: 1 })}
          placeholder="Tìm kiếm admin"
        />
      </div>
      <BasicTable
        columns={columns}
        data={adminList?.admins || []}
        pagination
        total={adminList?.total || 0}
        page={filter.page}
        pageSize={filter.size}
        onPageChange={setFilter}
        onPageSizeChange={(size: any) => setFilter({ ...filter, size: size })}
      />
      <BasicDialog open={openDelete} onOpenChange={setOpenDelete} title="Xóa Admin">
        <div className="flex flex-col gap-4">
          <p className="text-gray-600 dark:text-gray-300">
            Bạn có chắc chắn muốn xóa admin này? Hành động này không thể hoàn tác.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary-outline" color="gray" onClick={() => setOpenDelete(false)}>
              Hủy
            </Button>
            <Button onClick={handleDelete} variant="primary" color="hi-warning">
              Xóa
            </Button>
          </div>
        </div>
      </BasicDialog>
    </div>
  )
}

export default AdminTable
