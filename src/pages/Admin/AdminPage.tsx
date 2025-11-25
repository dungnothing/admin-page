import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import { Button } from "@/components/ui/button"
import { useNavigate, useSearchParams } from "react-router-dom"
import AdminTable from "../../components/main-page/admin/AdminTable"
import CreateAdmin from "../../components/main-page/admin/CreateAdmin"

export default function AdminPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const action = searchParams.get("action")

  return (
    <>
      <PageBreadcrumb pageTitle="Admin" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Danh sách admin</h3>
          <Button variant="primary" color="brand" onClick={() => navigate("/admin?action=create")}>
            Tạo mới admin
          </Button>
        </div>
        <div className="space-y-6">
          <AdminTable />
        </div>
        {action === "create" && <CreateAdmin />}
      </div>
    </>
  )
}
