import { useNavigate, useSearchParams } from "react-router-dom"
import BasicDialog from "@/components/common/basic/BasicDialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getBoardMembersAPI, addMemberToBoardAPI, removeMemberFromBoardAPI, getUserAPI } from "@/apis/admin"
import { toast } from "react-toastify"
import Label from "@/components/form/Label"
import { X, UserPlus, User } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"

interface Member {
  _id: string
  userName: string
  email: string
  avatar: string | null
  role: "admin" | "member"
}

const ManageBoardMembers = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const boardId = searchParams.get("id")
  const [loading, setLoading] = useState(false)
  const [admin, setAdmin] = useState<Member | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [adding, setAdding] = useState(false)

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm, 500)
  const [searchResults, setSearchResults] = useState<Member[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleClose = () => {
    navigate("/board")
  }

  const fetchMembers = async (showLoading = true) => {
    if (!boardId) return

    if (showLoading) setLoading(true)
    try {
      const data = await getBoardMembersAPI(boardId)
      setAdmin(data.admin)
      setMembers(data.members)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Lỗi khi tải danh sách thành viên")
    } finally {
      if (showLoading) setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [boardId])

  // Search users effect
  useEffect(() => {
    const searchUsers = async () => {
      if (!isFocused) return

      try {
        const res = await getUserAPI({ page: 1, size: 5, term: debouncedSearch })
        const filtered = res.data.filter((u: any) => !members.some((m) => m._id === u._id) && admin?._id !== u._id)
        setSearchResults(filtered)
        setShowResults(true)
      } catch (error) {
        console.error(error)
      }
    }
    searchUsers()
  }, [debouncedSearch, members, admin, isFocused])

  const handleAddMember = async (userEmail: string) => {
    if (!boardId || !userEmail) return

    setAdding(true)
    try {
      await addMemberToBoardAPI(boardId, userEmail)
      toast.success("Thêm thành viên thành công")
      setSearchTerm("")
      setSearchResults([])
      setShowResults(false)
      fetchMembers(false)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Lỗi khi thêm thành viên")
    } finally {
      setAdding(false)
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    if (!boardId) return

    try {
      await removeMemberFromBoardAPI(boardId, memberId)
      toast.success("Xóa thành viên thành công")
      fetchMembers(false)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Lỗi khi xóa thành viên")
    }
  }

  const MemberCard = ({ member, canRemove }: { member: Member; canRemove: boolean }) => (
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative">
          {member.avatar ? (
            <img src={member.avatar} alt={member.userName} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-brand-primary" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-900 dark:text-white">{member.userName}</p>
            {member.role === "admin" && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 font-medium">
                Chủ bảng
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
        </div>
      </div>
      {canRemove && (
        <Button
          variant="tertiary-ghost"
          size="sm"
          onClick={() => handleRemoveMember(member._id.toString())}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  )

  return (
    <BasicDialog open={true} onOpenChange={handleClose} title="Quản lý thành viên">
      {loading ? (
        <div className="flex justify-center items-center py-12 h-120">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 h-120 ">
          {/* Add Member Section */}
          <div className="space-y-3 relative">
            <Label>Thêm thành viên mới</Label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowResults(true)
                }}
                placeholder="Tìm kiếm..."
                className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus:border-brand-primary focus:border-2"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
            </div>

            {isFocused && showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchResults.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleAddMember(user.email)}
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.userName} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-brand-primary" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">{user.userName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="tertiary-ghost"
                      className="ml-auto text-brand-primary hover:bg-brand-primary/10"
                      disabled={adding}
                    >
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {isFocused && showResults && searchTerm && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 p-4 text-center text-sm text-gray-500">
                Không tìm thấy người dùng
              </div>
            )}

            <p className="text-xs text-gray-500">Nhập tên hoặc email để tìm kiếm người dùng</p>
          </div>

          {/* Admin Section */}
          {admin && (
            <div className="space-y-3">
              <Label className="flex items-center gap-2">Chủ bảng</Label>
              <MemberCard member={admin} canRemove={false} />
            </div>
          )}

          {/* Members Section */}
          <div className="space-y-3">
            <Label className="flex items-center justify-between">
              <span>Thành viên ({members.length})</span>
            </Label>
            {members.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Chưa có thành viên nào</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {members.map((member) => (
                  <MemberCard key={member._id} member={member} canRemove={true} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
        </div>
      )}
      <div className="flex justify-end pt-4 ">
        <Button variant="secondary-outline" color="gray" onClick={handleClose}>
          Đóng
        </Button>
      </div>
    </BasicDialog>
  )
}

export default ManageBoardMembers
