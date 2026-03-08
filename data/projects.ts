export interface Project {
  id: string
  title: string
  featured: boolean
  problem: string
  solution: string
  techStack: string[]
  features: string[]
  github?: string
  liveDemo?: string
}

export const projects: Project[] = [
  {
    id: "videoflow",
    title: "VideoFlow",
    featured: true,
    problem: "Most companies can't efficiently handle large-scale video backend systems. System design gets heavy fast, FFmpeg commands are hard to manage, and users have zero real-time visibility — is their video processing? Failed? Stuck?",
    solution: "Built a fully open-source, production-grade video processing platform. Background jobs run through BullMQ queues so the system stays non-blocking. Users receive real-time progress updates via WebSocket — \"Metadata extracted\", \"Thumbnail generated\", \"720p ready\". Frontend supports adaptive bitrate (HLS) streaming, automatically adjusting video quality to match the viewer's network speed.",
    techStack: ["React", "Express.js", "TypeScript", "BullMQ", "PostgreSQL", "Socket.io", "Redis", "Docker", "AWS EC2", "Prisma ORM", "FFmpeg", "Clerk", "Cloudinary", "GitHub Actions", "Zustand"],
    features: [
      "Real-time processing progress via WebSocket + Redis Pub/Sub",
      "Adaptive bitrate streaming (HLS) — 240p to 1080p",
      "Background job queues with BullMQ (non-blocking architecture)",
      "Fully Dockerized, deployed on AWS EC2",
      "CI/CD pipeline via GitHub Actions"
    ],
    github: "https://github.com/TirthBhatt1208/Videoflow",
    liveDemo: "http://13.203.89.29:5173"
  },
  {
    id: "vibestudio",
    title: "VibeStudio",
    featured: true,
    problem: "Developers want to go from idea to working UI instantly — but most tools either require too much setup or lock you into a proprietary, non-transparent ecosystem. You can't see what's happening under the hood.",
    solution: "Built a vibe coding platform — similar to v0.dev — where you describe what you want in plain text and get generated, runnable UI code instantly. The code executes inside isolated E2B sandboxes, so there's zero risk and zero setup required on the user's end.",
    techStack: ["Next.js", "Clerk", "Clerk Billing", "TanStack Query", "shadcn/ui", "Inngest", "E2B Sandbox", "Prisma ORM", "PostgreSQL", "Gemini API", "Zustand"],
    features: [
      "Prompt-to-code UI generation powered by Google Gemini API",
      "Isolated E2B sandbox execution — safe, no user setup required",
      "Background job processing with Inngest",
      "Authentication + billing system via Clerk",
      "Full generation history stored in PostgreSQL + Prisma"
    ],
    github: "https://github.com/TirthBhatt1208/VibeStudio",
    liveDemo: "https://vibe-studio-n5dakdq47-worktirth1208-7870s-projects.vercel.app"
  },
  {
    id: "videotube",
    title: "VideoTube",
    featured: false,
    problem: "Most backend tutorials show basic CRUD. They don't show how a real platform like YouTube structures its entire backend — authentication, subscriptions, playlists, community posts, dashboards, and everything wired together cleanly.",
    solution: "Built a complete YouTube-like REST API backend covering the full feature surface: users, videos, playlists, community posts, likes, comments, subscriptions, and an analytics dashboard. Proper MVC structure throughout, custom error handling, and file upload to cloud storage.",
    techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Multer", "Cloudinary"],
    features: [
      "Full YouTube-scale REST API — 8 feature modules, complete CRUD",
      "JWT-based authentication with refresh token rotation",
      "File upload via Multer + Cloudinary integration",
      "Custom ApiError and ApiResponse standardized classes",
      "asyncHandler wrapper for clean async error management"
    ],
    github: "https://github.com/TirthBhatt1208/VideoTube"
  },
  {
    id: "react-mini-blog",
    title: "React-Mini-Blog",
    featured: false,
    problem: "Building a real-world blogging application involves more than displaying text — it requires authentication, file storage, rich text editing, and state management all working together in a React app. Most tutorials show only one piece of the puzzle.",
    solution: "Built a full-featured mini blogging platform where users can sign up, write rich blog posts using a TinyMCE editor, upload cover images, and manage their posts — all in one cohesive React app with Appwrite as the complete backend.",
    techStack: ["React.js", "Tailwind CSS", "Appwrite", "Redux Toolkit", "TinyMCE"],
    features: [
      "User authentication — Signup / Login / Logout via Appwrite Auth",
      "Create, Edit, Delete, and View blog posts",
      "Image upload and management via Appwrite Storage",
      "Rich text editing with TinyMCE integration",
      "Global auth state managed with Redux Toolkit",
      "Fully responsive UI with Tailwind CSS"
    ],
    github: "https://github.com/TirthBhatt1208/React-Mini-Blog"
  }
]
