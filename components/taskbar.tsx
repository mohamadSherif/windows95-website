"use client"

import { useState, useEffect, useRef } from "react"
import type { WindowState } from "@/components/desktop"
import { StartMenu } from "@/components/start-menu"
import { useMobile } from "@/hooks/use-mobile"

interface TaskbarProps {
  windows: WindowState[]
  onRestore: (windowId: string) => void
}

export function Taskbar({ windows, onRestore }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const startMenuRef = useRef<HTMLDivElement>(null)
  const startButtonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isStartMenuOpen &&
        startMenuRef.current &&
        startButtonRef.current &&
        !startMenuRef.current.contains(event.target as Node) &&
        !startButtonRef.current.contains(event.target as Node)
      ) {
        setIsStartMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isStartMenuOpen])

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen)
  }

  return (
    <div className="h-8 bg-gray-300 border-t-2 border-white flex items-center justify-between px-1 z-50">
      <div className="flex items-center relative">
        <button
          ref={startButtonRef}
          className={`h-6 px-2 py-1 text-sm bg-gray-300 hover:bg-gray-300 border-t border-l border-white border-r border-b border-gray-500 text-black rounded-none flex items-center space-x-1 ${isStartMenuOpen ? "border-t-gray-500 border-l-gray-500 border-r-white border-b-white bg-gray-400" : "active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white"}`}
          onClick={toggleStartMenu}
        >
          <img src="/icons/start.png" alt="Start" className="w-4 h-4 mr-1" />
          <span className="text-xs font-bold w95-text">Start</span>
        </button>

        {isStartMenuOpen && (
          <div ref={startMenuRef} className="absolute bottom-8 left-0">
            <StartMenu onItemClick={() => setIsStartMenuOpen(false)} />
          </div>
        )}

        {/* Window tabs in taskbar */}
        <div
          className={`flex items-center ml-1 space-x-1 ${isMobile ? "overflow-x-auto max-w-[calc(100vw-120px)]" : ""}`}
        >
          {windows.map((window) => (
            <button
              key={window.id}
              className={`h-6 px-2 py-1 text-xs bg-gray-300 hover:bg-gray-300 border-t border-l border-white border-r border-b border-gray-500 text-black rounded-none flex items-center space-x-1 whitespace-nowrap ${isMobile ? "max-w-[100px]" : "max-w-[150px]"} overflow-hidden ${
                window.isMinimized
                  ? ""
                  : "border-t-gray-500 border-l-gray-500 border-r-white border-b-white bg-gray-400"
              } w95-text`}
              onClick={() => onRestore(window.id)}
            >
              <span className="truncate">{window.title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="px-2 py-1 bg-gray-300 border-t border-l border-gray-500 border-r border-b border-white text-xs w95-text">
        {currentTime}
      </div>
    </div>
  )
}
