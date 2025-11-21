import PageBreadcrumb from "../components/common/PageBreadCrumb"
import UserTable from "../components/user/UserTable"

export default function UserProfiles() {
  return (
    <>
      <PageBreadcrumb pageTitle="Người dùng" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Người dùng</h3>
        <div className="space-y-6">
          <UserTable />
        </div>
      </div>
    </>
  )
}
