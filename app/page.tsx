"use client"

import { useState } from "react"
import { Desktop, type WindowState } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { BSOD } from "@/components/bsod"

export default function Home() {
  const [showBSOD, setShowBSOD] = useState(false)
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "projects", title: "My Projects", isOpen: false, isMinimized: false },
    { id: "blog", title: "Blog Posts", isOpen: false, isMinimized: false },
    { id: "about", title: "About Me", isOpen: false, isMinimized: false },
    { id: "recycle", title: "Recycle Bin", isOpen: false, isMinimized: false },
  ])

  const toggleWindow = (windowId: string) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === windowId ? { ...win, isOpen: !win.isOpen, isMinimized: false } : win)),
    )
  }

  const minimizeWindow = (windowId: string) => {
    setWindows((prev) => prev.map((win) => (win.id === windowId ? { ...win, isMinimized: true } : win)))
  }

  const restoreWindow = (windowId: string) => {
    setWindows((prev) => prev.map((win) => (win.id === windowId ? { ...win, isMinimized: false } : win)))
  }

  const closeWindow = (windowId: string) => {
    setWindows((prev) => prev.map((win) => (win.id === windowId ? { ...win, isOpen: false, isMinimized: false } : win)))
  }

  // Get only open windows for the taskbar
  const openWindows = windows.filter((win) => win.isOpen)

  const handleShutDown = () => {
    setShowBSOD(true)
  }
  
  const handleRestart = () => {
    setShowBSOD(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#008080] overflow-hidden">
      <BSOD visible={showBSOD} onRestart={handleRestart} />
      <div className="flex-1 relative">
        <Desktop
          windows={windows}
          toggleWindow={toggleWindow}
          minimizeWindow={minimizeWindow}
          restoreWindow={restoreWindow}
          closeWindow={closeWindow}
        />
      </div>
      <Taskbar windows={openWindows} onRestore={restoreWindow} onShutDown={handleShutDown} />
    </main>
  )
}
