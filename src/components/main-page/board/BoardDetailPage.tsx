import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getBoardDetailAPI } from "@/apis/admin"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Trello, CreditCard, Calendar } from "lucide-react"
import dayjs from "dayjs"

const BoardDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [board, setBoard] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBoardDetail = async () => {
      if (!id) return
      try {
        const data = await getBoardDetailAPI(id)
        setBoard(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchBoardDetail()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    )
  }

  if (!board) {
    return <div>Không tìm thấy bảng</div>
  }

  const totalCards = board.columns?.reduce((acc: number, col: any) => acc + col.cards.length, 0) || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 justify-between">
        <Button variant="tertiary-ghost" color="gray" size="sm" onClick={() => navigate("/board")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>
      </div>
      <PageBreadcrumb pageTitle={board.title} parent={{ label: "Bảng", to: "/board" }} />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Trello className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Số lượng cột</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{board.columns?.length || 0}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Số lượng thẻ</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalCards}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Thành viên</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{board.memberIds?.length || 0}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ngày tạo</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {dayjs(board.createdAt).format("DD/MM/YYYY")}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Column Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chi tiết bảng</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {board.columns?.map((col: any) => (
              <div key={col._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">{col.title}</h4>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                    {col.cards?.length || 0} thẻ
                  </span>
                </div>
                <div className="space-y-2">
                  {col.cards?.slice(0, 5).map((card: any) => (
                    <div
                      key={card._id}
                      className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-100 dark:border-gray-700/50 text-sm"
                    >
                      {card.title}
                    </div>
                  ))}
                  {col.cards?.length > 5 && (
                    <div className="text-xs text-center text-gray-500 pt-1">+{col.cards.length - 5} thẻ khác</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardDetailPage
