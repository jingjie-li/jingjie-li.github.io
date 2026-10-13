# Jingjie Li — personal website

A simple, responsive academic website with Bio, My works, and CV tabs. It is built with
React and Vite and deploys automatically to GitHub Pages.

## Edit the website content

All regularly edited copy lives in the following content files:

- `src/content/bio.en.md` — English Bio
- `src/content/bio.zh.md` — Chinese Bio
- `src/content/cv.md` — English CV
- `src/content/works.ts` — research project titles, descriptions, figures, and links

Project figures and the five-second 3D posture GIF live in `public/works/`.
The GIF uses seconds 6–11 of `demo_3d_rig_frame_115014.mp4`, resized to
960 × 540 at 15 frames per second. The source video is preserved.

The fields between the two `---` lines control names, labels, contact details,
page metadata, and research-interest tags. In the Bio files, the opening
paragraphs form the brief background beside the portrait. Each `##` heading
creates a research box, except `## News`, whose `### Date` entries create the
milestone list. Put news entries in the order you want them displayed (newest
first). Keep the `## News` heading in English in both language files; its visible
label comes from `newsLabel` in the metadata.

The CV uses this repeatable structure:

```md
## Section name

### Date
#### Entry title

Description with **bold text**, *italics*, and [links](https://example.com).
```

Copy an existing entry when adding a publication, presentation, award, or other
item. Keep the heading levels (`##`, `###`, and `####`) unchanged so the site can
place the content correctly.

## Prerequisites

- Node.js 20 or newer
- pnpm

## Quick Start

```bash
pnpm install
pnpm dev
pnpm build
```

## Publish

Push the `main` branch to GitHub. The workflow in `.github/workflows/deploy.yml`
builds the site and publishes it to GitHub Pages. In the repository settings,
set **Pages → Build and deployment → Source** to **GitHub Actions**.
