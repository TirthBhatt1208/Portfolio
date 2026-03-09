"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const STYLES = `
  @keyframes dotV {
    0%   { top: 0; opacity: 0; }
    15%  { opacity: 1; }
    85%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes dotH {
    0%   { left: 0; opacity: 0; }
    15%  { opacity: 1; }
    85%  { opacity: 1; }
    100% { left: 100%; opacity: 0; }
  }
  @keyframes dotHrev {
    0%   { right: 0; opacity: 0; }
    15%  { opacity: 1; }
    85%  { opacity: 1; }
    100% { right: 100%; opacity: 0; }
  }
  @keyframes nodeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Custom scrollbar for horizontal chart scrolling */
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #0A0A0A; 
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #222; 
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #333; 
  }
`

// ─── CONNECTORS ──────────────────────────────────────────────────────────────

function VConn({ color, h = 40, delay = 0 }: { color: string; h?: number; delay?: number }) {
    return (
        <div style={{ height: h, width: 2, position: 'relative', margin: '0 auto', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: 0, bottom: 6, left: 0, width: '100%', background: `linear-gradient(to bottom, ${color}40, ${color}80)` }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `6px solid ${color}bb` }} />
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}`, animation: `dotV 1.8s ${delay}ms infinite ease-in-out` }} />
        </div>
    )
}

// Normal left→right arrow
function HConn({ color, w = 40, delay = 0 }: { color: string; w?: number; delay?: number }) {
    return (
        <div style={{ width: w, height: 2, position: 'relative', flexShrink: 0, alignSelf: 'center' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 6, height: '100%', background: `linear-gradient(to right, ${color}40, ${color}80)` }} />
            <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `6px solid ${color}bb` }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}`, animation: `dotH 1.8s ${delay}ms infinite ease-in-out` }} />
        </div>
    )
}

// Reversed right→left arrow (for CD reversed flow)
function HConnRev({ color, w = 40, delay = 0 }: { color: string; w?: number; delay?: number }) {
    return (
        <div style={{ width: w, height: 2, position: 'relative', flexShrink: 0, alignSelf: 'center' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, left: 6, height: '100%', background: `linear-gradient(to left, ${color}40, ${color}80)` }} />
            <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderRight: `6px solid ${color}bb` }} />
            <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}`, animation: `dotHrev 1.8s ${delay}ms infinite ease-in-out` }} />
        </div>
    )
}

// Vertical UP arrow
function VConnUp({ color, h = 40, delay = 0 }: { color: string; h?: number; delay?: number }) {
    return (
        <div style={{ height: h, width: 2, position: 'relative', margin: '0 auto', flexShrink: 0 }}>
            <div style={{ position: 'absolute', bottom: 0, top: 6, left: 0, width: '100%', background: `linear-gradient(to top, ${color}40, ${color}80)` }} />
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: `6px solid ${color}bb` }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}`, animation: `dotV 1.8s ${delay}ms infinite ease-in-out` }} />
        </div>
    )
}

// ─── NODE ────────────────────────────────────────────────────────────────────

function Node({ label, sub, color, icon, tag, delay = 0, w = 150 }: {
    label: string; sub?: string; color: string; icon: string
    tag?: string; delay?: number; w?: number
}) {
    const [hov, setHov] = useState(false)
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                position: 'relative', width: w, flexShrink: 0,
                background: hov ? `linear-gradient(135deg,${color}20,${color}0c)` : `linear-gradient(135deg,${color}0e,${color}07)`,
                border: `1px solid ${hov ? color + '70' : color + '35'}`,
                borderRadius: 10, padding: '9px 12px', textAlign: 'center',
                boxShadow: hov ? `0 0 16px ${color}28` : 'none',
                transition: 'all 0.2s ease',
                animation: `nodeIn 0.4s ease ${delay}ms both`,
                cursor: 'default',
            }}
        >
            {tag && (
                <span style={{ position: 'absolute', top: -10, right: -8, fontFamily: 'monospace', fontSize: 8, padding: '2px 5px', borderRadius: 4, background: color, color: '#0A0A0A', fontWeight: 800 }}>
                    {tag}
                </span>
            )}
            <div style={{ fontSize: 18, marginBottom: 2 }}>{icon}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color, lineHeight: 1.2 }}>{label}</div>
            {sub && <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#505050', marginTop: 3, lineHeight: 1.3 }}>{sub}</div>}
        </div>
    )
}

function SmallBox({ lines, delay = 0, borderColor = '#252525' }: { lines: string[]; delay?: number; borderColor?: string }) {
    return (
        <div style={{ borderRadius: 8, padding: '8px 14px', textAlign: 'center', flexShrink: 0, background: '#111', border: `1px solid ${borderColor}`, animation: `nodeIn 0.4s ease ${delay}ms both` }}>
            {lines.map((l, i) => (
                <div key={i} style={{ fontFamily: 'monospace', fontSize: 10, color: i === 0 ? '#666' : '#484848', lineHeight: 1.5 }}>{l}</div>
            ))}
        </div>
    )
}

function StagePill({ label, color }: { label: string; color: string }) {
    return (
        <div style={{ padding: '5px 16px', borderRadius: 999, fontFamily: 'monospace', fontSize: 12, fontWeight: 700, background: `${color}18`, border: `1px solid ${color}40`, color }}>
            {label}
        </div>
    )
}

// ─── USER FLOW ────────────────────────────────────────────────────────────────
/*
  User → Express (validate) → Cloudinary (store video) → URL → DB
  ↓
  [Metadata Queue] → FFmpeg metadata → store in DB → publish → Redis → WS → User
  ↓
  [Thumbnail Queue] → FFmpeg thumbnail → Cloudinary → URL in DB → publish → Redis → WS → User
  ↓
  [Processing Queue] → FFmpeg 240p…1080p segments + index.m3u8 + master.m3u8 → Cloudinary → DB → publish → Redis → WS → User
*/
function UserFlowDiagram() {
    return (
        <div style={{ animation: 'fadeIn 0.5s ease both' }}>

            {/* Stage pills */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
                <StagePill label="Upload" color="#00F5FF" />
                <span style={{ color: '#333', fontFamily: 'monospace' }}>→</span>
                <StagePill label="Queue Processing" color="#FFB800" />
                <span style={{ color: '#333', fontFamily: 'monospace' }}>→</span>
                <StagePill label="Store & Notify" color="#4ADE80" />
            </div>

            {/* Main vertical flow — center aligned */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Row 1: User → Express → Cloudinary → DB */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <Node label="User" sub="uploads video" icon="👤" color="#00F5FF" delay={0} w={120} />
                    <HConn color="#00F5FF" w={32} delay={60} />
                    <Node label="Express" sub="validates file" icon="⚡" color="#00F5FF" delay={80} w={140} />
                    <HConn color="#A78BFA" w={32} delay={140} />
                    <Node label="Cloudinary" sub="stores video" icon="☁️" color="#A78BFA" delay={160} w={140} />
                    <HConn color="#A78BFA" w={32} delay={220} />
                    <Node label="URL → DB" sub="saves video URL" icon="🗄️" color="#A78BFA" delay={240} w={140} />
                </div>

                <VConn color="#FFB800" h={36} delay={300} />

                {/* ── Metadata Queue ── */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Node label="Metadata Queue" icon="📋" color="#FFB800" tag="BullMQ" delay={320} w={200} />
                    <VConn color="#888" h={24} delay={360} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        <SmallBox lines={['FFmpeg', 'extracts metadata']} delay={380} />
                        <HConn color="#A78BFA" w={28} delay={420} />
                        <SmallBox lines={['metadata', '→ DB']} delay={440} />
                        <HConn color="#FF4D4D" w={28} delay={480} />
                        <Node label="Publish" sub="→ Redis" icon="📡" color="#FF4D4D" delay={500} w={110} />
                        <HConn color="#FF4D4D" w={28} delay={540} />
                        <Node label="WS → User" sub="live update" icon="🔌" color="#4ADE80" delay={560} w={120} />
                    </div>
                </div>

                <VConn color="#FFB800" h={36} delay={600} />

                {/* ── Thumbnail Queue ── */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Node label="Thumbnail Queue" icon="🖼️" color="#FFB800" tag="BullMQ" delay={620} w={200} />
                    <VConn color="#888" h={24} delay={660} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        <SmallBox lines={['FFmpeg', 'gen thumbnail']} delay={680} />
                        <HConn color="#A78BFA" w={28} delay={720} />
                        <SmallBox lines={['thumbnail', '→ Cloudinary → DB']} delay={740} />
                        <HConn color="#FF4D4D" w={28} delay={780} />
                        <Node label="Publish" sub="→ Redis" icon="📡" color="#FF4D4D" delay={800} w={110} />
                        <HConn color="#FF4D4D" w={28} delay={840} />
                        <Node label="WS → User" sub="live update" icon="🔌" color="#4ADE80" delay={860} w={120} />
                    </div>
                </div>

                <VConn color="#FFB800" h={36} delay={900} />

                {/* ── Processing Queue ── */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Node label="Processing Queue" icon="⚙️" color="#FFB800" tag="BullMQ" delay={920} w={200} />
                    <VConn color="#888" h={24} delay={960} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        <SmallBox lines={['FFmpeg: 240p…1080p', 'segments + HLS']} delay={980} />
                        <HConn color="#A78BFA" w={28} delay={1020} />
                        <SmallBox lines={['index.m3u8 + master.m3u8', '→ Cloudinary → DB']} delay={1040} />
                        <HConn color="#FF4D4D" w={28} delay={1080} />
                        <Node label="Publish" sub="→ Redis" icon="📡" color="#FF4D4D" delay={1100} w={110} />
                        <HConn color="#FF4D4D" w={28} delay={1140} />
                        <Node label="WS → User" sub="live update" icon="🔌" color="#4ADE80" delay={1160} w={120} />
                    </div>
                </div>

            </div>
        </div>
    )
}

// ─── CI/CD FLOW ───────────────────────────────────────────────────────────────
/*
  CI row (left→right): git push → GitHub Actions (lint+build) → SSH into EC2
  Arrow DOWN from EC2 into CD block
  CD block (RIGHT→LEFT reversed): Live ← Docker Compose ← git pull ← EC2
*/
function CiCdFlowDiagram() {
    return (
        <div style={{ animation: 'fadeIn 0.5s ease both' }}>

            {/* Stage pills */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
                <StagePill label="Push" color="#E8E8E8" />
                <span style={{ color: '#333', fontFamily: 'monospace' }}>→</span>
                <StagePill label="CI" color="#FFB800" />
                <span style={{ color: '#333', fontFamily: 'monospace' }}>→</span>
                <StagePill label="Deploy" color="#A78BFA" />
                <span style={{ color: '#333', fontFamily: 'monospace' }}>→</span>
                <StagePill label="Live" color="#4ADE80" />
            </div>

            {/* ── CI Row (left → right) ── */}
            <div style={{ marginBottom: 0 }}>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#FFB800', letterSpacing: '0.08em', marginBottom: 8, textAlign: 'left' }}>CI</div>
                <div style={{ padding: '16px 20px', borderRadius: 12, background: '#0E1620', border: '1px solid #FFB80030' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        <Node label="git push" sub="to GitHub" icon="⬆️" color="#E8E8E8" delay={0} w={130} />
                        <HConn color="#FFB800" w={36} delay={60} />
                        <Node label="GitHub Actions" sub="lint + build" icon="⚙️" color="#FFB800" delay={80} w={155} />
                        <HConn color="#A78BFA" w={36} delay={140} />
                        <Node label="SSH into EC2" sub="secure tunnel" icon="🔐" color="#A78BFA" delay={160} w={155} />
                    </div>
                </div>
            </div>

            {/* Down arrow: SSH → EC2, aligned to right side where SSH node ends */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 97 }}>
                <VConn color="#FF9500" h={36} delay={220} />
            </div>

            {/* ── CD Block (right → left reversed) ── */}
            <div>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#A78BFA', letterSpacing: '0.08em', marginBottom: 8, textAlign: 'left' }}>CD</div>
                <div style={{ padding: '16px 20px', borderRadius: 12, background: '#110E1A', border: '1px solid #A78BFA30' }}>
                    {/* EC2 → git pull → Docker Compose → Live */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        <Node label="EC2 Instance" sub="AWS server" icon="☁️" color="#FF9500" delay={240} w={145} />
                        <HConn color="#00F5FF" w={36} delay={300} />
                        <Node label="git pull" sub="latest commit" icon="⬇️" color="#00F5FF" delay={320} w={130} />
                        <HConn color="#00F5FF" w={36} delay={380} />
                        <Node label="Docker Compose" sub="up -d --build" icon="🐳" color="#00F5FF" delay={400} w={160} />
                        <HConn color="#4ADE80" w={36} delay={460} />
                        <Node label="Live 🚀" sub=":5173 / :8000" icon="✅" color="#4ADE80" delay={480} w={140} />
                    </div>
                </div>
            </div>

        </div>
    )
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────

function DiagramSection({ diagram, isFirst, refProp }: {
    diagram: { id: string; title: string; subtitle: string; badge: string; accent: string }
    isFirst: boolean
    refProp: React.RefObject<HTMLDivElement | null>
}) {
    return (
        <div ref={refProp} className={`py-10 sm:py-14 px-4 sm:px-6 ${isFirst ? '' : 'border-t border-[#111]'}`}>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-6 sm:mb-8">
                    <span 
                        className="self-start sm:self-auto font-mono text-[10px] tracking-widest px-3 py-1 rounded-full" 
                        style={{ background: `${diagram.accent}15`, color: diagram.accent, border: `1px solid ${diagram.accent}30` }}
                    >
                        {diagram.badge}
                    </span>
                    <div>
                        <h2 className="font-mono font-bold text-xl text-[#E8E8E8] m-0">{diagram.title}</h2>
                        <p className="font-mono text-[11px] sm:text-xs text-[#404040] mt-1 mb-0">{diagram.subtitle}</p>
                    </div>
                    {isFirst && (
                        <span className="hidden sm:inline-block ml-auto font-mono text-[10px] px-2 py-0.5 rounded" style={{ background: `${diagram.accent}18`, color: diagram.accent }}>
                            ← you clicked this
                        </span>
                    )}
                </div>
                {/* Horizontal scrollable wrapper for small screens */}
                <div className="rounded-2xl p-4 sm:p-8 overflow-x-auto bg-[#0A0A0A] custom-scrollbar" style={{ border: `1px solid ${diagram.accent}20`, boxShadow: `0 0 40px ${diagram.accent}08` }}>
                    <div className="min-w-[700px] flex flex-col items-center">
                        {diagram.id === 'user-flow' ? <UserFlowDiagram /> : <CiCdFlowDiagram />}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const diagrams = [
    { id: 'user-flow', title: 'User Flow', subtitle: 'Upload → Queue Processing → Store & Notify', badge: 'SYSTEM DESIGN', accent: '#00F5FF' },
    { id: 'cicd-flow', title: 'CI/CD Flow', subtitle: 'Push → CI → SSH → Deploy → Live', badge: 'INFRASTRUCTURE', accent: '#A78BFA' },
]

export default function ArchitecturePage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const focus = searchParams.get('focus') ?? 'user-flow'

    const userRef = useRef<HTMLDivElement>(null)
    const cicdRef = useRef<HTMLDivElement>(null)
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = { 'user-flow': userRef, 'cicd-flow': cicdRef }

    useEffect(() => {
        const t = setTimeout(() => refs[focus]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
        return () => clearTimeout(t)
    }, [focus])

    const ordered = focus === 'cicd-flow' ? [diagrams[1], diagrams[0]] : [diagrams[0], diagrams[1]]

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            <style>{STYLES}</style>

            {/* Nav */}
            <div className="sticky top-0 z-50 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 bg-[#0a0a0ae6] border-b border-[#141414] backdrop-blur-md">
                <button onClick={() => router.back()}
                    className="font-mono text-xs text-[#444] hover:text-[#E8E8E8] transition-colors flex items-center gap-2 bg-transparent border-none cursor-pointer p-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                </button>
                <div className="flex flex-wrap gap-2">
                    {diagrams.map(d => (
                        <button key={d.id}
                            onClick={() => refs[d.id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                            className="font-mono text-[10px] px-3 py-1.5 rounded-md border border-[#1A1A1A] text-[#444] bg-transparent cursor-pointer transition-all hover:bg-[#111]"
                            onMouseEnter={e => { e.currentTarget.style.color = d.accent; e.currentTarget.style.borderColor = `${d.accent}44` }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#444'; e.currentTarget.style.borderColor = '#1A1A1A' }}>
                            {d.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Title */}
            <div className="text-center pt-10 pb-4 px-4">
                <p className="font-mono text-[11px] text-[#333] mb-2">// VideoFlow</p>
                <h1 className="font-mono font-bold text-2xl sm:text-3xl text-[#E8E8E8] m-0">System Architecture</h1>
                <p className="font-mono text-[11px] sm:text-xs text-[#555] mt-2">End-to-end flow from upload to playback</p>
            </div>

            {ordered.map((d, i) => (
                <DiagramSection key={d.id} diagram={d} isFirst={i === 0} refProp={refs[d.id]} />
            ))}

            <div className="pb-20" />
        </div>
    )
}