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

interface StartMenuProps {
  onItemClick: () => void
}

export function StartMenu({ onItemClick }: StartMenuProps) {
  const menuItems = [
    {
      icon: <Globe className="w-4 h-4 mr-2" />,
      label: "Internet Explorer",
      onClick: onItemClick,
    },
    {
      icon: <Mail className="w-4 h-4 mr-2" />,
      label: "Outlook Express",
      onClick: onItemClick,
    },
    {
      icon: <FolderOpen className="w-4 h-4 mr-2" />,
      label: "My Projects",
      onClick: onItemClick,
    },
    {
      icon: <FileText className="w-4 h-4 mr-2" />,
      label: "Blog Posts",
      onClick: onItemClick,
    },
    {
      icon: <User className="w-4 h-4 mr-2" />,
      label: "About Me",
      onClick: onItemClick,
    },
    {
      icon: <Trash2 className="w-4 h-4 mr-2" />,
      label: "Recycle Bin",
      onClick: onItemClick,
    },
    {
      icon: <Calendar className="w-4 h-4 mr-2" />,
      label: "Calendar",
      onClick: onItemClick,
    },
  ]

  const systemItems = [
    {
      icon: <Settings className="w-4 h-4 mr-2" />,
      label: "Settings",
      onClick: onItemClick,
    },
    {
      icon: <Search className="w-4 h-4 mr-2" />,
      label: "Find",
      onClick: onItemClick,
    },
    {
      icon: <HelpCircle className="w-4 h-4 mr-2" />,
      label: "Help",
      onClick: onItemClick,
    },
    {
      icon: <Power className="w-4 h-4 mr-2" />,
      label: "Shut Down...",
      onClick: onItemClick,
      divider: true,
    },
  ]

  return (
    <div className="w-64 bg-gray-300 border-2 border-gray-400 shadow-md flex">
      {/* Left sidebar */}
      <div className="w-10 bg-gradient-to-b from-blue-800 to-blue-600 flex flex-col items-center py-2">
        <div className="h-full w-6 mt-32 -rotate-90 flex items-center justify-center">
          <span className="text-white text-xs font-bold tracking-widest uppercase w95-text">Windows 95</span>
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

        <div className="border-t border-gray-400 py-1">
          {systemItems.map((item, index) => (
            <button
              key={index}
              className={`w-full text-left px-2 py-1 text-xs flex items-center hover:bg-blue-600 hover:text-white w95-text ${
                item.divider ? "border-t border-gray-400 mt-1 pt-2" : ""
              }`}
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

