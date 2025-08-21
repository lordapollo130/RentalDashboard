## Secure Stay Dashboard (Next.js 14)

### Getting Started

1. Install dependencies:

   - `npm install`

2. Set environment:

   - Create a `.env.local` file and set:
     - `NEXT_PUBLIC_BACKEND_URL=http://localhost:5173`

3. Run the dev server:
   - `npm run dev`
   - App runs at `http://localhost:3000`

### Notes

- App Router (`src/app`) is used. Route wrappers are Server Components; interactive UI lives in Client Components with `"use client"`.
- Global API helper in `src/lib/api.ts` handles fetch with `cache: "no-store"` and typed responses.
- Environment access via `src/lib/env.ts`.
- Tailwind and Forms plugin are enabled. Global styles in `src/styles/globals.css`.
