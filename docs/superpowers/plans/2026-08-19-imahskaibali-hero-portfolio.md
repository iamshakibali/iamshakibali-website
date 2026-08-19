# imahskaibali Hero-Only Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal, single-page hero portfolio for a product designer / design engineer, with a reactive three.js geometric animation, contact + resume + social links, all driven by one placeholder content file.

**Architecture:** Next.js App Router renders one full-viewport hero. A client-only `Scene.tsx` (loaded via `next/dynamic` with `ssr: false`) hosts a `@react-three/fiber` canvas with a wireframe icosahedron wrapped in drei's `Float`, lerped to the pointer. All personal copy/links live in `lib/content.ts` so the owner can swap real content without touching layout or animation.

**Tech Stack:** Next.js (App Router, TypeScript), Tailwind CSS v4, three.js, @react-three/fiber, @react-three/drei, lucide-react (icons).

**Spec:** `docs/superpowers/specs/2026-08-19-imahskaibali-hero-portfolio-design.md`

## Global Constraints

- **Package manager:** npm (scaffold with `--use-npm`).
- **Directory layout:** App Router at repo root (`app/`, NOT `src/`). Import alias `@/*` maps to repo root, so `@/lib/content` and `@/components/Scene` must resolve.
- **Brand handle:** the displayed wordmark/name is exactly `imahskaibali` (stylized, lowercase).
- **Theme:** dark background always (not gated behind `prefers-color-scheme`).
- **Content:** every personal value (name, headline, subtext, email, resume URL, socials) is a placeholder and MUST live in `lib/content.ts`. No personal strings hardcoded in components.
- **Animation accessibility:** MUST respect `prefers-reduced-motion` (render the object static). R3F pauses the loop when the tab is hidden automatically — do not add extra visibility handling.
- **Verification model (deliberate, not an oversight):** this is a static, logic-free portfolio page. The automated gate for every task is `npm run build` (it type-checks all files and fails on broken imports) plus a visual render check via `npm run dev`. **No unit-test framework is added** — introducing Vitest/Jest for a page with zero branching logic is over-engineering (YAGNI). Do not add a test runner.
- **Icons:** use `lucide-react`. Do NOT hand-author brand SVG paths and do NOT add any other icon package.
- **Commits:** one commit per task. No `Co-Authored-By` trailer in any commit message (user rule).

---

### Task 1: Scaffold Next.js project and install dependencies

**Files:**
- Create: entire Next.js scaffold at repo root (`app/`, `public/`, `package.json`, `tsconfig.json`, etc.)

**Interfaces:**
- Produces: a working Next.js App Router project with Tailwind v4, TypeScript, and the `@/*` alias; three.js + R3F + drei + lucide-react installed and resolvable.

- [ ] **Step 1: Scaffold Next.js in place**

The repo already contains `docs/` and `.git` — `create-next-app` tolerates these (it only blocks on conflicting files like `package.json`/`tsconfig.json`, which don't exist yet). Run from the repo root:

```bash
npx --yes create-next-app@latest . \
  --typescript --tailwind --eslint --app \
  --no-src-dir --import-alias "@/*" --use-npm --yes
```

If the scaffold refuses because the directory is non-empty, scaffold into a temp dir (`npx --yes create-next-app@latest tmp-app <same flags>`), then move its contents (including dotfiles, excluding `.git`) into the repo root and delete `tmp-app`. Do NOT delete the existing `.git` or `docs/`.

- [ ] **Step 2: Install three.js, R3F, drei, and icons**

```bash
npm install three @react-three/fiber @react-three/drei lucide-react
npm install -D @types/three
```

- [ ] **Step 3: Verify the fresh scaffold builds**

```bash
npm run build
```

Expected: build succeeds with the default page. (This is the baseline gate — all later tasks must keep this green.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with three.js and icon deps
"
```

---

### Task 2: Content module (`lib/content.ts`)

**Files:**
- Create: `lib/content.ts`

**Interfaces:**
- Produces: a named export `content` consumed by `app/layout.tsx` (metadata) and `app/page.tsx` (hero copy/links). Shape:

```ts
content: {
  name: string;          // wordmark, "imahskaibali"
  headline: string;      // hero H1
  subtext: string;       // one-line subtitle
  email: string;         // contact email (no "mailto:" prefix)
  resumeUrl: string;     // "/resume.pdf"
  socials: ReadonlyArray<{ label: string; url: string }>;
}
```

The `socials[].label` values MUST be exactly `"Dribbble"`, `"X"`, `"LinkedIn"`, `"GitHub"` — Task 5 maps these labels to lucide icons by name.

- [ ] **Step 1: Create `lib/content.ts`**

```ts
// All personal content lives here. Swap the placeholders for real values
// later — nothing personal is hardcoded in the components.
export const content = {
  name: "imahskaibali",
  headline: "Product Designer & Design Engineer",
  subtext: "I design and build digital products end to end.",
  email: "hello@imahskaibali.com",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "Dribbble", url: "https://dribbble.com/imahskaibali" },
    { label: "X", url: "https://x.com/imahskaibali" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/imahskaibali" },
    { label: "GitHub", url: "https://github.com/imahskaibali" },
  ],
} as const;
```

- [ ] **Step 2: Verify it type-checks**

```bash
npm run build
```

Expected: build succeeds (the file is type-checked even though nothing imports it yet).

- [ ] **Step 3: Commit**

```bash
git add lib/content.ts
git commit -m "feat: add placeholder content module
"
```

---

### Task 3: Root layout shell (`app/layout.tsx`) + dark theme (`app/globals.css`)

**Files:**
- Modify: `app/layout.tsx` (replace scaffold body)
- Modify: `app/globals.css` (force dark theme, drop font coupling)

**Interfaces:**
- Consumes: `content` from `@/lib/content` (for `metadata.title` / `metadata.description`).
- Produces: a dark full-height shell that renders `{children}`; metadata set from the content module.

- [ ] **Step 1: Replace `app/globals.css`**

The scaffold ships a Tailwind v4 entry (`@import "tailwindcss";`). Replace the whole file with a dark-always theme and no font variables (we use the system font stack to stay dependency-free):

```css
@import "tailwindcss";

:root {
  --background: #0a0a0a;
  --foreground: #ededed;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

html,
body {
  height: 100%;
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

- [ ] **Step 2: Replace `app/layout.tsx`**

Remove the scaffold's Geist font imports (they reference variables we just deleted from `globals.css`):

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: content.name,
  description: content.subtext,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify it builds**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: dark root layout shell with metadata from content module
"
```

---

### Task 4: 3D scene component (`components/Scene.tsx`)

**Files:**
- Create: `components/Scene.tsx`

**Interfaces:**
- Consumes: `three`, `@react-three/fiber` (`Canvas`, `useFrame`), `@react-three/drei` (`Float`).
- Produces: default export `Scene` — a client component rendering an absolutely-positioned canvas behind page content. It self-detects `prefers-reduced-motion` and renders the object static when reduced.

- [ ] **Step 1: Create `components/Scene.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function GeometricObject({ reduced = false }: { reduced?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reduced) return;
    // continuous slow spin on the mesh
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.08;
    }
    // lerped pointer parallax on the outer group (kept separate so the
    // two rotations don't fight each other)
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.4,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.3,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial wireframe color="#8b5cf6" />
      </mesh>
    </group>
  );
}

export default function Scene() {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        {reduced ? (
          <GeometricObject reduced />
        ) : (
          <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
            <GeometricObject />
          </Float>
        )}
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Verify it builds**

```bash
npm run build
```

Expected: build succeeds. (The component is client-only and not yet imported, but it must type-check.)

- [ ] **Step 3: Commit**

```bash
git add components/Scene.tsx
git commit -m "feat: reactive three.js wireframe scene with reduced-motion support
"
```

---

### Task 5: Hero page (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx` (replace scaffold page)

**Interfaces:**
- Consumes: `content` from `@/lib/content`; default export `Scene` from `@/components/Scene` (via `next/dynamic`, `ssr: false`); `lucide-react` icons.
- Produces: the full-viewport hero — wordmark top-left, centered headline/subtext, Resume button + email link, social icon buttons, with `Scene` layered behind.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import dynamic from "next/dynamic";
import {
  Dribbble,
  Twitter,
  Linkedin,
  Github,
  Mail,
  FileText,
} from "lucide-react";
import { content } from "@/lib/content";

// three.js touches the DOM — load the canvas client-side only.
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

// Maps content.socials[].label -> lucide icon. Labels must match content.ts.
const socialIcons = {
  Dribbble,
  X: Twitter,
  LinkedIn: Linkedin,
  GitHub: Github,
} as const;

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <Scene />

      {/* Wordmark */}
      <header className="relative z-10 p-6">
        <span className="text-sm font-semibold uppercase tracking-widest">
          {content.name}
        </span>
      </header>

      {/* Center content */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          {content.headline}
        </h1>
        <p className="mt-4 max-w-xl text-base text-neutral-400 md:text-lg">
          {content.subtext}
        </p>

        {/* CTA row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={content.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            <FileText size={16} />
            Resume
          </a>
          <a
            href={`mailto:${content.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-medium transition-colors hover:border-neutral-400"
          >
            <Mail size={16} />
            {content.email}
          </a>
        </div>

        {/* Socials */}
        <div className="mt-8 flex items-center gap-3">
          {content.socials.map((s) => {
            const Icon = socialIcons[s.label as keyof typeof socialIcons];
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-full border border-neutral-800 p-2.5 text-neutral-400 transition-colors hover:border-neutral-500 hover:text-white"
              >
                {Icon ? <Icon size={18} /> : null}
              </a>
            );
          })}
        </div>
      </section>

      <footer className="relative z-10 p-6" />
    </main>
  );
}
```

- [ ] **Step 2: Verify it builds**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Visual render check**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm: dark background; wordmark top-left; headline + subtext centered; Resume button and email link present; four social icon buttons; the wireframe object renders behind the text, spins slowly, drifts, and tilts toward the cursor. Then stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: hero page with CTA, socials, and layered 3d scene
"
```

---

### Task 6: Placeholder resume + final verification

**Files:**
- Create: `public/resume.pdf`

**Interfaces:**
- Consumes: `content.resumeUrl` (`/resume.pdf`) from Task 2, which the Resume button in Task 5 links to.
- Produces: a valid one-page placeholder PDF served at `/resume.pdf` so the button doesn't 404.

- [ ] **Step 1: Create a minimal placeholder `public/resume.pdf`**

Write a tiny valid one-page PDF via heredoc:

```bash
cat > public/resume.pdf <<'PDF'
%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length 90 >> stream
BT /F1 20 Tf 72 720 Td (Placeholder resume - replace with the real file.) Tj ET
endstream
endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
trailer << /Root 1 0 R /Size 6 >>
%%EOF
PDF
```

This is a deliberately minimal placeholder. If a strict viewer rejects it, replace `public/resume.pdf` with any real one-page PDF — it is temporary either way.

- [ ] **Step 2: Full production build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Final end-to-end render check**

```bash
npm run dev
```

At `http://localhost:3000` confirm:
- Hero renders and the animation runs.
- Click **Resume** → `/resume.pdf` opens (no 404).
- Narrow the window to a mobile width → layout stays usable (CTA row wraps, text scales).
- Enable OS "reduce motion" (or DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`) → the object renders static.
Then stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add public/resume.pdf
git commit -m "feat: add placeholder resume asset
"
```
