# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint via Next.js
```

No test suite exists in this project.

## Architecture

Personal website and blog at `kongesque.com`. Built with Next.js 15 App Router, TypeScript, Tailwind CSS, and JetBrains Mono as the sole font.

**Routing:**
- `/` — Home: header, projects list, blog section, links
- `/blog` — Blog index
- `/blog/[slug]` — MDX post page
- `/projects` — Full projects list
- `/tone` — Tone.js audio page
- `/og/blog`, `/og/home` — Dynamic OG image routes (Next.js `ImageResponse`)

**Blog system:** MDX files live in `src/posts/`. The `src/lib/blog.ts` module reads them from disk at build time using `fs`, parses YAML frontmatter (title, description, date) manually via regex, and caches results with React `cache()`. Each post requires a cover image at `public/cover/<slug>.jpg`.

**Theme:** Colors are defined as named constants in `src/lib/theme.ts` (e.g. `COLORS.background`, `COLORS.primary`) and mapped to CSS variables used by Tailwind. Use the semantic Tailwind color tokens (`text-primary`, `text-secondary`, `bg-blockBg`, `border-line`, etc.) rather than raw hex values.

**Snake game:** `src/lib/snake-game.ts` contains core game logic; `src/components/snake.tsx` is the p5.js canvas component; `src/components/snake-wrapper.tsx` handles client-side dynamic import.

**OG images:** Both `/og/blog` and `/og/home` routes generate images server-side. Blog OG images attempt to load a matching cover image by slugifying the post title, falling back to a plain background.

**Layout constraint:** All pages are constrained to `max-w-3xl mx-auto px-4` in `src/app/layout.tsx`.

## Adding a Blog Post

1. Create `src/posts/<slug>.mdx` with frontmatter:
   ```
   ---
   title: "Post Title"
   description: "Short description"
   date: "YYYY-MM-DD"
   ---
   ```
2. Add a cover image at `public/cover/<slug>.jpg` (1200×630 recommended).

## Skills

Two agent skills are available in `.agent/skills/`:
- `web-design-guidelines` — reviews UI code against Vercel's Web Interface Guidelines
- `vercel-react-best-practices` — performance and rendering best-practice rules
