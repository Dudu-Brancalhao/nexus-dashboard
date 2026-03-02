import { useState, useRef, useEffect } from "react"
import { User } from "@/mocks/users"

interface UserSelectInputProps {
  label: string
  users: User[]
  value?: User | null
  onChange: (user: User) => void
}

export default function UserSelectInput({
  label,
  users,
  value,
  onChange,
}: UserSelectInputProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col gap-1 relative" ref={containerRef}>
      <label className="text-sm text-gray-500 uppercase font-semibold">{label}</label>

      <input
        value={value ? value.name : query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder="Digite o nome do usuário"
        className="
          w-full rounded-[6px] p-4 border bg-[var(--color-border)]
          border-[var(--color-separator)] shadow-md
          focus:outline-none focus:ring-1
          focus:ring-[var(--color-accent)]
        "
      />

      {open && (
        <div className="
          absolute top-full mt-1 w-full max-h-60 overflow-auto
          rounded-md border border-[var(--color-border)]
          bg-[var(--color-card-bg)] shadow-lg z-50
        ">
          {filteredUsers.length === 0 && (
            <div className="p-3 text-sm text-gray-400">
              No users found
            </div>
          )}

          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                onChange(user)
                setQuery("")
                setOpen(false)
              }}
              className="flex items-center justify-between p-3 text-sm cursor-pointer hover:bg-[var(--color-accent)]/10 border-b-1 border-[var(--color-separator)]" >
              <div className="">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-gray-400">
                  {user.email}
                </div>
              </div>
              <div className="text-green-400 font-semibold">
                R$ {user.totalInBRL}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}