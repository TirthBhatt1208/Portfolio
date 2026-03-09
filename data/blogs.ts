export interface BlogPost {
  slug: string
  title: string
  tagline: string
  date: string
  tags: string[]
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "bullmq-realtime-progress",
    title: "How I Built Real-Time Progress Tracking Inside BullMQ Queues",
    tagline: "The Problem with WebSocket + Queue Bridges No One Talks About",
    date: "Dec 2025",
    tags: ["Redis", "BullMQ", "WebSockets", "Node.js", "System Design"],
    content: `# Introduction

Modern backend systems rely on background job queues for long-running tasks: video processing, image compression, email sending, data pipelines, ML inference.

Queues ensure heavy operations don't block user requests.

But once a job enters a queue, a new problem appears: How do we show real-time progress to the user?

Example: Uploading video → Processing → Encoding → Upload complete

Users expect live feedback. Not a spinner that runs forever.

When I implemented this in VideoFlow using BullMQ + Redis + WebSockets, I ran into an architectural problem that most tutorials skip entirely.

This post explains:
- How BullMQ queues work
- Why real-time tracking is harder than it looks
- The hidden failure mode with WebSocket + queue bridges
- The Redis Pub/Sub architecture that actually solves it

---

# Understanding the Problem

User uploads a video. The backend flow:

\`\`\`
Client → API → Queue Job → Worker Processes Job
\`\`\`

Architecture:

\`\`\`
Client
  │
  ▼
API Server
  │
  ▼
Redis Queue (BullMQ)
  │
  ▼
Worker Server
\`\`\`

The worker knows progress. The client does not.

We need a bridge.

---

# Initial Approach: Direct WebSockets

\`\`\`
Client
  │
WebSocket Connection
  │
API Server
  │
Redis Queue
  │
Worker
\`\`\`

Worker processes job → emits progress → API pushes via WebSocket.

Looks simple. Breaks in production.

---

# The Hidden Problems

## Problem 1 — Workers Don't Know the Client

Workers run independently. They don't know which user owns the job or which WebSocket connection to send updates to.

Fix: Attach metadata when creating the job.

\`\`\`javascript
await videoQueue.add("process-video", {
  videoId: "123",
  userId: "456"    // ← attach this
});
\`\`\`

Now the worker knows who owns the job.

## Problem 2 — Multiple API Servers

In production, we run multiple API server instances behind a load balancer.

\`\`\`
        Load Balancer
        /        \\
   API Server  API Server
        \\        /
          Redis
           │
         Worker
\`\`\`

WebSockets break here.

User is connected to Server A.
Worker sends event to Server B.
User never receives the update.

This is one of the most common distributed system bugs.

---

# The Correct Architecture: Redis Pub/Sub

\`\`\`
Client
  │
WebSocket
  │
API Server  ←────────────── subscribes to Redis channel
  │
Redis Pub/Sub  ←─────────── worker publishes here
  │
Worker
  │
BullMQ Queue
\`\`\`

---

# Implementation

## Step 1 — Create job with metadata

\`\`\`javascript
await videoQueue.add("process-video", {
  videoId,
  userId
});
\`\`\`

## Step 2 — Worker publishes progress to Redis

\`\`\`javascript
await job.updateProgress(30);

redis.publish(
  "job-progress",
  JSON.stringify({
    jobId: job.id,
    progress: 30,
    userId: job.data.userId
  })
);
\`\`\`

## Step 3 — API Server subscribes and forwards

\`\`\`javascript
redis.subscribe("job-progress");

redis.on("message", (channel, message) => {
  const data = JSON.parse(message);
  io.to(data.userId).emit("job-progress", data);
});
\`\`\`

Now the correct client always receives the update, regardless of which API server instance is handling their WebSocket connection.

---

# Lessons Learned

- Queues break the request-response mental model. You need to design a separate communication layer back to the client.
- WebSockets require state synchronization across distributed servers.
- Redis Pub/Sub is the correct bridge for distributed WebSocket systems.
- Always attach job metadata (userId, jobId) when creating queue jobs.
- Attach timestamps to events and sort on the client — never trust arrival order from async sources.

---

# Final Thought

Real-time job progress looks trivial from the UI side. Architecturally, it requires solving distributed state, connection mapping, and queue-worker separation simultaneously.

Whenever background workers exist in your system, design the communication layer back to the client before writing the worker logic — not after.`
  },
  {
    slug: "docker-ec2-cicd",
    title: "Deploying a Dockerized Full-Stack App to AWS EC2 with CI/CD",
    tagline: "Everything That Went Wrong and How I Fixed It",
    date: "Mar 2026",
    tags: ["Docker", "GitHub Actions", "AWS EC2", "DevOps"],
    content: `# Introduction

Deploying locally is easy. Deploying reliably in production is a different challenge entirely.

My goal: deploy a full-stack application with four services:
- Frontend → React
- Backend → Node.js
- Database → PostgreSQL
- Cache → Redis

All containerized using Docker. Pipeline goal:

\`\`\`
GitHub → CI/CD → EC2 → Docker Containers
\`\`\`

The deployment process exposed problems I didn't expect.

---

# System Architecture

\`\`\`
Docker Network
 ├── frontend    (port 5173)
 ├── backend     (port 3000)
 ├── postgres    (port 5432, internal)
 └── redis       (port 6379, internal)
\`\`\`

Containers communicate via Docker's internal DNS using service names.

---

# Problem 1 — Containers Couldn't Talk to Each Other

Backend tried to connect to the database using:

\`\`\`
DATABASE_URL=postgres://user:pass@localhost:5432/db
\`\`\`

Inside Docker, localhost refers to the container itself, not the host or another container.

Fix:

\`\`\`
DATABASE_URL=postgres://user:pass@postgres:5432/db
\`\`\`

Docker's internal DNS resolves service names automatically within the same network. Every service should use the Docker service name, not localhost.

---

# Problem 2 — EC2 Firewall Blocking Traffic

After deployment, the app was unreachable from the browser.

The issue: EC2 security group only had SSH (port 22) open by default.

Ports that needed opening in the EC2 Security Group Inbound Rules:

\`\`\`
Port 80   → HTTP traffic
Port 443  → HTTPS traffic
Port 5173 → Frontend (Vite dev server or preview)
Port 3000 → Backend API (if accessed directly)
\`\`\`

Without these rules, AWS blocks all inbound traffic at the network level.

---

# Problem 3 — CI/CD Pipeline Authentication Failure

GitHub Actions needed to SSH into EC2 to run deployment commands.

Initial problem: no SSH key configured. Pipeline failed at the connection step.

Fix: store credentials as GitHub repository secrets.

Required secrets:
\`\`\`
EC2_HOST    → public IP or DNS of the EC2 instance
EC2_USER    → ec2-user (Amazon Linux) or ubuntu (Ubuntu)
EC2_SSH_KEY → contents of the .pem private key file
\`\`\`

GitHub Actions workflow (simplified):

\`\`\`yaml
name: Deploy to EC2

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: \${{ secrets.EC2_HOST }}
          username: \${{ secrets.EC2_USER }}
          key: \${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /app
            git pull origin main
            docker compose up -d --build
\`\`\`

Now every push to main automatically deploys to production.

---

# Final Production Architecture

\`\`\`
GitHub Repository
      │
  GitHub Actions (CI/CD trigger on push to main)
      │
  SSH into AWS EC2
      │
  git pull → docker compose up -d --build
      │
  EC2 Server running:
      ├── Frontend container  (port 5173)
      ├── Backend container   (port 3000)
      ├── PostgreSQL container (internal)
      └── Redis container     (internal)
\`\`\`

---

# Lessons Learned

- Docker networking uses service names, not localhost. This is the most common beginner Docker mistake.
- Cloud security groups are deny-by-default. Every port you need must be explicitly opened.
- CI/CD pipelines fail silently if secrets are misconfigured. Add explicit echo statements to debug early.
- docker compose up -d --build rebuilds images from scratch on every deploy, ensuring no stale containers.
- Deployment automation is not optional as projects grow — manual deployment introduces inconsistency and human error.`
  },
  {
    slug: "hls-adaptive-streaming",
    title: "Adaptive Bitrate Streaming — HLS from Scratch",
    tagline: "How Netflix-Style Streaming Actually Works",
    date: "Nov 2025",
    tags: ["FFmpeg", "HLS", "Video Processing", "Backend Systems"],
    content: `# Introduction

When watching Netflix or YouTube, the video quality automatically adjusts based on your connection speed. This is Adaptive Bitrate Streaming (ABR).

Instead of sending one fixed video file, the platform provides multiple versions of the same video at different quality levels:

\`\`\`
240p → 360p → 480p → 720p → 1080p
\`\`\`

The player selects the best version in real time based on available bandwidth.

The most widely used protocol for this is HLS — HTTP Live Streaming.

---

# How HLS Works

HLS does not stream a continuous video file. It breaks the video into small time-based segments.

Example segment files:
\`\`\`
video_720p_0001.ts
video_720p_0002.ts
video_720p_0003.ts
\`\`\`

Each segment is typically 2–10 seconds of video.

The player downloads segments sequentially and plays them back seamlessly.

---

# The Playlist File (.m3u8)

HLS uses a plain text playlist file to tell the player which segments exist and in what order.

Example index.m3u8:

\`\`\`
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXTINF:10.0,
segment_001.ts
#EXTINF:10.0,
segment_002.ts
#EXT-X-ENDLIST
\`\`\`

The player reads this file first, then fetches each segment in order.

---

# Multiple Resolutions + Master Playlist

To enable adaptive streaming, we generate a separate playlist for each resolution:

\`\`\`
360p/index.m3u8
720p/index.m3u8
1080p/index.m3u8
\`\`\`

Then a master playlist ties them all together:

\`\`\`
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
360p/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=1280x720
720p/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=4000000,RESOLUTION=1920x1080
1080p/index.m3u8
\`\`\`

The player reads the master playlist, measures available bandwidth, and picks the appropriate resolution stream automatically. It can switch mid-playback if network conditions change.

---

# Generating HLS Segments with FFmpeg

FFmpeg handles the entire transcoding and segmentation process.

Example command for 720p HLS output:

\`\`\`bash
ffmpeg -i input.mp4 \\
  -vf scale=1280:720 \\
  -c:v libx264 \\
  -preset fast \\
  -g 48 \\
  -sc_threshold 0 \\
  -hls_time 4 \\
  -hls_playlist_type vod \\
  -hls_segment_filename "720p/segment_%03d.ts" \\
  720p/index.m3u8
\`\`\`

Run this once per resolution to produce all streams.

---

# VideoFlow Processing Pipeline

In VideoFlow, the full processing pipeline looks like:

\`\`\`
User uploads video
  │
BullMQ Processing Queue
  │
FFmpeg transcodes to 240p, 360p, 480p, 720p, 1080p simultaneously
  │
HLS segments generated per resolution
  │
Segments uploaded to Cloudinary
  │
.m3u8 index files uploaded to Cloudinary → URLs stored in PostgreSQL
  │
Master playlist created → URL stored in PostgreSQL
  │
Frontend HLS player reads master playlist → streams adaptively
\`\`\`

---

# Why This Architecture Matters

Segmented adaptive streaming provides:
- Faster startup (player starts after first 4-second segment loads)
- Smooth quality switching without buffering or interruption
- Efficient bandwidth use — no downloading quality you can't display
- CDN-friendly — each segment is a small, independently cacheable file

---

# Final Thought

What looks like a simple play button to the user involves: distributed object storage, video transcoding pipelines, playlist generation, and CDN distribution working in concert.

Building this in VideoFlow gave me a concrete understanding of how modern streaming infrastructure operates at its core — and why companies like Netflix invest so heavily in their video delivery systems.`
  }
]
