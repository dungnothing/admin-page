import BasicDialog from "@/components/common/basic/BasicDialog"
import { useNavigate, useSearchParams } from "react-router-dom"

const UserManager = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")

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
