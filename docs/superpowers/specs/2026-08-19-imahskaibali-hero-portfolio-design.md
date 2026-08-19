# imahskaibali — Hero-Only Portfolio Site

**Date:** 2026-08-19
**Status:** Approved
**Owner:** Shakib Ali (product designer & design engineer)

## Overview

A minimal, single-page portfolio consisting of one full-viewport hero section. The site serves as a personal landing page for **imahskaibali** — brand handle, contact entry points, resume download, social links — with a three.js animated geometric object as the visual centerpiece.

All personal content (name, headline, email, resume URL, social links) is placeholder for now and lives in one file so it can be swapped later without touching layout or animation code.

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **three.js** via **@react-three/fiber** + **@react-three/drei** (declarative React approach — chosen over raw three.js in `useEffect` because it's less code, idiomatic in Next.js, and makes visual iteration a prop change)

## Layout

Single full-viewport hero on a dark background:

- **Top-left:** `imahskaibali` wordmark
- **Center:** headline (placeholder: "Product Designer & Design Engineer") + one-line subtext (placeholder)
- **CTA row:**
  - **Resume** button → links to `/resume.pdf` (placeholder file)
  - **Email link** → placeholder address
- **Social buttons:** icon buttons for Dribbble, X, LinkedIn, GitHub (placeholder URLs)
- **three.js canvas:** positioned behind/around the text as the visual centerpiece

## Animation — Reactive Geometric Object

- A wireframe icosahedron (or torus knot, whichever reads cleaner during implementation) slowly rotating
- Wrapped in drei's `Float` for gentle drift
- Mouse movement subtly rotates/parallaxes the object, lerped for smoothness
- **Accessibility/perf:**
  - Respects `prefers-reduced-motion` — renders the object static
  - Animation pauses when the tab is hidden (free with R3F)

## File Structure

Deliberately minimal:

```
app/layout.tsx        — metadata, fonts, dark shell
app/page.tsx          — hero layout
components/Scene.tsx  — R3F canvas + the animated object (client component)
lib/content.ts        — ALL placeholder content: name, headline, subtext,
                        email, resume URL, social links
public/resume.pdf     — placeholder resume file
```

Everything the owner will want to change later lives in `lib/content.ts`.

## Out of Scope (YAGNI)

- Additional pages/sections (work, about, projects) — hero only
- CMS or content management
- Analytics
- SEO beyond basic metadata (title, description)
- Real resume file and real contact/social details — placeholders until provided

## Verification

- `npm run dev` — page renders, animation runs
- Layout holds on a narrow (mobile) viewport
- `prefers-reduced-motion` renders a static object
