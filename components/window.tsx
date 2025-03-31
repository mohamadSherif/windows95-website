"use client"

import type React from "react"

import { useState, type ReactNode, useRef, useEffect } from "react"
import { X, Minus, Square } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface WindowProps {
  title: string
  children: ReactNode
  onClose: () => void
  onMinimize?: () => void
  width?: string
  height?: string
  initialPosition?: { x: number; y: number }
  isMinimized?: boolean
  windowId: string
}

export function Window({
  title,
  children,
  onClose,
  onMinimize,
  width = "md:w-[500px]",
  height = "md:h-[400px]",
  initialPosition = { x: 20, y: 20 },
  isMinimized = false,
  windowId,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isMaximized, setIsMaximized] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current && !isMobile) {
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized && !isMobile) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const toggleMaximize = () => {
    if (!isMobile) {
      setIsMaximized(!isMaximized)
    }
  }

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize()
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  // Set window to maximized on mobile
  useEffect(() => {
    if (isMobile) {
      setIsMaximized(true)
    }
  }, [isMobile])

  // The taskbar height is 32px (8px padding + 24px height)
  const windowStyle =
    isMobile || isMaximized
      ? {
          top: 0,
          left: 0,
          right: 0,
          bottom: "32px", // Position exactly at the top of the taskbar
          width: "100%",
          height: "calc(100vh - 32px)", // Full viewport height minus taskbar height
        }
      : { top: position.y, left: position.x }

  if (isMinimized) {
    return null
  }

  return (
    <div
      ref={windowRef}
      className={`absolute bg-gray-200 border-2 border-gray-400 shadow-md flex flex-col ${isMobile || isMaximized ? "w-full" : `${width} ${height}`} z-10`}
      style={windowStyle}
    >
      <div
        className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-2 py-1 flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="text-sm font-bold w95-text">{title}</div>
        <div className="flex space-x-1">
          <button
            className="w-5 h-5 flex items-center justify-center bg-gray-300 border-t border-l border-white border-r border-b border-gray-500 text-black hover:bg-gray-400 active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white"
            onClick={handleMinimize}
          >
            <Minus className="w-3 h-3" />
          </button>
          {!isMobile && (
            <button
              className="w-5 h-5 flex items-center justify-center bg-gray-300 border-t border-l border-white border-r border-b border-gray-500 text-black hover:bg-gray-400 active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white"
              onClick={toggleMaximize}
            >
              <Square className="w-3 h-3" />
            </button>
          )}
          <button
            className="w-5 h-5 flex items-center justify-center bg-gray-300 border-t border-l border-white border-r border-b border-gray-500 text-black hover:bg-gray-400 active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white"
            onClick={onClose}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="border-t-2 border-gray-400 flex-1 overflow-auto w95-text">{children}</div>
    </div>
  )
}

