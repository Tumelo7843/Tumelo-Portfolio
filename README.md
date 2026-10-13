# Tumelo Bokote — Developer Portfolio

A personal portfolio website for **Tumelo Bokote**, a software developer based in Kimberley, South Africa. The site introduces Tumelo, shares his background and technical skills, and brings together selected web development projects with screenshots, technology stacks, live demos and source code links.

## Website overview

The portfolio is a responsive, single-page website built with React and Vite. It includes:

- An introduction, availability, and contact links
- About, skills, and professional journey sections
- Featured projects and a filterable project gallery
- Project screenshots and links to live sites and GitHub repositories
- Dark and light themes, with a small interactive 3D visual

## Featured work

- **StoreDash:** A multi-store marketplace and store locator for South African businesses.
- **Mntungwa LMS:** A learning platform with course browsing, learner registration, lessons, assessments, results, and certificates.
- **Weather App:** City forecasts and outlooks powered by OpenWeatherMap through an Express server.

The project gallery also includes a Takealot price scraper, Movie Update, a social media dashboard, a news homepage, to-do apps, a university application portal, and interactive shapes.

## Tech stack

React 19, Vite, JavaScript, CSS, and Three.js. The portfolio is a static frontend; its featured projects link to their own deployed websites and repositories.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Update portfolio content

Edit `src/data.js` to change the bio, skills, projects, contact details, and experience. Project screenshots are imported from `src/assets/` and assigned with each item's `image` property. The profile portrait is set through `profilePhoto` in the same file.

## Deploy to Vercel

This repository is configured as a Vite static site. Import the repository into Vercel and use these project settings (also recorded in `vercel.json`):

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install` (Vercel's default)

No environment variables are required for the portfolio site. Each deployment builds the site from the repository, and Vite outputs the deployable files to `dist/`.

To make and preview a production build locally:

```bash
npm run build
npm run preview
```

## Other build options

- `npm run lint` checks source files with oxlint.
- `npm run build:single` builds a self-contained HTML version in `dist-single/`.
