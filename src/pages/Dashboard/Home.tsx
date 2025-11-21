import { getDashboardAPI } from "@/apis/admin"
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics"
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart"
import StatisticsChart from "../../components/ecommerce/StatisticsChart"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Home() {
  const [dashboardData, setDashboardData] = useState({})

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const response = await getDashboardAPI()
        setDashboardData(response)
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu")
      }
    }
    getDashboard()
  }, [])

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <EcommerceMetrics data={dashboardData} />

          <MonthlySalesChart data={dashboardData} />
        </div>

        <div className="col-span-12">
          <StatisticsChart data={dashboardData} />
        </div>
      </div>
    </>
  )
}
