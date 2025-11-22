import { EllipsisVertical } from "lucide-react"
import { useState } from "react"
import { Dropdown } from "./Dropdown"

const MoreAction = ({ children }: { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <div className="cursor-pointer " onClick={() => setIsOpen(!isOpen)}>
        <EllipsisVertical />
      </div>
      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Dropdown>
    </div>
  )
}

export default MoreAction
