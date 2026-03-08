export interface SkillCategory {
  name: string
  skills: string[]
  exploring?: boolean
}

export const skillCategories: SkillCategory[] = [
  {
    name: "LANGUAGES",
    skills: ["JavaScript", "TypeScript", "Python", "SQL", "C++"]
  },
  {
    name: "FRONTEND",
    skills: ["HTML", "CSS", "Tailwind CSS", "React.js", "Next.js"]
  },
  {
    name: "BACKEND",
    skills: ["Node.js", "Express.js"]
  },
  {
    name: "DATABASES",
    skills: ["PostgreSQL", "MongoDB", "Redis"]
  },
  {
    name: "STATE MANAGEMENT",
    skills: ["Zustand", "Redux", "Redux Toolkit"]
  },
  {
    name: "DEVOPS & TOOLS",
    skills: ["Docker", "Git", "GitHub", "GitHub Actions", "Linux", "AWS EC2", "Cloudinary", "FFmpeg", "BullMQ", "WebSockets"]
  },
  {
    name: "CURRENTLY EXPLORING",
    skills: ["GenAI", "LLMs", "Prompt Engineering", "System Design"],
    exploring: true
  }
]
