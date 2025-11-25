import BasicDialog from "@/components/common/basic/BasicDialog"
import { useNavigate } from "react-router-dom"

const UserManager = () => {
  const navigate = useNavigate()
  const handleClose = () => {
    navigate("/board")
  }

  return (
    <BasicDialog open={true} onOpenChange={handleClose} title="Quản lý thành viên">
      <div>Quản lý thành viên</div>
    </BasicDialog>
  )
}

export default UserManager
