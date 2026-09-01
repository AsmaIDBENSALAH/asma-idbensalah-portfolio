import { useState, useEffect, useRef, type FormEvent, type ReactNode } from 'react'
import {
  Mail, Download, ArrowRight, ExternalLink,
  Code2, Server, Database, Cloud, Wrench, Menu, X, Moon, Sun,
  Award, Zap, CheckCircle2, MapPin, Send, ChevronRight,
} from 'lucide-react'

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible] as const
}

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let current = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <FadeIn className="mb-16 text-center">
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-olive mb-3">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </FadeIn>
  )
}

function Tag({ label, variant = 'default' }: { label: string; variant?: 'default' | 'olive' | 'dark' }) {
  const styles = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300',
    olive: 'bg-olive-50 dark:bg-olive/15 text-olive dark:text-olive-light',
    dark: 'bg-gray-900 dark:bg-white text-white dark:text-gray-900',
  }
  return (
    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${styles[variant]}`}>
      {label}
    </span>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const skillCategories = [
  {
    name: 'Backend',
    Icon: Server,
    accent: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    skills: ['Java', 'Spring Boot', 'Spring Security', 'Spring Cloud', 'REST APIs', 'Microservices', 'Kafka', 'JWT', 'Keycloak'],
  },
  {
    name: 'Frontend',
    Icon: Code2,
    accent: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    skills: ['React', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    name: 'Databases',
    Icon: Database,
    accent: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    name: 'DevOps & Cloud',
    Icon: Cloud,
    accent: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    skills: ['Docker', 'Git', 'GitHub', 'CI/CD', 'Linux'],
  },
  {
    name: 'Tools',
    Icon: Wrench,
    accent: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    skills: ['IntelliJ IDEA', 'VS Code', 'Postman', 'Maven', 'Jira'],
  },
]

const experiences = [
  {
    title: 'Software & Support Engineer Intern',
    company: 'RALYdev Technology',
    period: '2025',
    description:
      'Developed a web application for managing the temporary import lifecycle, including case files, DUMs, and transfers. Designed and implemented the application using Spring Boot, React.js, and TypeScript, while managing the MySQL database and implementing business workflows to streamline and automate operational processes.',
    skills: ['Spring Boot', 'React', 'TypeScript', 'MySQL', 'REST APIs', 'Technical Support'],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Prefecture of Agadir Ida Outanane',
    period: '2024',
    description:
      'Designed and built a territorial data collection platform for public administration. Implemented dynamic forms, geospatial data views, role-based access control, and admin dashboards to streamline regional data management.',
    skills: ['Spring Boot', 'Angular', 'MySQL', 'REST APIs'],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'DeapLeaf',
    period: '2023',
    description:
      'Final-Year Project Intern (PFA) at DeepLeaf, responsible for developing a WhatsApp chatbot for plant disease detection. Designed a web interface for image analysis and result visualization, using Python, Flask, and Machine Learning models.',
    skills: ['Python', 'React', 'REST APIs', 'PostgreSQL'],
  },
]

const projects = [
  {
    title: 'Football Ticket Reservation Platform',
    description:
      'A production-grade, event-driven microservices system for football ticket reservations. Integrates real-time payment processing with Stripe, asynchronous event streaming via Kafka, and identity management through Keycloak.',
    image: 'https://images.unsplash.com/photo-1705593973313-75de7bf95b56?w=900&h=540&fit=crop&auto=format',
    tags: ['Spring Boot', 'Microservices', 'Kafka', 'Stripe', 'PostgreSQL', 'Docker', 'React'],
    highlights: [
      'Event-driven architecture with Kafka',
      'Stripe payment integration',
      'Keycloak authentication & RBAC',
      'Containerized with Docker',
    ],
    github: 'https://github.com/AsmaIDBENSALAH/reservation-ticket',
    demo: '#',
  },
  {
    title: 'Real-Time Shipment Tracking System',
    description:
      'Developed a web application for tracking shipments in real time, featuring an interactive dashboard with live status updates. Implemented real-time communication using WebSocket and managed data exchanges between services through REST APIs, using Spring Boot for the backend and Angular for the frontend.',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&h=540&fit=crop&auto=format',
    tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
    highlights: [
      'Real-time shipment tracking dashboard',
      'Interactive shipment status visualization',
      'Real-time communication using WebSocket',
      'REST API integration for data exchange',
    ],
    github: 'https://github.com/AsmaIDBENSALAH/shipment-tracking',
    demo: '#',
  },
]

const education = [
  {
    degree: "State Engineering Degree",
    field: "Computer Engineering",
    institution: "ENSA Agadir",
    period: "2019 – 2024",
    emoji: "🎓",
  },
    {
  degree: "Baccalaureate in Physical Sciences",
  field: "Physical Sciences",
  institution: "Lycée Mohamed Derfoufi, Agadir",
  period: "2018 – 2019",
  emoji: "🎓",
},
]

const certifications = [
  { name: "Full Stack Web Development Bootcamp",issuer: "Orange Digital Center × JobInTech", year: "2026",},
  { name: "DevOps Foundations", issuer: "LinkedIn Learning", year: "2024" },
  { name: "Software Engineer Certificate", issuer: "HackerRank", year: "2024" },
]

const achievements = [
  {
    Icon: Award,
    title: "CodinGame Hackathon",
    description: "Ranked Top 32 among 500+ competing teams in a global competitive programming hackathon.",
    badge: "Top 32 / 500+",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    Icon: Zap,
    title: "Orange Digital Center",
    description: "Selected as a National Finalist in the Orange Digital Center Full Stack Development programme.",
    badge: "National Finalist",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    Icon: CheckCircle2,
    title: "Full Stack Bootcamp",
    description: "Completed an intensive, industry-standard Full Stack Web Development bootcamp from start to finish.",
    badge: "Graduate",
    color: "text-olive",
    bg: "bg-olive-50 dark:bg-olive/15",
  },
]

const stats = [
  { label: "Years coding", value: 3, suffix: '+' },
  { label: "Projects shipped", value: 12, suffix: '+' },
  { label: "Technologies", value: 20, suffix: '+' },
  { label: "Hackathons", value: 2, suffix: '' },
]

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* Left — copy */}
        <div className="order-2 md:order-1">
          {/* Availability pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-olive-50 dark:bg-olive/15 border border-olive/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
            <span className="text-xs font-medium text-olive">Open to opportunities</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-4">
            Asma<br />
            <span className="text-olive">IDBENSALAH</span>
          </h1>

          <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
            <span>Software Engineer</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span>Full Stack Java Developer</span>
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-lg text-[15px]">
            State Engineer in Computer Science passionate about designing scalable web applications,
            cloud-native architectures, and modern software solutions. Specialized in Java Spring Boot,
            React, Angular, Microservices, REST APIs, and DevOps practices.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="/CV ASMA IDBENSALAH V1.pdf"
              download="CV ASMA IDBENSALAH V1.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 bg-olive text-white font-medium rounded-xl hover:bg-olive-dark transition-colors shadow-sm text-sm"
            >
              <Download size={16} />
              Download Resume
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors text-sm"
            >
              Contact Me
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-olive hover:border-olive/50 transition-all">
              <LinkedinIcon size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-olive hover:border-olive/50 transition-all">
              <GithubIcon size={18} />
            </a>
            <a href="mailto:asma.idbensalah@example.com" aria-label="Email"
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-olive hover:border-olive/50 transition-all">
              <Mail size={18} />
            </a>
            <div className="flex items-center gap-1.5 ml-2 text-gray-400 dark:text-gray-500">
              <MapPin size={13} />
              <span className="text-xs">Agadir, Morocco</span>
            </div>
          </div>
        </div>

        {/* Right — portrait */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-olive/10 blur-3xl scale-110" />

            {/* Outer ring */}
           <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-olive/25 p-1.5">
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner">

              <img
                src="/Asma1.jpg"
                alt="Asma Idbensalah"
                className="w-full h-full object-cover"
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at center, rgba(85,107,47,0.07) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

            </div>
          </div>

          {/* Available badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-full px-4 py-1.5 shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Available</span>
          </div>

          {/* Floating tech badge */}
          <div className="absolute -top-2 -right-6 bg-olive text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            Full Stack Dev
          </div>

          {/* XP badge */}
          <div className="absolute top-1/2 -left-8 -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-2 shadow-lg text-center">
            <div className="text-lg font-bold text-olive leading-none">1+</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Years exp.</div>
          </div>
        </div>
      </div>
    </div>
    </section >
  )
}

function StatCard({ label, value, suffix, active, delay }: {
  label: string; value: number; suffix: string; active: boolean; delay: number
}) {
  const count = useCounter(value, 1800, active)
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-olive/30 transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl font-bold text-olive mb-1 tabular-nums">{count}{suffix}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</div>
    </div>
  )
}

function AboutSection() {
  const [statsRef, statsVisible] = useInView()

  const values = [
    "Clean Architecture",
    "Backend Development",
    "Problem Solving",
    "Software Engineering",
    "Cloud Technologies",
    "Continuous Learning",
  ]

  return (
    <section id="about" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="About Me" title="Passionate engineer, lifelong learner" />

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <FadeIn>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              I'm a <span className="font-semibold text-gray-900 dark:text-white">State Engineer in Computer Engineering</span> from
              ENSA Agadir, with a deep passion for building software that scales. From architecting
              microservices to shipping polished React interfaces, I care about every layer of the stack.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              I thrive at the intersection of backend complexity and elegant frontend design — whether
              that means designing a Kafka-driven event bus, securing APIs with Keycloak, or crafting
              a delightful user experience in Angular.
            </p>
            <div className="flex flex-wrap gap-2">
              {values.map(v => (
                <span key={v} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <ChevronRight size={12} className="text-olive" />
                  {v}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map(({ label, value, suffix }, i) => (
              <StatCard key={label} label={label} value={value} suffix={suffix} active={statsVisible} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Technical Skills"
          title="Tools I build with"
          subtitle="A curated stack built through real-world projects, internships, and competitive programming."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map(({ name, Icon, accent, bg, skills }, i) => (
            <FadeIn key={name} delay={i * 60}>
              <div className="group bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-olive/25 transition-all duration-300 h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon size={20} className={accent} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
                </div>
                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill}
                      className="px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium border border-gray-100 dark:border-gray-700 group-hover:border-olive/20 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Highlight card */}
          <FadeIn delay={skillCategories.length * 60}>
            <div className="bg-olive rounded-2xl p-6 text-white shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="text-4xl font-bold mb-2">20+</div>
                <p className="text-olive-light font-medium text-sm mb-4">Technologies mastered across the full stack</p>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                From Spring Boot microservices to containerized cloud deployments — built through internships,
                bootcamps, and competitive hackathons.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="Experience" title="Where I've worked" />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -translate-x-1/2 hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.title} delay={i * 120}>
                <div className={`relative grid md:grid-cols-2 gap-8 md:gap-12 ${i % 2 === 0 ? '' : 'md:[direction:rtl]'}`}>
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-olive ring-4 ring-white dark:ring-gray-900" />
                  </div>

                  {/* Content card */}
                  <div className={`md:col-span-1 bg-white dark:bg-gray-900 rounded-2xl p-7 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 ${i % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white leading-snug">{exp.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-olive font-medium text-sm">{exp.company}</span>
                      <span className="text-gray-300 dark:text-gray-700">·</span>
                      <span className="text-gray-500 text-sm">{exp.period}</span>
                      <span className="ml-auto px-2 py-0.5 bg-olive-50 dark:bg-olive/15 text-olive text-[11px] font-semibold rounded-full">Internship</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map(skill => (
                        <Tag key={skill} label={skill} variant="olive" />
                      ))}
                    </div>
                  </div>

                  {/* Empty column for alternating layout */}
                  <div className="hidden md:block" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Things I've built"
          subtitle="Selected full-stack projects demonstrating architecture decisions, integrations, and delivery."
        />

        <div className="space-y-8">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 100}>
              <div className="group grid md:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900">

                {/* Image */}
                <div className="md:col-span-2 relative overflow-hidden bg-gray-100 dark:bg-gray-800 min-h-[220px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-olive transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="grid sm:grid-cols-2 gap-1.5 mb-5">
                      {project.highlights.map(h => (
                        <li key={h} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-olive flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <Tag key={tag} label={tag} />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <a href={project.github}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <GithubIcon size={15} />
                      GitHub
                    </a>
                    <a href={project.demo}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-olive rounded-lg hover:bg-olive-dark transition-colors">
                      <ExternalLink size={15} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section id="education" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Education" title="Academic background" />

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {education.map((ed, i) => (
            <FadeIn key={ed.degree} delay={i * 100}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-7 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-olive/30 hover:shadow-md transition-all duration-300 h-full">
                <div className="text-4xl mb-4">{ed.emoji}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{ed.degree}</h3>
                <p className="text-olive font-medium text-sm mb-1">{ed.field}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{ed.institution} · {ed.period}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Certifications */}
        <FadeIn>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Certifications</h3>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <FadeIn key={cert.name} delay={i * 80}>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-olive/30 transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-olive-50 dark:bg-olive/15 flex items-center justify-center mb-3">
                  <Award size={16} className="text-olive" />
                </div>
                <p className="font-medium text-gray-900 dark:text-white text-sm mb-1 leading-snug">{cert.name}</p>
                <p className="text-gray-500 text-xs">{cert.issuer} · {cert.year}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function AchievementsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Achievements" title="Milestones & recognition" />

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map(({ Icon, title, description, badge, color, bg }, i) => (
            <FadeIn key={title} delay={i * 100}>
              <div className="group bg-white dark:bg-gray-900 rounded-2xl p-7 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-olive/25 transition-all duration-300 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className={color} />
                </div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${bg} ${color}`}>
                    {badge}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">{description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 1200)
  }

  return (
    <section id="contact" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Contact"
          title="Let's work together"
          subtitle="Have a project in mind, or want to discuss a role? Send a message and I'll get back to you quickly."
        />

        <div className="grid md:grid-cols-5 gap-12">

          {/* Left — contact info */}
          <FadeIn className="md:col-span-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Reach me directly</h3>
                <div className="space-y-3">
                  {[
                    { Icon: Mail, label: 'assma.idbensalah2000@gmail.com', href: 'mailto:assma.idbensalah2000@gmail.com' },
                    { Icon: LinkedinIcon, label: 'linkedin.com/in/asma-idbensalah', href: 'https://www.linkedin.com/in/asma-idbensalah-03ab74216/' },
                    { Icon: GithubIcon, label: 'github.com/asma-idbensalah', href: 'https://github.com/AsmaIDBENSALAH' },
                  ].map(({ Icon, label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-olive transition-colors group">
                      <div className="w-9 h-9 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-olive/40 transition-colors">
                        <Icon size={16} />
                      </div>
                      <span className="truncate">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Based in</p>
                <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1.5">
                  <MapPin size={14} className="text-olive" />
                  Agadir, Morocco
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Availability</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-medium text-gray-900 dark:text-white text-sm">Open to full-time roles</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={100} className="md:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-olive-50 dark:bg-olive/15 flex items-center justify-center mb-4">
                    <CheckCircle2 size={26} className="text-olive" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Message sent!</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Thanks for reaching out. I'll reply within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-olive hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Asma Idbensalah"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Email</label>
                      <input
                        required
                        type="email"
                        placeholder="asma@company.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-olive text-white font-semibold rounded-xl hover:bg-olive-dark disabled:opacity-60 transition-all text-sm"
                  >
                    <Send size={16} />
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen font-sans antialiased">

      {/* ── Navbar ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800/60' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="text-xl font-black text-olive tracking-tight hover:opacity-80 transition-opacity">
            AI<span className="text-gray-300 dark:text-gray-600">.</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-olive dark:hover:text-olive-light rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                {label}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(d => !d)}
              className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-olive text-white text-sm font-semibold rounded-xl hover:bg-olive-dark transition-colors"
            >
              Hire Me
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-1">
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-left px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-olive rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                {label}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')}
              className="mt-2 px-4 py-2.5 bg-olive text-white text-sm font-semibold rounded-xl text-center">
              Hire Me
            </button>
          </div>
        )}
      </header>

      {/* ── Sections ── */}
      <main>
        <HeroSection scrollTo={scrollTo} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Designed & developed by{' '}
            <span className="font-semibold text-olive">Asma IDBENSALAH</span>
            {' '}© 2026
          </p>
          <div className="flex items-center gap-3">
            {[
              { Icon: GithubIcon, href: 'https://github.com/AsmaIDBENSALAH', label: 'GitHub' },
              { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/asma-idbensalah-03ab74216/', label: 'LinkedIn' },
              { Icon: Mail, href: 'mailto:assma.idbensalah2000@gmail.com', label: 'Email' },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-olive dark:hover:text-olive-light hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
