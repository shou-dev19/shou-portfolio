# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

### Dependencies
- Primary: Next.js 14.2.3, React 18, TypeScript 5
- UI: Material-UI (MUI) v5, Framer Motion for animations
- Content: gray-matter, react-markdown, remark for Markdown processing
- Email: Resend for contact form functionality

## Project Architecture

### Content Management System
This portfolio uses a **Git-based CMS** approach:
- Content is stored in `_contents/` directory as Markdown and JSON files
- Skills data: `_contents/skills.json` (structured with categories, levels, years of experience)
- Project details: `_contents/projects/*.md` (markdown files with frontmatter)
- Self-introduction: `_contents/self-introduction.md`

### Key Architectural Decisions
- **Static Site Generation (SSG)**: Uses Next.js SSG for optimal performance
- **Base Path**: Application runs under `/portfolio` base path (configured in next.config.js)
- **Theme System**: Custom MUI theme with Roboto and Playfair Display fonts
- **Layout Structure**: Centralized layout component with Header, Footer, and MotionProvider

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/contact/        # Contact form API endpoint
│   ├── contact/            # Contact page
│   ├── projects/           # Projects listing and detail pages
│   └── skills/             # Skills page
├── components/             # Reusable UI components
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── MotionProvider.tsx  # Framer Motion wrapper
│   ├── ProjectModal.tsx    # Project detail modal
│   └── *Client.tsx         # Client-side components
└── theme.ts               # MUI theme configuration
```

### Component Patterns
- **Client Components**: Components requiring interactivity are suffixed with "Client" (e.g., `HomePageClient.tsx`, `ProjectListClient.tsx`)
- **Layout System**: All pages wrap content in the `Layout` component which provides consistent Header/Footer
- **Theme Integration**: Components use MUI's `ThemeProvider` and custom theme from `src/theme.ts`
- **Motion**: Pages use `MotionProvider` for consistent Framer Motion animations

### Content Data Flow
1. Markdown/JSON files in `_contents/` serve as the data source
2. Pages read these files during build time (SSG)
3. Content is processed with gray-matter for frontmatter parsing
4. Skills use structured JSON format with categories and skill levels
5. Projects support detailed metadata including tech stack, screenshots, and links

### Development Notes
- The project follows a **step-by-step development process** documented in `docs/`:
  - `requirements.md`: Feature requirements and acceptance criteria
  - `design.md`: Technical architecture and design decisions
  - `tasks.md`: Implementation roadmap
- Contact form uses Next.js API Routes with Resend for email delivery
- All styling uses MUI components with custom theme configuration
- TypeScript strict mode enabled with path aliases (`@/*` -> `./src/*`)

### Japanese Context
This is a Japanese developer's portfolio (SHOU), with some content in Japanese. The design incorporates Yokohama/Pokemon themes as personal touches while maintaining professional presentation.