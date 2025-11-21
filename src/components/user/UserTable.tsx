import SearchInput from "@/components/common/basic/SearchInput"
import Label from "../form/Label"
import { useState, useEffect } from "react"
import BasicTable from "../tables/BasicTable"
import { getUserAPI } from "@/apis/admin"
import { useDebounce } from "@/hooks/useDebounce"
import dayjs from "dayjs"

const UserTable = () => {
  const [userList, setUserList] = useState([])
  const [filter, setFilter] = useState<any>({
    page: 0,
    size: 20,
    term: "",
  })
  const debouncedSearchValue = useDebounce(filter.term)

  const fetchUserList = async () => {
    const response = await getUserAPI({ page: filter.page + 1, size: filter.size, term: debouncedSearchValue })
    setUserList(response)
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
  ]

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
        data={userList}
        pagination={true}
        total={userList?.length || 0}
        page={filter.page}
        pageSize={filter.size}
        onPageChange={setFilter}
        onPageSizeChange={(size: any) => setFilter({ ...filter, size: size })}
      />
    </div>
  )
}

export default UserTable
