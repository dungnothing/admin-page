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

const Board = () => {
  const [boardList, setBoardList] = useState<any>()
  const [filter, setFilter] = useState<any>({
    page: 0,
    size: 20,
    term: "",
  })
  const debouncedSearchValue = useDebounce(filter.term)
  const navigate = useNavigate()
  const [id, setId] = useState<any>()
  const [openDelete, setOpenDelete] = useState(false)

  const fetchBoardList = async () => {
    try {
      const response = await getUserAPI({ page: filter.page + 1, size: filter.size, term: debouncedSearchValue })
      setBoardList(response)
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu")
    }
  }

  useEffect(() => {
    fetchBoardList()
  }, [filter.page, filter.size, debouncedSearchValue])

  const columns = [
    {
      id: "index",
      label: "STT",
      width: "48px",
      align: "center",
    },
    {
      id: "name",
      label: "Tên bảng",
      width: "240px",
      align: "left" as const,
      render: (info: any) => <div className="w-full text-brand-primary ">{info.name}</div>,
    },
    {
      id: "owner",
      label: "Chủ sở hữu",
      width: "240px",
      align: "left" as const,
    },
    {
      id: "columnCount",
      label: "Số lượng cột",
      width: "240px",
      align: "left" as const,
    },
    {
      id: "cardCount",
      label: "Số lượng thẻ",
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
              navigate(`${info._id}/detail`)
            }}
          >
            Xem thông tin
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              navigate(`${info._id}/user-manager`)
            }}
          >
            Quản lý thành viên
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setId(info.id)
              setOpenDelete(true)
            }}
          >
            Xóa bảng
          </DropdownItem>
        </MoreAction>
      ),
    },
  ]

  const handleDelete = () => {
    try {
      console.log(id)
    } catch (error) {
      toast.error("Lỗi khi xóa bảng")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-150">
        <Label htmlFor="input">Tìm kiếm</Label>
        <SearchInput
          searchValue={filter.term}
          setSearchValue={(value) => setFilter({ ...filter, term: value })}
          placeholder="Tìm kiếm bảng"
        />
      </div>
      <BasicTable
        columns={columns}
        data={boardList?.data || []}
        pagination
        total={boardList?.total || 0}
        page={filter.page + 1}
        pageSize={filter.size}
        onPageChange={setFilter}
        onPageSizeChange={(size: any) => setFilter({ ...filter, size: size })}
      />
      <BasicDialog open={openDelete} onOpenChange={setOpenDelete} title="Xóa bảng">
        <p>Bạn có chắc chắn muốn xóa bảng này?</p>
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

export default Board
