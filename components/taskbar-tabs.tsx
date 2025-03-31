"use client"
import type { WindowState } from "@/components/desktop"

interface TaskbarTabsProps {
  windows: WindowState[]
  onRestore: (windowId: string) => void
}

export function TaskbarTabs({ windows, onRestore }: TaskbarTabsProps) {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex items-center px-1 space-x-1 overflow-x-auto">
      {windows.map((window) => (
        <button
          key={window.id}
          className={`h-6 px-2 py-1 text-xs bg-gray-300 hover:bg-gray-300 border-t border-l border-white border-r border-b border-gray-500 text-black rounded-none flex items-center space-x-1 whitespace-nowrap max-w-[200px] overflow-hidden ${
            window.isMinimized ? "" : "border-t-gray-500 border-l-gray-500 border-r-white border-b-white bg-gray-400"
          }`}
          onClick={() => onRestore(window.id)}
        >
          <span className="truncate">{window.title}</span>
        </button>
      ))}
    </div>
  )
}

