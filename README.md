# Forma — Sunday sofa studio

A responsive furniture brand website with an interactive sofa gallery, three upholstery finishes, material studies, and a zoomable detail viewer.

## Get started

Use Node.js 24 LTS and npm. Dependencies are pinned in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. No API keys or environment variables are required for the current site.

## Check and build

```sh
npm test
npm run build
npm start
```

`npm start` previews the built Cloudflare Worker locally. Run the build first.

## Stack

React 19, TypeScript, Vinext/Vite, Tailwind CSS, Base UI/shadcn primitives, Embla Carousel, and Lucide icons. This project uses a Cloudflare Worker runtime and Sites hosting; it is not a plain HTML export and cannot be published directly with GitHub Pages. Pushing to GitHub stores the source and does not publish the website.

## Source map

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Homepage sections and copy |
| `app/globals.css` | Typography, colors, layout, and responsive styles |
| `app/product-studio.tsx` | Gallery, finishes, dimensions, and detail viewer |
| `app/sofa-details.tsx` | Product notes and care accordion |
| `app/page-motion.tsx` | Scroll reveals and reading progress |
| `app/site-icon.tsx` | Shared Lucide icon mapping |
| `app/layout.tsx` | Page metadata and document structure |
| `lib/viewer-math.ts` | Zoom and pan bounds |
| `tests/viewer-math.test.ts` | Viewer boundary tests |
| `public/` | Bundled images, fonts, favicon, and credits |
| `vite.config.ts` | Development and Worker build configuration |
| `.openai/hosting.json` | Existing Sites association and binding declarations |

Keep `.openai/hosting.json`: the Vite configuration imports it. Its project ID is an association identifier, not an authentication credential. Publishing to that Site still requires authorized access.

## GitHub handoff

The source ZIP includes the current code and assets, without Git history, dependencies, local caches, or build output. Extract it into an empty directory for a fresh GitHub repository, then run:

```sh
git init
git add .
git commit -m "Initial Forma website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Create an empty GitHub repository first and replace the URL with your repository URL. These instructions are for the extracted ZIP; the original working folder already has Git history and a Sites source remote.

`.gitignore` excludes local environment files, dependencies, generated output, caches, and handoff archives. Never commit access tokens or private keys.

## Design and interaction

Warm eggshell and taupe surfaces, an Instrument Serif hero headline, Inter body text, thin Lucide icons, and black actions. The gallery supports swiping, Sage/Oat/Ink finishes, dimensions, and image zoom with bounded panning. The material image follows the selected finish. Motion respects reduced-motion preferences.

In the detail viewer, use + / − to zoom, arrow keys to pan, Home to reset, and Escape to close. Product views are photographs and crops, not a 3D model.

## Content and credits

Forma and Sunday are concept branding. Product dimensions and descriptions are illustrative. The site has no checkout or order processing. Photography was generated for this concept and is bundled locally.

Third-party notices are retained in `public/credits.html`, `public/licenses/lucide.txt`, `public/fonts/OFL.txt`, and `public/fonts/instrument-serif-OFL.txt`. Inter and Instrument Serif use the SIL Open Font License; Lucide uses the ISC license. No additional license is assigned to the custom site code by this handoff.
