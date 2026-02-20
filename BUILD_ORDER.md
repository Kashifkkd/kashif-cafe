# Build order & setup

## 1. Dependencies

```bash
npm install framer-motion gsap lenis @react-three/fiber @react-three/drei three
npm install -D @types/three
npx shadcn@latest init -y -d
npx shadcn@latest add button -y
```

## 2. Folder architecture

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  3d/
    CoffeeScene.tsx
  cursor/
    CustomCursor.tsx
  layout/
    Navbar.tsx
  motion/
    AtmosphereLayer.tsx
  sections/
    Hero.tsx
    FeaturedMenu.tsx
    SignatureExperience.tsx
    Gallery.tsx
    SoundToggle.tsx
  ui/
    button.tsx
hooks/
  useLerp.ts
  useScrollProgress.ts
lib/
  lenis-provider.tsx
  utils.ts
```

## 3. Animation setup

- **Lenis**: Initialized in `lib/lenis-provider.tsx` with GSAP ticker; `lenis.on('scroll', ScrollTrigger.update)` for pinning.
- **GSAP**: `ScrollTrigger` used in `SignatureExperience`; register in lenis-provider.
- **R3F**: Dynamic import in `app/page.tsx` with `ssr: false`; Canvas in `components/3d/CoffeeScene.tsx`.
- **CSS**: `html.lenis` and `.lenis.lenis-smooth` in `globals.css` for Lenis + ScrollTrigger.

## 4. Performance

- Hero video: `preload="metadata"`, poster, single source.
- Images: `next/image` with `sizes`; remotePatterns in `next.config.ts`.
- 3D: `dynamic(..., { ssr: false })`; Canvas `dpr={[1, 2]}`; no heavy models.
- Avoid CLS: reserve space for hero (min-h-screen), fixed nav height.
- 60fps: use `will-change` sparingly; prefer `transform`/`opacity`; Lenis + GSAP ticker single RAF.
