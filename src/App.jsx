import { useEffect, useMemo, useRef, useState } from 'react'
import Gem from './Gem.jsx'
import { profile, profilePhoto, about, highlights, skills, featured, projects, journey } from './data.js'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Projects' },
  { id: 'journey', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/* ───────── hooks ───────── */

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('tb-theme', theme)
    } catch (e) {
      /* storage unavailable */
    }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.in)')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ;['top', ...NAV.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return active
}

function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - innerHeight
      setP(h > 0 ? scrollY / h : 0)
    }
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return p
}

// 3D tilt that follows the pointer (skipped for touch and reduced motion)
function useTilt(max = 7) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(hover: none)').matches) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.setProperty('--rx', `${(0.5 - y) * max}deg`)
      el.style.setProperty('--ry', `${(x - 0.5) * max}deg`)
      el.style.setProperty('--gx', `${x * 100}%`)
      el.style.setProperty('--gy', `${y * 100}%`)
    }
    const leave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])
  return ref
}

/* ───────── icons ───────── */

const ICONS = {
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  external: <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  up: <path d="M12 19V5M5 12l7-7 7 7" />,
}
const Icon = ({ name, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONS[name]}
  </svg>
)

/* ───────── 2D: Big Hole contour lines behind the hero ───────── */

function Contours() {
  const paths = useMemo(() => {
    const out = []
    for (let i = 0; i < 14; i++) {
      const base = 40 + i * 26
      const pts = []
      const seed = i * 1.7
      for (let a = 0; a <= 64; a++) {
        const t = (a / 64) * Math.PI * 2
        const wob = Math.sin(t * 3 + seed) * (6 + i * 1.3) + Math.sin(t * 5 - seed * 0.6) * (3 + i * 0.6)
        const r = base + wob
        pts.push([400 + Math.cos(t) * r * 1.18, 400 + Math.sin(t) * r * 0.9])
      }
      out.push('M' + pts.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join('L') + 'Z')
    }
    return out
  }, [])
  return (
    <svg className="contours" viewBox="0 0 800 800" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {paths.map((d, i) => (
        <path key={i} d={d} style={{ '--i': i }} />
      ))}
    </svg>
  )
}

/* ───────── sections ───────── */

function Nav({ theme, toggle, active }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(scrollY > 12)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [open])
  return (
    <header className={`nav ${scrolled || open ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true" />
          Tumelo Bokote
        </a>
        <nav className={`links ${open ? 'open' : ''}`} aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'active' : ''} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <a className="btn btn-solid btn-sm nav-cta" href={`mailto:${profile.email}`}>Email me</a>
          <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <span className="theme-icon" key={theme}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </span>
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ theme }) {
  const [first, ...rest] = profile.name.split(' ')
  const last = rest.join(' ')
  return (
    <section className="hero" id="top">
      <Contours />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="status">
            <span className="dot" aria-hidden="true" />
            {profile.availability}
          </p>
          <h1 className="hero-name" aria-label={profile.name}>
            <span className="line" aria-hidden="true">
              {first.split('').map((c, i) => <span key={i} className="ch" style={{ '--d': i }}>{c}</span>)}
            </span>
            <span className="line" aria-hidden="true">
              {last.split('').map((c, i) => <span key={i} className="ch" style={{ '--d': i + first.length }}>{c}</span>)}
            </span>
          </h1>
          <p className="hero-role">
            {profile.role} <span className="muted">in {profile.location.split(',')[0]}, South Africa</span>
          </p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#work">See my projects</a>
            <a className="btn btn-ghost" href="#contact">Get in touch</a>
          </div>
          <div className="hero-social">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>
          </div>
        </div>
        <div className="hero-visual">
          <Gem theme={theme} />
          <p className="gem-caption">
            Kimberley, home of the Big Hole. <span className="muted">Drag the diamond.</span>
          </p>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to About"><span /></a>
    </section>
  )
}

function SectionHead({ title, intro }) {
  return (
    <div className="section-head" data-reveal>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}

function About() {
  const tilt = useTilt(10)
  return (
    <section id="about" className="section">
      <div className="wrap about-grid">
        <div className="portrait-wrap" data-reveal>
          <div className="portrait tilt" ref={tilt}>
            {profilePhoto ? (
              <img src={profilePhoto} alt={profile.name} />
            ) : (
              <div className="portrait-ph" role="img" aria-label={`${profile.name} (photo coming soon)`}>
                <span>TB</span>
              </div>
            )}
            <div className="shine" />
          </div>
          <p className="portrait-loc">
            <Icon name="pin" size={15} /> {profile.location}
          </p>
        </div>
        <div className="about-copy">
          <SectionHead title="From chemical engineering to code" />
          {about.map((p, i) => (
            <p key={i} data-reveal style={{ '--delay': `${i * 80}ms` }}>{p}</p>
          ))}
          <dl className="facts" data-reveal>
            {highlights.map((h) => (
              <div key={h.label}>
                <dt>{h.label}</dt>
                <dd>{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="wrap">
        <SectionHead title="What I work with" intro="Tools I use on real projects, grouped by where they sit in the stack." />
        <div className="skills">
          {skills.map((g, gi) => (
            <div className="skill-group" key={g.group} data-reveal style={{ '--delay': `${gi * 90}ms` }}>
              <h3>{g.group}</h3>
              <p className="muted">{g.note}</p>
              <ul>
                {g.items.map((s, i) => <li key={s} style={{ '--i': i }}>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectArt({ kind, title, seed = 0 }) {
  if (kind === 'map')
    return (
      <svg viewBox="0 0 400 250" className="art" aria-hidden="true">
        <rect width="400" height="250" className="art-bg" />
        <path d="M0 180 C80 150 140 210 220 170 S360 130 400 150 V250 H0Z" className="art-area" />
        {[40, 95, 150, 205].map((y) => <path key={y} d={`M0 ${y} Q200 ${y + 18} 400 ${y - 6}`} className="art-road" />)}
        {[60, 150, 250, 340].map((x) => <path key={x} d={`M${x} 0 Q${x + 14} 125 ${x - 8} 250`} className="art-road" />)}
        {[[110, 92], [210, 132], [300, 82], [170, 200], [330, 196]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className="art-pin" style={{ '--i': i }}>
              <path d="M0 0c-9-12-14-18-14-25a14 14 0 0 1 28 0c0 7-5 13-14 25z" />
              <circle cy="-25" r="5" className="art-pin-dot" />
            </g>
          </g>
        ))}
        <rect x="16" y="14" width="156" height="30" rx="15" className="art-chip" />
        <text x="32" y="34" className="art-text">Stores near you</text>
      </svg>
    )
  if (kind === 'course')
    return (
      <svg viewBox="0 0 400 250" className="art" aria-hidden="true">
        <rect width="400" height="250" className="art-bg" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${24 + i * 124} 36)`}>
            <rect width="108" height="134" rx="10" className="art-card" />
            <rect x="12" y="12" width="84" height="46" rx="6" className="art-area" />
            <rect x="12" y="70" width="70" height="8" rx="4" className="art-line" />
            <rect x="12" y="86" width="50" height="8" rx="4" className="art-line faint" />
            <rect x="12" y="112" width="84" height="6" rx="3" className="art-line faint" />
            <rect x="12" y="112" width={[84, 52, 22][i]} height="6" rx="3" className="art-progress" style={{ '--i': i }} />
          </g>
        ))}
        <rect x="24" y="192" width="220" height="12" rx="6" className="art-line" />
        <rect x="24" y="214" width="150" height="10" rx="5" className="art-line faint" />
      </svg>
    )
  return (
    <div className="art art-ph" aria-hidden="true" style={{ '--a': `${(seed * 47) % 180}deg`, '--px': `${(seed * 37) % 100}%` }}>
      <span>{title.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}</span>
    </div>
  )
}

function Featured({ p, i }) {
  const tilt = useTilt(5)
  const url = p.live || p.code
  return (
    <article className={`feature ${i % 2 ? 'flip' : ''}`} data-reveal>
      <a className="feature-media tilt" ref={tilt} href={url} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
        <div className="browser" aria-hidden="true">
          <i /><i /><i />
          <em>{url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</em>
        </div>
        <div className="feature-shot">
          {p.image ? <img src={p.image} alt={`Screenshot of ${p.title}`} /> : <ProjectArt kind={p.art} title={p.title} />}
        </div>
        <div className="shine" />
      </a>
      <div className="feature-copy">
        <p className="feature-tag">{p.tagline}</p>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <ul className="stack">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <div className="card-links">
          {p.live && (
            <a className="btn btn-solid btn-sm" href={p.live} target="_blank" rel="noreferrer">
              <Icon name="external" size={15} /> Live site
            </a>
          )}
          <a className="btn btn-ghost btn-sm" href={p.code} target="_blank" rel="noreferrer">
            <Icon name="github" size={15} /> Code
          </a>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ p, seed }) {
  const tilt = useTilt(8)
  return (
    <article className="card tilt" ref={tilt}>
      <div className="card-media">
        {p.image ? <img src={p.image} alt={`Screenshot of ${p.title}`} /> : <ProjectArt title={p.title} seed={seed} />}
      </div>
      <div className="card-body">
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <ul className="stack small">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <div className="card-links">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer"><Icon name="external" size={15} /> Live</a>
          )}
          <a href={p.code} target="_blank" rel="noreferrer"><Icon name="github" size={15} /> Code</a>
        </div>
      </div>
      <div className="shine" />
    </article>
  )
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live demos' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
]

function Work() {
  const [f, setF] = useState('all')
  const list = projects.filter((p) => (f === 'all' ? true : f === 'live' ? !!p.live : p.type === f))
  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHead title="Selected projects" intro="Three projects I would walk you through first, followed by everything else I have built." />
        <div className="features">
          {featured.map((p, i) => <Featured key={p.title} p={p} i={i} />)}
        </div>

        <div className="more-head" data-reveal>
          <h3>More projects <span className="count">{list.length}</span></h3>
          <div className="filters" role="group" aria-label="Filter projects">
            {FILTERS.map((x) => (
              <button key={x.id} aria-pressed={f === x.id} className={f === x.id ? 'on' : ''} onClick={() => setF(x.id)}>
                {x.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid" key={f}>
          {list.map((p, i) => (
            <div className="grid-item" key={p.title} style={{ '--i': i }}>
              <ProjectCard p={p} seed={projects.indexOf(p)} />
            </div>
          ))}
        </div>
        <p className="more-note" data-reveal>
          Python exercises, calculators and other Frontend Mentor challenges are on{' '}
          <a href={profile.github} target="_blank" rel="noreferrer">my GitHub</a>.
        </p>
      </div>
    </section>
  )
}

function Journey() {
  const ref = useRef(null)
  const [fill, setFill] = useState(0)
  useEffect(() => {
    const on = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setFill(Math.max(0, Math.min(1, (innerHeight * 0.65 - r.top) / r.height)))
    }
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <section id="journey" className="section section-alt">
      <div className="wrap narrow">
        <SectionHead title="Experience and education" intro="Most recent first." />
        <ol className="timeline" ref={ref} style={{ '--fill': fill }}>
          {journey.map((j) => (
            <li key={j.title} data-reveal className={j.kind}>
              <span className="node" aria-hidden="true" />
              <p className="period">{j.period}</p>
              <h3>{j.title}</h3>
              <p className="org">{j.org}</p>
              {j.points.length > 0 && (
                <ul>{j.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              )}
            </li>
          ))}
        </ol>
        <p className="refs" data-reveal>References are available on request.</p>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (e) {
      location.href = `mailto:${profile.email}`
    }
  }
  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <div className="contact-box" data-reveal>
          <h2>Let’s build something together</h2>
          <p>
            I’m looking for a software developer role where I can keep growing as a full-stack developer. If you’re hiring
            or have a project in mind, email is the quickest way to reach me.
          </p>
          <div className="email-row">
            <a className="email" href={`mailto:${profile.email}`}>{profile.email}</a>
            <button className="icon-btn" onClick={copy} aria-label="Copy email address">
              <Icon name={copied ? 'check' : 'copy'} />
            </button>
            <span className={`copied ${copied ? 'show' : ''}`} role="status">{copied ? 'Email copied' : ''}</span>
          </div>
          <div className="contact-links">
            <a href={profile.phoneHref}><Icon name="phone" /> {profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [theme, toggle] = useTheme()
  const active = useActiveSection()
  const progress = useScrollProgress()
  useReveal()
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <Nav theme={theme} toggle={toggle} active={active} />
      <main>
        <Hero theme={theme} />
        <About />
        <Skills />
        <Work />
        <Journey />
        <Contact />
      </main>
      <footer className="footer">
        <div className="wrap footer-inner">
          <p>© {new Date().getFullYear()} {profile.name}. Built with React and three.js.</p>
          <a href="#top" className="icon-btn" aria-label="Back to top"><Icon name="up" /></a>
        </div>
      </footer>
    </>
  )
}
