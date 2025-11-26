import PageBreadcrumb from "../components/common/PageBreadCrumb"
import UserTable from "../components/main-page/user/UserTable"
import { Button } from "@/components/ui/button"
import { useNavigate, useSearchParams } from "react-router-dom"
import EditUser from "../components/main-page/user/EditUser"
import CreateUser from "../components/main-page/user/CreateUser"
import { useEffect, useState } from "react"
import { getUserAPI } from "@/apis/admin"
import { useDebounce } from "@/hooks/useDebounce"
import { toast } from "react-toastify"

export default function UserProfiles() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const action = searchParams.get("action")
  const id = searchParams.get("id")
  const [userList, setUserList] = useState<any>()
  const [filter, setFilter] = useState<any>({
    page: 1,
    size: 20,
    term: "",
  })
  const debouncedSearchValue = useDebounce(filter.term)

  const fetchUserList = async () => {
    try {
      const response = await getUserAPI({ page: filter.page, size: filter.size, term: debouncedSearchValue })
      setUserList(response)
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu")
    }
  }

  useEffect(() => {
    fetchUserList()
  }, [filter.page, filter.size, debouncedSearchValue])

  return (
    <>
      <PageBreadcrumb pageTitle="Người dùng" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Danh sách người dùng</h3>
          <Button variant="primary" color="brand" onClick={() => navigate("/user?action=create")}>
            Thêm người dùng
          </Button>
        </div>
        <div className="space-y-6">
          <UserTable userList={userList} filter={filter} setFilter={setFilter} fetchUserList={fetchUserList} />
        </div>
        {action === "edit" && id && <EditUser fetchUserList={fetchUserList} />}
        {action === "create" && <CreateUser fetchUserList={fetchUserList} />}
      </div>
    </>
  )
}
