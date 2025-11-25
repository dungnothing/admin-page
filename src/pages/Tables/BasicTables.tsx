import { useSearchParams } from "react-router-dom"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import Board from "../../components/main-page/board/Board"
import BoardDetail from "../../components/main-page/board/BoardDetail"
import UserManager from "../../components/main-page/board/UserManager"

export default function BasicTables() {
  const [searchParams] = useSearchParams()
  const action = searchParams.get("action")
  const id = searchParams.get("id")

  return (
    <>
      <PageBreadcrumb pageTitle="Bảng" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Danh sách bảng</h3>
        <div className="space-y-6">
          <Board />
        </div>
      </div>
      {action === "detail" && id && <BoardDetail />}
      {action === "user-manager" && id && <UserManager />}
    </>
  )
}
