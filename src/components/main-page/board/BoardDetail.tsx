import BasicDialog from "@/components/common/basic/BasicDialog"
import { useNavigate } from "react-router-dom"

const BoardDetail = () => {
  const navigate = useNavigate()
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
