"use client"

import {
  FileText,
  FolderOpen,
  Settings,
  HelpCircle,
  Search,
  Power,
  User,
  Mail,
  Globe,
  Calendar,
  Trash2,
} from "lucide-react"
import Image from "next/image"

interface StartMenuProps {
  onItemClick: () => void
  onShutDown: () => void
}

export function StartMenu({ onItemClick, onShutDown }: StartMenuProps) {
  const menuItems = [
    {
      icon: <Image src="/icons/startmenu/programs.png" width={42} height={42} alt="Shut Down" className="mr-1" />,
      label: "Programs",
      onClick: onItemClick,
    },
    {
      icon: <Image src="/icons/startmenu/documents.png" width={42} height={42} alt="Shut Down" className="mr-1" />,
      label: "Documents",
      onClick: onItemClick,
    },
    {
      icon: <Image src="/icons/startmenu/find.png" width={42} height={42} alt="Shut Down" className="mr-1" />,
      label: "Find",
      onClick: onItemClick,
    },
    {
      icon: <Image src="/icons/startmenu/help.png" width={42} height={42} alt="Shut Down" className="mr-1" />,
      label: "Help",
      onClick: onItemClick,
    },
    {
      icon: <Image src="/icons/startmenu/run.png" width={42} height={42} alt="Shut Down" className="mr-1" />,
      label: "Run",
      onClick: onItemClick,
    },
  ]

  const systemItems = [
    {
      icon: <Image src="/icons/startmenu/shitdown.png" width={42} height={42} alt="Shut Down" className="mr-1" />,
      label: "Shut Down",
      onClick: onShutDown,
    },
  ]

  return (
    <div className="w-64 bg-gray-300 border-2 border-gray-400 shadow-md flex">
      {/* Left sidebar */}
      <div className="w-10 bg-gradient-to-b from-blue-800 to-blue-600 flex flex-col items-center py-2">
        <div className="h-full w-10 mt-32 -rotate-90 flex items-center justify-center">
          <span className="text-white whitespace-nowrap text-xs font-bold tracking-widest uppercase w95-text">Windows 95</span>
        </div>
      </div>

      {/* Menu items */}
      <div className="flex-1">
        <div className="py-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full text-left px-2 py-1 text-xs flex items-center hover:bg-blue-600 hover:text-white w95-text"
              onClick={item.onClick}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="border-t border-gray-400 p-0">
          {systemItems.map((item, index) => (
            <button
              key={index}
              className="w-full text-left px-2 py-1 text-xs flex items-center hover:bg-blue-600 hover:text-white w95-text"
              onClick={item.onClick}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
