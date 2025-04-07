"use client"

import { DesktopIcon } from "@/components/desktop-icon"
import { Window } from "@/components/window"
import { Computer, FileText, Trash2 } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"

export type WindowState = {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
}

interface DesktopProps {
  windows: WindowState[]
  toggleWindow: (windowId: string) => void
  minimizeWindow: (windowId: string) => void
  restoreWindow: (windowId: string) => void
  closeWindow: (windowId: string) => void
}

export function Desktop({ windows, toggleWindow, minimizeWindow, restoreWindow, closeWindow }: DesktopProps) {
  const isMobile = useMobile()

  return (
    <div className="grid grid-cols-1 gap-4 p-2 h-[calc(100vh-32px)] justify-items-start">
      <div className={`grid justify-items-start h-1/2 ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-1 gap-2"}`}>
        <DesktopIcon
          icon={<Image src="/icons/about.png" width={32} height={32} alt="Projects icon" />}
          label="About Me"
          onClick={() => toggleWindow("about")}
        />
        <DesktopIcon
          icon={<Image src="/icons/projects.png" width={32} height={32} alt="Projects icon" />}
          label="My Projects"
          onClick={() => toggleWindow("projects")}
        />
        <DesktopIcon
          icon={<Image src="/icons/blog.png" width={32} height={32} alt="Projects icon" />}
          label="Blog Posts"
          onClick={() => toggleWindow("blog")}
        />
      </div>

      {/* Recycle Bin positioned at bottom right */}
      <div className="absolute bottom-10 right-4">
        <DesktopIcon
          icon={<Image src="/icons/recycle.png" width={32} height={32} alt="Projects icon" />}
          label="Recycle Bin"
          onClick={() => toggleWindow("recycle")}
        />
      </div>

      {windows.find((w) => w.id === "projects")?.isOpen && (
        <Window
          windowId="projects"
          title="My Projects"
          onClose={() => closeWindow("projects")}
          onMinimize={() => minimizeWindow("projects")}
          width="md:w-[600px]"
          height="md:h-[400px]"
          initialPosition={{ x: 50, y: 50 }}
          isMinimized={windows.find((w) => w.id === "projects")?.isMinimized}
        >
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold mb-4">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProjectCard
                title="vbo-reader"
                description="A TypeScript library for parsing VBOX (.vbo) data files."
                tech="Node.js, Typescript"
                githubUrl="https://github.com/mohamadSherif/vbo-reader"
              />
              <ProjectCard
                title="Scrapi"
                description="command-line interface (CLI) that scrapes webpage using AI."
                tech="Go, OpenAI API"
                githubUrl="https://github.com/mohamadSherif/scrapi"
              />
              <ProjectCard
                title="Text based chess"
                description="Chess game built on using java."
                tech="Java"
                githubUrl="https://github.com/mohamadSherif/text-based-chess"
              />
            </div>
          </div>
        </Window>
      )}

      {windows.find((w) => w.id === "blog")?.isOpen && (
        <Window
          windowId="blog"
          title="Blog Posts"
          onClose={() => closeWindow("blog")}
          onMinimize={() => minimizeWindow("blog")}
          width="md:w-[550px]"
          height="md:h-[450px]"
          initialPosition={{ x: 100, y: 100 }}
          isMinimized={windows.find((w) => w.id === "blog")?.isMinimized}
        >
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold mb-4">Latest Articles</h2>
            <div className="space-y-4">
              {/* <BlogPost
                title="Getting Started with React Hooks"
                date="March 15, 2023"
                excerpt="Learn how to use React Hooks to simplify your functional components and manage state effectively."
              />
              <BlogPost
                title="The Power of Tailwind CSS"
                date="February 28, 2023"
                excerpt="Discover why Tailwind CSS has become so popular and how it can speed up your development workflow."
              />
              <BlogPost
                title="Building Responsive Layouts"
                date="January 12, 2023"
                excerpt="Tips and tricks for creating websites that look great on any device using modern CSS techniques."
              />
              <BlogPost
                title="Web Development Trends for 2023"
                date="December 20, 2022"
                excerpt="Explore the latest trends and technologies that will shape web development in the coming year."
              /> */}
            </div>
          </div>
        </Window>
      )}

      {windows.find((w) => w.id === "about")?.isOpen && (
        <Window
          windowId="about"
          title="About Me"
          onClose={() => closeWindow("about")}
          onMinimize={() => minimizeWindow("about")}
          width="md:w-[500px]"
          height="md:h-[350px]"
          initialPosition={{ x: 150, y: 150 }}
          isMinimized={windows.find((w) => w.id === "about")?.isMinimized}
        >
          <div className="p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-300 border-2 border-gray-400 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold">Mohamad Sherif</h2>
              <p className="text-sm">Backend Developer</p>
              <p className="text-sm mt-2">
                I am a passionate backend developer with a flair for frontend and AI prompt engineering,
                bringing over 4 years of experience in building large-scale applications.
              </p>
              <div className="mt-4">
                <h3 className="text-sm font-bold">Contact:</h3>
                <p className="text-sm">
                  Email: <a href="mailto:mjs1342@gmail.com" className="text-blue-800 underline">mjs1342@gmail.com</a>
                </p>
                <p className="text-sm">
                  GitHub: <a href="https://github.com/mohamadSherif" target="_blank" rel="noopener noreferrer" className="text-blue-800 underline">github.com/mohamadSherif</a>
                </p>
              </div>
            </div>
          </div>
        </Window>
      )}

      {windows.find((w) => w.id === "recycle")?.isOpen && (
        <Window
          windowId="recycle"
          title="Recycle Bin"
          onClose={() => closeWindow("recycle")}
          onMinimize={() => minimizeWindow("recycle")}
          width="md:w-[600px]"
          height="md:h-[400px]"
          initialPosition={{ x: 200, y: 100 }}
          isMinimized={windows.find((w) => w.id === "recycle")?.isMinimized}
        >
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-400 pb-2">
              <h2 className="text-lg font-bold">Failed Projects</h2>
              <div className="text-xs text-gray-600">4 items</div>
            </div>

            <div className="space-y-4">
              <FailedProjectCard
                title="Cryptocurrency Trading Bot"
                description="An automated trading bot for cryptocurrency markets using machine learning algorithms."
                reason="Market volatility made predictions unreliable. Lost $240 in testing."
                lesson="Sometimes the market is just unpredictable. Start with paper trading next time."
              />

              <FailedProjectCard
                title="Social Media Platform for Pets"
                description="A social network where pet owners could create profiles for their pets and connect with others."
                reason="Couldn't compete with existing platforms. Only got 12 users after 3 months."
                lesson="Market research is crucial. Don't build something just because you think it's cool."
              />

              <FailedProjectCard
                title="AR Fitness Trainer"
                description="An augmented reality app that would guide users through workouts with a virtual trainer."
                reason="Technical limitations made the experience clunky. Couldn't track movements accurately."
                lesson="Test technical feasibility before investing too much time in development."
              />

              <FailedProjectCard
                title="Recipe Recommendation Engine"
                description="An AI-powered app that would suggest recipes based on ingredients you have at home."
                reason="The algorithm kept suggesting bizarre food combinations. No one wants tuna and peanut butter sandwiches."
                lesson="AI needs a lot of training data and human oversight to be useful."
              />
            </div>
          </div>
        </Window>
      )}
    </div>
  )
}

function ProjectCard({ 
  title, 
  description, 
  tech, 
  onClick,
  githubUrl 
}: { 
  title: string; 
  description: string; 
  tech: string; 
  onClick?: () => void;
  githubUrl?: string;
}) {
  const handleClick = () => {
    if (githubUrl) {
      window.open(githubUrl, '_blank');
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className="border-2 border-gray-400 bg-gray-200 p-3 cursor-pointer hover:bg-gray-300 transition-colors"
      onClick={handleClick}
    >
      <h3 className="font-bold text-sm">{title}</h3>
      <p className="text-xs mt-1">{description}</p>
      <p className="text-xs mt-2 italic">Technologies: {tech}</p>
      {githubUrl && (
        <div className="mt-2 text-xs text-blue-800">
          <span className="underline">View on GitHub</span>
        </div>
      )}
    </div>
  )
}

function BlogPost({ title, date, excerpt }: { title: string; date: string; excerpt: string }) {
  return (
    <div className="border-2 border-gray-400 bg-gray-200 p-3">
      <h3 className="font-bold text-sm">{title}</h3>
      <p className="text-xs text-gray-600">{date}</p>
      <p className="text-xs mt-1">{excerpt}</p>
      <button className="text-xs text-blue-800 underline mt-2">Read more...</button>
    </div>
  )
}

function FailedProjectCard({
  title,
  description,
  reason,
  lesson,
}: {
  title: string
  description: string
  reason: string
  lesson: string
}) {
  return (
    <div className="border-2 border-gray-400 bg-gray-200 p-3">
      <div className="flex items-start">
        <Trash2 className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-sm">{title}</h3>
          <p className="text-xs mt-1">{description}</p>
          <div className="mt-2 space-y-1">
            <p className="text-xs">
              <span className="font-bold">Why it failed:</span> {reason}
            </p>
            <p className="text-xs">
              <span className="font-bold">Lesson learned:</span> {lesson}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
