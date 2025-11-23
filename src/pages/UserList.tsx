import PageBreadcrumb from "../components/common/PageBreadCrumb"
import UserTable from "../components/main-page/user/UserTable"
import { Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function UserProfiles() {
  const navigate = useNavigate()
  return (
    <>
      <PageBreadcrumb pageTitle="Người dùng" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Người dùng</h3>
          <Button variant="primary" color="brand" onClick={() => navigate("/user/create")}>
            Thêm người dùng
          </Button>
        </div>
        <div className="space-y-6">
          <UserTable />
        </div>
        <Outlet />
      </div>
    </>
  )
}
