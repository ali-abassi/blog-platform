# Blog Platform MVP

## Overview
Single-author blog platform with markdown support.

## Tech Stack
- Frontend: Next.js 14+ (App Router)
- Backend: Convex
- Styling: Tailwind CSS + shadcn/ui
- Markdown: react-markdown + remark-gfm

## Project Structure
```
src/
├── app/
│   ├── blog/           # Public pages
│   │   ├── page.tsx    # Posts list
│   │   └── [slug]/     # Single post
│   └── admin/          # Author pages
│       ├── page.tsx    # Dashboard
│       ├── new/        # Create post
│       └── edit/[id]/  # Edit post
├── components/
│   ├── ui/             # shadcn (do not edit)
│   └── posts/          # Blog components
convex/
├── schema.ts           # Database schema
└── posts.ts            # Backend functions
```

## Key Patterns
- Server components by default
- Convex useQuery/useMutation hooks
- Markdown rendered with react-markdown

## Commands
- `npm run dev` - Start Next.js dev server
- `npx convex dev` - Start Convex (run in separate terminal)
- `npm run build` - Production build

## Convex Setup
IMPORTANT: Run `npx convex dev` to create NEW deployment.
Do NOT reuse existing deployments (mission-control or todo-app).

## Data Model
Posts table with fields:
- title, slug, content, excerpt
- status: "draft" | "published"
- publishedAt, createdAt, updatedAt
