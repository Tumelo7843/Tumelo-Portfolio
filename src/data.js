// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no need to touch the components.
// ─────────────────────────────────────────────────────────────
import weatherImg from './assets/weather.jpg'
import newsImg from './assets/news.jpg'
import socialImg from './assets/social.jpg'
import scrapeImg from './assets/scrape.jpg'
import storeDashImg from './assets/storeDash.png'
import mntungwaImg from './assets/mntungwa.png'
import movieImg from './assets/movie update.png'
import universityImg from './assets/project univercity.png'
import interactiveShapesImg from './assets/interactive shapes.png'
import todoImg from './assets/to do list.png'
import todoSqlImg from './assets/to-do-list-sql.png'
import profileImg from './assets/tumelo bokote.jpeg'

// Set to an imported image (e.g. `import me from './assets/me.jpg'`) to replace the placeholder.
export const profilePhoto = profileImg

export const profile = {
  name: 'Tumelo Bokote',
  role: 'Software Developer',
  location: 'Kimberley, Northern Cape, South Africa',
  intro:
    'I build responsive, full-stack web apps with React, Node.js and Supabase, from the interface people use to the API and database behind it.',
  availability: 'Open to software developer roles',
  email: 'bokotemargin@gmail.com',
  phone: '065 985 9423',
  phoneHref: 'tel:+27659859423',
  linkedin: 'https://linkedin.com/in/tumelo-bokote',
  github: 'https://github.com/Tumelo7843',
}

export const about = [
  'I studied Chemical Engineering at the Cape Peninsula University of Technology, where I learned to break big systems into processes, measure them, and improve them one step at a time. I now apply that same thinking to software.',
  'Before moving into development full time, I spent a year and a half in administration support at the Emergency Medical Care Services College, supporting HR system operations, performance management and skills audits, and improving how the college ran day to day.',
  'In 2025 I was selected for the mLab CodeTribe software development programme in Kimberley. Since then I have shipped a multi-store marketplace, a learning management system and a string of smaller front-end projects.',
]

export const highlights = [
  { label: 'Current programme', value: 'mLab CodeTribe' },
  { label: 'Focus', value: 'Front-end + APIs' },
  { label: 'Languages spoken', value: 'English, Setswana, Afrikaans' },
]

export const skills = [
  {
    group: 'Front-end',
    note: 'Where I am strongest',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'Responsive design', 'Vite'],
  },
  {
    group: 'Back-end & data',
    note: 'APIs, auth and storage',
    items: ['Node.js', 'Express', 'Python', 'REST APIs', 'PostgreSQL', 'SQL', 'Supabase', 'Firebase Auth'],
  },
  {
    group: 'Tools & workflow',
    note: 'How I ship',
    items: ['Git & GitHub', 'Vercel', 'GitHub Pages', 'Web scraping', 'React Native (Expo)', 'MS Office & Access'],
  },
]

// type: 'react' | 'javascript' | 'python' — used by the project filter
export const featured = [
  {
    title: 'StoreDash',
    tagline: 'Multi-store marketplace and store locator',
    description:
      'A platform for South African businesses: customers find nearby stores on a map, browse products and place orders, while store owners manage stock, services and orders from their own dashboard. One API, database and login system serves the website, the admin dashboard and a mobile app.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Express', 'PostgreSQL', 'Firebase Auth', 'Leaflet', 'Expo'],
    live: 'https://storedash-store-locator-admin-custo.vercel.app',
    code: 'https://github.com/Tumelo7843/storedash-store-locator---admin',
    image: storeDashImg,
    art: 'map',
  },
  {
    title: 'Mntungwa LMS',
    tagline: 'Learning management system',
    description:
      'The learner-facing side of a learning platform: public website, course catalogue, registration, a learner portal with lessons and assessments, submissions, results and certificates. Built alongside a separate admin app and back end.',
    stack: ['React', 'React Router', 'Supabase', 'Vercel'],
    live: 'https://mntungwa-chi.vercel.app',
    code: 'https://github.com/Tumelo7843/Mntungwa',
    image: mntungwaImg,
    art: 'course',
  },
  {
    title: 'Weather App',
    tagline: 'City forecasts from OpenWeatherMap',
    description:
      'Search any city for current conditions, an hourly forecast and a 7-day outlook. A small Express server keeps the API key off the client and passes requests through to OpenWeatherMap.',
    stack: ['JavaScript', 'Node.js', 'Express', 'OpenWeatherMap API'],
    live: 'https://tumelo7843.github.io/Weather-App/',
    code: 'https://github.com/Tumelo7843/Weather-App',
    image: weatherImg,
  },
]

export const projects = [
  {
    title: 'Takealot price scraper',
    description: 'Python scripts that collect cellphone, TV and book listings from Takealot and chart brand counts and price distributions.',
    stack: ['Python', 'BeautifulSoup', 'Matplotlib'],
    type: 'python',
    code: 'https://github.com/Tumelo7843/webscraping-takealot-items',
    image: scrapeImg,
  },
  {
    title: 'Movie Update',
    description: 'Pulls the current popular movies from The Movie Database (TMDB) API and shows them as a browsable grid, with a reload button for fresh results.',
    stack: ['HTML', 'CSS', 'JavaScript', 'TMDB API'],
    type: 'javascript',
    live: 'https://tumelo7843.github.io/movie-update/',
    image: movieImg,
    code: 'https://github.com/Tumelo7843/movie-update',
  },
  {
    title: 'Social media dashboard',
    description: 'A follower and engagement dashboard with a light and dark theme switcher.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'javascript',
    live: 'https://tumelo7843.github.io/social-media-dashboard-with-theme-switcher/',
    code: 'https://github.com/Tumelo7843/social-media-dashboard-with-theme-switcher',
    image: socialImg,
  },
  {
    title: 'News homepage',
    description: 'A responsive news homepage with a mobile menu, built from a Frontend Mentor design.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'javascript',
    live: 'https://tumelo7843.github.io/news-homepage/',
    code: 'https://github.com/Tumelo7843/news-homepage',
    image: newsImg,
  },
  {
    title: 'Priority to-do list',
    description: 'A to-do list where each task is tagged high, medium or low priority.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'javascript',
    live: 'https://tumelo7843.github.io/priority-to-do-list/',
    image: todoImg,
    code: 'https://github.com/Tumelo7843/priority-to-do-list',
  },
  {
    title: 'KB Quiz',
    description: 'A browser quiz that scores your answers when you submit.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'javascript',
    live: 'https://tumelo7843.github.io/KBquiez/',
    code: 'https://github.com/Tumelo7843/KBquiez',
  },
  {
    title: 'University application',
    description: 'A portal that lists South African universities by province, as a starting point for a centralised university application.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'javascript',
    live: 'https://project-uni-application.vercel.app/https://project-uni-application.vercel.app/',
    image: universityImg,
    code: 'https://github.com/Tumelo7843/project-uni-application',
  },
  {
    title: 'Interactive shapes',
    description: 'Interactive SVG shapes, canvas drawings (sun, star, abstract patterns) and a clickable venue seating map.',
    stack: ['HTML', 'CSS', 'JavaScript', 'SVG', 'Canvas'],
    type: 'javascript',
    live: 'https://tumelo7843.github.io/Interactive-shapes/',
    image: interactiveShapesImg,
    code: 'https://github.com/Tumelo7843/Interactive-shapes',
  },
  {
    title: 'To-do list (SQL)',
    description: 'A simple to-do list for adding and tracking tasks.',
    stack: ['HTML', 'CSS'],
    type: 'javascript',
    live: 'https://tumelo7843.github.io/to-do-list-sql/',
    image: todoSqlImg,
    code: 'https://github.com/Tumelo7843/to-do-list-sql',
  },
  {
    title: 'Budget tracker',
    description: 'Add income and expense items and see your totals and net income update.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    type: 'javascript',
    code: 'https://github.com/Tumelo7843/budget-web',
  },
  // Private or empty repos — add details and uncomment when ready:
  // { title: 'Library management system', description: '', stack: [], type: 'javascript', code: 'https://github.com/Tumelo7843/library-management-system' },
  // { title: 'Portfolio Platform', description: '', stack: [], type: 'react', code: 'https://github.com/Tumelo7843/Portfolio-Platform' },
  // { title: 'amsite', description: '', stack: [], type: 'javascript', code: 'https://github.com/Tumelo7843/amsite' },
  // { title: 'Vanquish Travel', description: '', stack: [], type: 'javascript', code: 'https://github.com/Tumelo7843/vanquishTravel' },
]

// Newest first
export const journey = [
  {
    period: 'Apr 2025 – Present',
    title: 'Software Developer, CodeTribe',
    org: 'mLab, Kimberley',
    kind: 'work',
    points: [
      'Selected for the mLab CodeTribe software development programme.',
      'Building full-stack apps with React, Node.js, PostgreSQL and Supabase, including StoreDash and Mntungwa LMS.',
    ],
  },
  {
    period: 'Jun 2023 – Jan 2025',
    title: 'Administration Support',
    org: 'Emergency Medical Care Services College, Kimberley',
    kind: 'work',
    points: [
      'Supported HR system operations, performance management (PMDS) and the skills audit.',
      'Maintained the archive room and managed the printer room.',
      'Improved the college’s operational infrastructure.',
    ],
  },
  {
    period: '2019 – 2022',
    title: 'Chemical Engineering',
    org: 'Cape Peninsula University of Technology, Cape Town',
    kind: 'study',
    points: ['Process thinking, problem solving and working with data.'],
  },
  {
    period: '2014 – 2018',
    title: 'Senior Certificate',
    org: 'Emang Mmogo Comprehensive School, Kimberley',
    kind: 'study',
    points: [],
  },
]
