# Jingjie Li — personal website

A simple, responsive academic website with Bio and CV tabs. It is built with
React and Vite and deploys automatically to GitHub Pages.

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
