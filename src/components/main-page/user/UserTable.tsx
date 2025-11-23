import SearchInput from "@/components/common/basic/SearchInput"
import Label from "@/components/form/Label"
import { useState, useEffect } from "react"
import BasicTable from "@/components/common/basic/tables/BasicTable"
import { getUserAPI } from "@/apis/admin"
import { useDebounce } from "@/hooks/useDebounce"
import dayjs from "dayjs"
import MoreAction from "@/components/ui/dropdown/MoreAction"
import { toast } from "react-toastify"
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem"
import { useNavigate } from "react-router-dom"
import BasicDialog from "@/components/common/basic/BasicDialog"
import { Button } from "@/components/ui/button"

const UserTable = () => {
  const [userList, setUserList] = useState<any>()
  const [filter, setFilter] = useState<any>({
    page: 0,
    size: 20,
    term: "",
  })
  const debouncedSearchValue = useDebounce(filter.term)
  const navigate = useNavigate()
  const [id, setId] = useState<any>()
  const [openDelete, setOpenDelete] = useState(false)

  const fetchUserList = async () => {
    try {
      // const response = await getUserAPI({ page: filter.page + 1, size: filter.size, term: debouncedSearchValue })
      const response = [
        {
          id: 1,
          userName: "Nguyễn Văn A",
          email: "nguyenvana@gmail.com",
          phone: "0123456789",
          createdAt: "2022-01-01",
        },
        {
          id: 2,
          userName: "Nguyễn Văn B",
          email: "nguyenvanb@gmail.com",
          phone: "0123456789",
          createdAt: "2022-01-01",
        },
        {
          id: 3,
          userName: "Nguyễn Văn C",
          email: "nguyenvanc@gmail.com",
          phone: "0123456789",
          createdAt: "2022-01-01",
        },
      ]
      setUserList(response)
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu")
    }
  }

  useEffect(() => {
    fetchUserList()
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
      id: "fullName",
      label: "Tên người dùng",
      width: "240px",
      align: "left" as const,
      render: (info: any) => <div className="w-full text-brand-primary ">{info.userName}</div>,
    },
    {
      id: "email",
      label: "Email",
      width: "240px",
      align: "left" as const,
    },
    {
      id: "phone",
      label: "Số điện thoại",
      width: "240px",
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
      render: (info: any) => (
        <MoreAction>
          <DropdownItem
            onClick={() => {
              navigate(`${info.id}/edit`)
            }}
          >
            Xem thông tin
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              navigate(`${info.id}/subscription`)
            }}
          >
            Nâng cấp gói
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setId(info.id)
              setOpenDelete(true)
            }}
          >
            Xóa người dùng
          </DropdownItem>
        </MoreAction>
      ),
    },
  ]

  const handleDelete = () => {
    try {
      console.log(id)
    } catch (error) {
      toast.error("Lỗi khi xóa người dùng")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-150">
        <Label htmlFor="input">Tìm kiếm</Label>
        <SearchInput
          searchValue={filter.term}
          setSearchValue={(value) => setFilter({ ...filter, term: value })}
          placeholder="Tìm kiếm người dùng"
        />
      </div>
      <BasicTable
        columns={columns}
        data={userList || []}
        pagination={true}
        total={userList?.length || 0}
        page={filter.page}
        pageSize={filter.size}
        onPageChange={setFilter}
        onPageSizeChange={(size: any) => setFilter({ ...filter, size: size })}
      />
      <BasicDialog open={openDelete} onOpenChange={setOpenDelete} title="Xóa người dùng">
        <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary-outline" color="gray" onClick={() => setOpenDelete(false)}>
            Hủy
          </Button>
          <Button onClick={handleDelete} variant="primary" color="hi-warning">
            Xóa
          </Button>
        </div>
      </BasicDialog>
    </div>
  )
}

export default UserTable
