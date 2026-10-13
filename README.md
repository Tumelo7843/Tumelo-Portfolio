# Tumelo Bokote — Portfolio

React + Vite + three.js.

## Run locally
```bash
npm install
npm run dev
```

## Edit content
Everything (bio, skills, projects, experience, contact) lives in `src/data.js`.

**Add your photo:** put it in `src/assets/` (e.g. `me.jpg`), then in `src/data.js`:
```js
import me from './assets/me.jpg'
export const profilePhoto = me
```

**Add a project screenshot:** import the image at the top of `src/data.js` and set `image:` on that project.
StoreDash and Mntungwa currently show illustrated placeholders (`art: 'map'` / `art: 'course'`); set `image` to replace them.

## Deploy
- **Vercel / Netlify:** import the repo — build command `npm run build`, output folder `dist`.
- **GitHub Pages:** `npm run build`, then publish the `dist` folder.
- `npm run build:single` makes one self-contained `dist-single/index.html`.
