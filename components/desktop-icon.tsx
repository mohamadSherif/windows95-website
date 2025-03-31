"use client"

import type { ReactNode } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface DesktopIconProps {
  icon: ReactNode
  label: string
  onClick: () => void
}

export function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  const isMobile = useMobile()

  return (
    <div
      className={`flex flex-col items-center ${isMobile ? "w-16" : "w-20"} cursor-pointer group`}
      onClick={onClick}
    >
      <div className="p-1 group-hover:bg-blue-600 group-hover:bg-opacity-30 group-active:bg-blue-700">{icon}</div>
      <div className="mt-0 px-1 text-center text-white text-xs group-hover:bg-blue-600 group-active:bg-blue-700 w95-text">
        {label}
      </div>
    </div>
  )
}
