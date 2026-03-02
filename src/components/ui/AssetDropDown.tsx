import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Asset } from "@/mocks"

interface AssetSelectInputProps {
  label: string
  assets: Asset[]
  value?: Asset | null
  onChange: (asset: Asset) => void
}

export default function AssetSelectInput({
  label,
  assets,
  value,
  onChange,
}: AssetSelectInputProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

      <div
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full h-[58px] rounded-[6px] p-3 border bg-[var(--color-border)]
          border-[var(--color-separator)] shadow-md cursor-pointer
          focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]
          flex items-center justify-between gap-3
        "
      >
        {value ? (
          <div className="flex items-center gap-3">
            <value.icon size={18} className="text-gray-300 shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight">{value.acronym}</span>
              <span className="text-xs text-gray-400 leading-tight">{value.name}</span>
            </div>
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Selecione um ativo</span>
        )}

        <ChevronDown
          size={16}
          className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="
          absolute top-full mt-1 w-full
          rounded-md border border-[var(--color-border)]
          bg-[var(--color-card-bg)] shadow-lg z-50 overflow-hidden
        ">
          {assets.map((asset) => {
            const isSelected = value?.acronym === asset.acronym
            return (
              <div
                key={asset.acronym}
                onClick={() => { onChange(asset); setOpen(false) }}
                className={`
                  flex items-center justify-between p-3 cursor-pointer text-sm
                  border-b border-[var(--color-separator)] last:border-b-0
                  transition-colors
                  ${isSelected
                    ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                    : "hover:bg-[var(--color-accent)]/10"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <asset.icon size={18} className={isSelected ? "text-[var(--color-accent)]" : "text-gray-400"} />
                  <div>
                    <div className="font-semibold">{asset.acronym}</div>
                    <div className={`text-xs ${isSelected ? "text-[var(--color-accent)]/70" : "text-gray-400"}`}>
                      {asset.name}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}