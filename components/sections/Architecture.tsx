"use client"

import { useReveal } from '@/hooks/use-reveal'

const lessons = [
  {
    number: "01",
    title: "How to fire real-time events from inside a BullMQ queue",
    content: `Queue workers run in their own process context — they have no direct reference to the WebSocket server. You can't just call io.emit() from inside a worker.

Solution: Publish progress to a Redis Pub/Sub channel from inside the worker. The WebSocket server subscribes to that channel and forwards the event to the correct client using the userId from job metadata. This creates a clean, decoupled event-driven bridge.`
  },
  {
    number: "02",
    title: "Environment variables don't automatically load in background workers",
    content: `Background worker processes are separate Node.js processes. They don't inherit the .env file loaded by the main server.

Solution: Explicitly call dotenv.config({ path: '../.env' }) at the very top of the worker entry file, before any other imports that depend on environment variables.`
  },
  {
    number: "03",
    title: "WebSocket event ordering with async queue progress",
    content: `Multiple queue steps fire progress events asynchronously. Events can arrive out of order on the client.

Solution: Attach a Unix timestamp to every event in the worker before publishing. On the frontend, sort received events by timestamp before rendering. Never trust arrival order from async sources.`
  }
]

export function Architecture() {
  const [sectionRef, isRevealed] = useReveal<HTMLElement>({ threshold: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-[#0A0A0A]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="font-mono font-bold text-3xl text-[#E8E8E8] mb-2">
            How I Built VideoFlow
          </h2>
          <p className="font-mono text-sm text-[#555555]">
            {'// system design + lessons learned the hard way'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Flow Diagram */}
          <div
            className={`transition-all duration-700 ${
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="font-mono text-sm text-[#00F5FF] mb-6">USER FLOW</h3>
            <div className="terminal p-6 text-xs leading-relaxed overflow-x-auto">
              <pre className="text-[#888888] font-mono whitespace-pre">
{`[User] → uploads video file
  ↓
[Express Backend] → validates file
  ↓
[Cloudinary] → stores original
  ↓
[BullMQ — Metadata Queue]
  → FFmpeg extracts metadata
  → Prisma saves to PostgreSQL
  ↓
[BullMQ — Thumbnail Queue]
  → FFmpeg generates thumbnail
  → Cloudinary stores → URL to DB
  ↓
[BullMQ — Processing Queue]
  → FFmpeg: 240p|360p|480p|720p|1080p
  → HLS segments → Cloudinary
  → .m3u8 playlists → Cloudinary
  → Master playlist → DB
  ↓
[Each step] → Redis Pub/Sub
  ↓
[WebSocket Server] subscribes
  → Socket.io → pushes to client
  ↓ ↓ ↓
"Metadata ✓" "Thumbnail ✓" "Processed files ✓"`}
              </pre>
            </div>

            <h3 className="font-mono text-sm text-[#00F5FF] mt-8 mb-6">CI/CD FLOW</h3>
            <div className="terminal p-6 text-xs leading-relaxed overflow-x-auto">
              <pre className="text-[#888888] font-mono whitespace-pre">
{`[Code push to GitHub]
  → GitHub Actions: lint + build
  → SSH into AWS EC2
  → git pull
  → docker compose up -d --build
  → Frontend: port 5173
  → Backend: port 8000`}
              </pre>
            </div>
          </div>

          {/* Lessons Panel */}
          <div
            className={`transition-all duration-700 ${
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="font-mono text-sm text-[#FFB800] mb-6">
              3 PROBLEMS THAT MADE ME THINK
            </h3>
            
            <div className="space-y-8">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.number}
                  className="border-l-2 border-[#1A1A1A] pl-6 hover:border-[#00F5FF] transition-colors duration-300"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono text-2xl font-bold text-[#00F5FF]/30">
                      {lesson.number}
                    </span>
                    <h4 className="font-mono text-sm text-[#E8E8E8]">
                      {lesson.title}
                    </h4>
                  </div>
                  <p className="font-sans text-sm text-[#555555] leading-relaxed whitespace-pre-line">
                    {lesson.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
