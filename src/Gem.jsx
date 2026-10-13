import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// A faceted, brilliant-cut diamond — a nod to Kimberley and the Big Hole.
// It turns slowly, leans toward the pointer, and can be dragged to spin.
const PALETTE = {
  dark: { body: 0xa8e4ea, edge: 0xe2b35c, dust: 0xcfe9ea, rim: 0xe2b35c, fill: 0x4fb3c2, glow: 0x0d3a42, amb: 0.35 },
  light: { body: 0xd9f1f4, edge: 0x9a6a1c, dust: 0x2e6c78, rim: 0xe8b25a, fill: 0x7cc4cf, glow: 0x4d8f99, amb: 0.9 },
}

export default function Gem({ theme }) {
  const mount = useRef(null)
  const api = useRef(null)

  useEffect(() => {
    const el = mount.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0.4, 7)

    // Brilliant-cut profile: culet → pavilion → girdle → crown → table
    const profile = [
      new THREE.Vector2(0.001, -1.45),
      new THREE.Vector2(1.35, 0.0),
      new THREE.Vector2(1.35, 0.1),
      new THREE.Vector2(0.95, 0.55),
      new THREE.Vector2(0.62, 0.72),
      new THREE.Vector2(0.001, 0.72),
    ]
    const geo = new THREE.LatheGeometry(profile, 12).toNonIndexed()
    geo.computeVertexNormals()

    const bodyMat = new THREE.MeshPhysicalMaterial({
      flatShading: true,
      metalness: 0.15,
      roughness: 0.08,
      clearcoat: 1,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    })
    const gem = new THREE.Mesh(geo, bodyMat)

    const edgeMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.9 })
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 1), edgeMat)

    const group = new THREE.Group()
    group.add(gem, edges)
    group.rotation.x = 0.35
    scene.add(group)

    // Diamond dust
    const count = 260
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2.6
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(p) * Math.cos(t)
      pos[i * 3 + 1] = r * Math.cos(p) * 0.6
      pos[i * 3 + 2] = r * Math.sin(p) * Math.sin(t)
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const dustMat = new THREE.PointsMaterial({ size: 0.035, transparent: true, opacity: 0.7, depthWrite: false })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    const key = new THREE.DirectionalLight(0xffffff, 2.2)
    key.position.set(3, 4, 5)
    const rim = new THREE.PointLight(0xffffff, 30, 20)
    rim.position.set(-4, 1, -2)
    const fill = new THREE.PointLight(0xffffff, 18, 20)
    fill.position.set(2, -3, 3)
    const amb = new THREE.AmbientLight(0xffffff, 0.35)
    scene.add(key, rim, fill, amb)

    const setTheme = (t) => {
      const c = PALETTE[t] || PALETTE.dark
      bodyMat.color.setHex(c.body)
      edgeMat.color.setHex(c.edge)
      dustMat.color.setHex(c.dust)
      rim.color.setHex(c.rim)
      fill.color.setHex(c.fill)
      bodyMat.emissive.setHex(c.glow)
      amb.intensity = c.amb
      bodyMat.opacity = t === 'light' ? 0.96 : 0.88
    }
    api.current = { setTheme }
    setTheme(document.documentElement.getAttribute('data-theme'))

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.position.z = width < 420 ? 7.4 : 6.2
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    // Pointer lean + drag to spin
    const target = { x: 0, y: 0 }
    let spin = 0
    let dragging = false
    let lastX = 0
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.6
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 0.4
      if (dragging) {
        spin += (e.clientX - lastX) * 0.0025
        lastX = e.clientX
      }
    }
    const onDown = (e) => {
      dragging = true
      lastX = e.clientX
      el.setPointerCapture?.(e.pointerId)
    }
    const onUp = () => (dragging = false)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(el)

    let raf
    const clock = new THREE.Clock()
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.elapsedTime
      spin *= 0.94
      group.rotation.y += (reduce ? 0.02 : 0.25) * dt + spin
      group.rotation.x += (0.35 + target.y - group.rotation.x) * 0.05
      group.rotation.z += (-target.x * 0.5 - group.rotation.z) * 0.05
      group.position.y = reduce ? 0 : Math.sin(t * 0.8) * 0.08
      dust.rotation.y = t * (reduce ? 0 : 0.03)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      geo.dispose()
      dustGeo.dispose()
      edges.geometry.dispose()
      bodyMat.dispose()
      edgeMat.dispose()
      dustMat.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  useEffect(() => {
    api.current?.setTheme(theme)
  }, [theme])

  return (
    <div
      ref={mount}
      className="gem"
      role="img"
      aria-label="A rotating 3D diamond, a nod to Kimberley. Drag to spin it."
    />
  )
}
