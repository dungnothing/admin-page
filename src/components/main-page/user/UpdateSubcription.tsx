import { useNavigate, useParams } from "react-router-dom"
import BasicDialog from "@/components/common/basic/BasicDialog"

const UpdateSubcription = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleClose = () => {
    navigate("/user")
  }

  return (
    <BasicDialog open={true} onOpenChange={handleClose} title="Nâng cấp gói">
      <div>Nâng cấp gói</div>
    </BasicDialog>
  )
}

export default UpdateSubcription
