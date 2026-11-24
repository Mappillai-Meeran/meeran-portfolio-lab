import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Sun, Moon, Menu, X, MapPin, Code2, Layers3, BriefcaseBusiness, GraduationCap, ExternalLink } from "lucide-react";
import * as THREE from "three";

type Theme = "light" | "dark";

function Orb({ dark }: { dark: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.13;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.24) * 0.12;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.22} floatIntensity={0.55}>
      <mesh ref={mesh} scale={1.72}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color={dark ? "#91a9b5" : "#c98d56"}
          roughness={dark ? 0.23 : 0.32}
          metalness={dark ? 0.42 : 0.12}
          distort={0.32}
          speed={1.7}
        />
      </mesh>
    </Float>
  );
}

function HeroScene({ dark }: { dark: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 5.4], fov: 38 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={dark ? 1.2 : 1.7} />
      <directionalLight position={[3, 4, 5]} intensity={dark ? 2.4 : 2.8} color={dark ? "#c5d9e8" : "#fff0ce"} />
      <pointLight position={[-3, -2, 2]} intensity={dark ? 13 : 8} color={dark ? "#7898b4" : "#e8a66d"} />
      <Orb dark={dark} />
      <Sparkles count={dark ? 42 : 26} scale={5.2} size={2.1} speed={0.24} opacity={dark ? 0.55 : 0.32} color={dark ? "#d8e8f4" : "#c58e5d"} />
    </Canvas>
  );
}

const projects = [
  {
    number: "01", name: "Nirvaha", type: "Civic technology · In progress",
    description: "A civic intelligence platform designed to carry public reports from submission to verified resolution, with a focus on drainage and waterlogging in Puducherry.",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "PostGIS", "Python AI service"],
    accent: "sage", href: "https://github.com/Mappillai-Meeran"
  },
  {
    number: "02", name: "SentinelGrid", type: "Full-stack application",
    description: "A role-aware reservation and operations platform built around structured workflows, access control and a dependable backend.",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "Redis", "Docker"],
    accent: "clay", href: "https://github.com/Mappillai-Meeran"
  },
  {
    number: "03", name: "CrimeLens OS", type: "AI · Civic safety",
    description: "A crime-intelligence concept exploring cross-complaint pattern discovery, Kannada-language workflows and structured police-memory support.",
    stack: ["React", "Gemini", "AI workflows", "Data analysis"],
    accent: "blue", href: "https://github.com/Mappillai-Meeran"
  },
  {
    number: "04", name: "INAI", type: "Peer learning platform",
    description: "A peer-learning and knowledge-sharing platform that helps students connect through skills, academic interests and mutual acceptance.",
    stack: ["Node.js", "Express", "MongoDB", "JavaScript"],
    accent: "sand", href: "https://github.com/Mappillai-Meeran"
  },
  {
    number: "05", name: "Tri9T AI", type: "Document intelligence",
    description: "An AI-assisted PDF processing tool built to extract and structure information from documents.",
    stack: ["FastAPI", "PyMuPDF", "SQLAlchemy", "Gemini"],
    accent: "lilac", href: "https://github.com/Mappillai-Meeran"
  },
  {
    number: "06", name: "Keyboard DNA", type: "Creative web experiment",
    description: "A browser-based experiment that turns keyboard interaction into a visual and audio experience using native web APIs.",
    stack: ["JavaScript", "Canvas", "Web Audio API"],
    accent: "peach", href: "https://github.com/Mappillai-Meeran"
  }
];

const skills = [
  { title: "Backend", items: ["Java", "Spring Boot", "Node.js", "Express", "REST APIs"] },
  { title: "Frontend", items: ["React", "JavaScript", "TypeScript", "HTML", "CSS"] },
  { title: "Data & tools", items: ["PostgreSQL", "MongoDB", "Redis", "Git", "Docker"] },
  { title: "Exploring", items: ["System design", "AI integration", "Cloud deployment", "PostGIS"] }
];

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("meeran-theme");
    return saved === "dark" ? "dark" : "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const dark = theme === "dark";
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 90]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("meeran-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => current === "light" ? "dark" : "light");
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className="topbar">
        <a className="wordmark" href="#home" onClick={closeMenu}>MM<span>.</span></a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {[["About", "#about"], ["Work", "#work"], ["Skills", "#skills"], ["Journey", "#journey"], ["Contact", "#contact"]].map(([label, href]) =>
            <a key={label} href={href} onClick={closeMenu}>{label}</a>
          )}
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}<span>{dark ? "Daylight" : "Nightfall"}</span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.div initial="hidden" animate="visible" variants={reveal} className="eyebrow"><span className="status-dot" /> AVAILABLE FOR INTERNSHIP OPPORTUNITIES</motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.08 }}>
              I build software<br />with <em>purpose</em> & clarity.
            </motion.h1>
            <motion.p className="hero-intro" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.16 }}>
              I'm Mappillai Meeran — an MCA student and developer interested in backend engineering, useful products and the details that make software work well.
            </motion.p>
            <motion.div className="hero-buttons" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.24 }}>
              <a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={16} /></a>
              <a className="text-link" href="#contact">Let's connect <ArrowDown size={15} /></a>
            </motion.div>
            <motion.div className="hero-meta" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.32 }}>
              <span><MapPin size={14} /> Puducherry, India</span><span className="meta-divider" /><span>Java · Backend · Full-stack</span>
            </motion.div>
          </div>
          <motion.div className="hero-art" style={{ y: heroY }}>
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="scene-frame"><HeroScene dark={dark} /><span className="scene-caption">A LITTLE CURIOSITY, A LOT OF BUILDING.</span></div>
            <div className="floating-note note-top"><span className="note-kicker">CURRENT FOCUS</span><strong>Backend systems</strong><span>Java / Spring Boot</span></div>
            <div className="floating-note note-bottom"><span className="note-kicker">ALWAYS LEARNING</span><strong>Build · Learn · Improve</strong></div>
            <div className="sun-disc" />
          </motion.div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        </section>

        <section className="intro-strip">
          <div className="section-wrap strip-inner"><span className="strip-label">A NOTE ON HOW I WORK</span><p>Curious by default. Practical by choice. I enjoy turning a rough idea into something people can actually use.</p></div>
        </section>

        <section className="content-section section-wrap" id="about">
          <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <span className="section-index">01 / ABOUT</span><h2>Engineering is a craft.<br /><em>I'm here to get better at it.</em></h2>
          </motion.div>
          <div className="about-grid">
            <motion.div className="about-main" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
              <p className="large-copy">I'm currently pursuing my Master of Computer Applications at Sri Manakula Vinayagar Engineering College.</p>
              <p>My core interest is Java and backend development. I like understanding how applications are structured — from APIs and databases to authentication, performance and deployment. I also work across the frontend when a project needs a complete experience.</p>
              <p>I learn best by building. Each project is a chance to test an idea, make trade-offs and understand what it takes to move from a working demo to a dependable product.</p>
            </motion.div>
            <motion.aside className="about-aside" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
              <div className="aside-rule" /><span className="note-kicker">WHAT MATTERS TO ME</span>
              <div className="value-line"><Code2 size={18} /><span>Readable, maintainable code</span></div>
              <div className="value-line"><Layers3 size={18} /><span>Thoughtful system design</span></div>
              <div className="value-line"><BriefcaseBusiness size={18} /><span>Solving practical problems</span></div>
            </motion.aside>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-wrap">
            <motion.div className="section-heading work-heading" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
              <span className="section-index">02 / SELECTED WORK</span><h2>Things I've been<br /><em>putting together.</em></h2><p>A selection of projects across backend systems, civic technology and creative experiments.</p>
            </motion.div>
            <div className="project-grid">
              {projects.map((project) => (
                <motion.article className={`project-card ${project.accent}`} key={project.number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={reveal} whileHover={{ y: -7 }} transition={{ duration: 0.3 }}>
                  <div className="project-top"><span>{project.number} / 06</span><a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`}><ArrowUpRight size={18} /></a></div>
                  <div className="project-visual"><div className="visual-shape"><span>{project.name.slice(0, 1)}</span></div><div className="visual-orbit" /></div>
                  <div className="project-info"><span className="project-type">{project.type}</span><h3>{project.name}</h3><p>{project.description}</p><div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                </motion.article>
              ))}
            </div>
            <p className="project-footnote">Project descriptions reflect current scope and implementation. More technical details and repositories can be added as each project is published.</p>
          </div>
        </section>

        <section className="content-section section-wrap" id="skills">
          <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
            <span className="section-index">03 / TOOLKIT</span><h2>Tools I use to<br /><em>make things work.</em></h2>
          </motion.div>
          <div className="skills-grid">
            {skills.map((group, i) => <motion.div className="skill-group" key={group.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ delay: i * 0.06 }}>
              <span className="skill-number">0{i + 1}</span><h3>{group.title}</h3><div className="skill-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </motion.div>)}
          </div>
        </section>

        <section className="journey-section" id="journey">
          <div className="section-wrap journey-grid">
            <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
              <span className="section-index">04 / THE JOURNEY</span><h2>Learning, building<br /><em>and showing up.</em></h2>
            </motion.div>
            <div className="timeline">
              <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
                <span className="timeline-date">2025 — 2027</span><div><GraduationCap size={19} /><h3>Master of Computer Applications</h3><p>Sri Manakula Vinayagar Engineering College · Puducherry</p><span className="timeline-detail">Currently pursuing</span></div>
              </motion.div>
              <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
                <span className="timeline-date">2022 — 2025</span><div><GraduationCap size={19} /><h3>B.Sc. Computer Science</h3><p>SIGA College of Management and Computer Science</p><span className="timeline-detail">Completed · 80%</span></div>
              </motion.div>
              <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
                <span className="timeline-date">JUN — JUL 2025</span><div><BriefcaseBusiness size={19} /><h3>Front-End Development Internship</h3><p>CODTECH · Hyderabad</p><span className="timeline-detail">Project-based internship experience</span></div>
              </motion.div>
              <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
                <span className="timeline-date">RECOGNITION</span><div><span className="award-mark">✳</span><h3>VBYLD ’25 — State Champion</h3><p>State-level recognition and national-level participation.</p></div>
              </motion.div>
              <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
                <span className="timeline-date">2026</span><div><span className="award-mark">✳</span><h3>VBYLD ’27 — Essay Stage</h3><p>Selected among 1,000 Puducherry students following the quiz stage.</p></div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <motion.div className="contact-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
            <span className="section-index">05 / CONTACT</span><div className="contact-spark">✳</div>
            <h2>Have something<br />good to <em>build?</em></h2>
            <p>I'm open to conversations about software development, internships and ideas worth exploring.</p>
            <div className="contact-actions">
              <a className="button button-primary" href="https://www.linkedin.com/in/mappillai-meeran/" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={16} /></a>
              <a className="button button-outline" href="https://github.com/Mappillai-Meeran" target="_blank" rel="noreferrer">View GitHub <Github size={16} /></a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer section-wrap"><a className="wordmark" href="#home">MM<span>.</span></a><span>Designed with care. Built to keep learning.</span><div className="footer-socials"><a href="https://github.com/Mappillai-Meeran" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href="https://www.linkedin.com/in/mappillai-meeran/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="#home" aria-label="Back to top"><ExternalLink size={16} /></a></div></footer>
    </div>
  );
}