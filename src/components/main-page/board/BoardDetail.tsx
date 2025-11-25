import BasicDialog from "@/components/common/basic/BasicDialog"
import { useNavigate, useSearchParams } from "react-router-dom"

const BoardDetail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")

  const handleClose = () => {
    navigate("/board")
  }

  return (
    <BasicDialog open={true} onOpenChange={handleClose} title="Thông tin bảng">
      <div>dsad</div>
    </BasicDialog>
  )
}

export default BoardDetail
