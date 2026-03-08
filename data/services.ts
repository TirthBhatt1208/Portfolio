export interface Service {
  id: string
  title: string
  description: string
  tagline: string
  isLearning?: boolean
}

export const services: Service[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Apps",
    description: "React / Next.js frontend + Node.js / Express backend + PostgreSQL / MongoDB",
    tagline: "End-to-end products, from idea to deployed URL."
  },
  {
    id: "api",
    title: "REST API Development",
    description: "Scalable, well-structured APIs with auth, rate limiting, and clean documentation",
    tagline: "APIs that teams actually enjoy integrating with."
  },
  {
    id: "devops",
    title: "Deployment & DevOps",
    description: "Docker, GitHub Actions CI/CD, AWS EC2, Redis caching",
    tagline: "Your app, live and fast — not just working on localhost."
  },
  {
    id: "ai",
    title: "AI-Powered Features",
    description: "Gemini / OpenAI API integration, LLM pipelines, prompt engineering",
    tagline: "Adding intelligence to your product — thoughtfully.",
    isLearning: true
  }
]
