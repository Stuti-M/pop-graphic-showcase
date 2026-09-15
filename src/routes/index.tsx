import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stuti Mohapatra — Developer & Competitive Builder" },
      {
        name: "description",
        content:
          "Portfolio of Stuti Mohapatra, a Computer Science Engineering student building web, embedded, IoT, and multi-agent AI systems.",
      },
      { property: "og:title", content: "Stuti Mohapatra — Developer Portfolio" },
      {
        property: "og:description",
        content: "Developer, competitive builder, and 2x hackathon runner-up based in Bhubaneswar, India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const skills = [
  "PYTHON",
  "JAVA",
  "JAVASCRIPT",
  "EMBEDDED C++",
  "SPRING BOOT",
  "N8N",
  "GROQ LLMS",
  "TAILWIND CSS",
  "EDGE IMPULSE",
  "DATA STRUCTURES & ALGORITHMS",
];

const projects = [
  {
    number: "01",
    eyebrow: "OFFLINE / EDGE AI",
    title: "Smart Safety Watch",
    subtitle: "AI-Powered Offline Emergency Wearable",
    description:
      "Autonomous edge intelligence meets decentralized offline communication—designed to detect danger and coordinate help when conventional networks disappear.",
    tags: ["Java", "Spring Boot", "Edge Impulse", "TinyML", "LoRa Mesh", "MQTT"],
    mark: "SOS",
  },
  {
    number: "02",
    eyebrow: "2ND PLACE / ANANT CHAKRA",
    title: "Sentinel-X",
    subtitle: "Multi-Agent AI System",
    description:
      "A coordinated agentic system powered by automated workflows and fast inference. Secured 2nd Place at the Anant Chakra Agentic AI Hackathon.",
    tags: ["n8n workflow automation", "Groq LLMs", "Multi-Agent AI"],
    mark: "X",
  },
];

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (event: globalThis.MouseEvent) => {
      dotRef.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
      dotRef.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
      ringRef.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
      ringRef.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

function CircuitAvatar() {
  return (
    <div className="avatar-wrap" aria-label="Abstract circuit portrait of Stuti Mohapatra" role="img">
      <div className="avatar-burst" />
      <svg className="avatar-art" viewBox="0 0 500 620" aria-hidden="true">
        <path className="avatar-shadow" d="M92 550 61 161l84-94 270 42 38 355-105 105z" />
        <path className="avatar-fill" d="m83 508 18-338 86-100 203 57 44 303-88 119-191 17z" />
        <path className="avatar-face" d="M179 174 312 133l73 94-29 216-102 67-115-92 4-174z" />
        <path className="avatar-hair" d="m139 265 4-69 50-105 126 22 88 91-49 54-33-70-129 28-23 105z" />
        <path className="avatar-line" d="m187 294 58-19 45 8m-91 70 45 11 76-14m-70 14-9 74 53-3" />
        <path className="avatar-circuit" d="M109 403h69v-49h45m-104 95h78v43h53m87-311v79h-38v56m75-124v106h-37m-52 145v83" />
        <g className="avatar-nodes">
          <circle cx="109" cy="403" r="9" /><circle cx="119" cy="449" r="9" />
          <circle cx="250" cy="492" r="9" /><circle cx="337" cy="181" r="9" />
          <circle cx="374" cy="192" r="9" /><circle cx="285" cy="526" r="9" />
        </g>
        <path className="avatar-eye" d="m185 292 28-8 23 7-25 12zm99-7 27-3 25 13-30 1z" />
      </svg>
      <span className="avatar-label">BUILD / BREAK / REPEAT</span>
    </div>
  );
}

function TiltProject({ project }: { project: (typeof projects)[number] }) {
  const cardRef = useRef<HTMLElement>(null);

  const tilt = (event: MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${y * -7}deg`);
    card.style.setProperty("--tilt-y", `${x * 7}deg`);
  };

  const reset = () => {
    cardRef.current?.style.setProperty("--tilt-x", "0deg");
    cardRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article ref={cardRef} onMouseMove={tilt} onMouseLeave={reset} className="project-card">
      <div className="project-pattern" aria-hidden="true" />
      <div className="project-topline">
        <span className="project-number">{project.number}</span>
        <span className="project-eyebrow">{project.eyebrow}</span>
      </div>
      <div className="project-copy">
        <p className="project-kicker">{project.subtitle}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="tag-list" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
      <span className="project-mark" aria-hidden="true">{project.mark}</span>
    </article>
  );
}

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const content = [...skills, ...skills];
  return (
    <div className={`skill-track ${reverse ? "skill-track-reverse" : ""}`}>
      <div className="skill-runner">
        {content.map((skill, index) => (
          <span key={`${skill}-${index}`}><b>✦</b>{skill}</span>
        ))}
      </div>
    </div>
  );
}

function Portfolio() {
  const [copied, setCopied] = useState(false);
  const copyDiscord = async () => {
    await navigator.clipboard.writeText("stuti_k_73");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main>
      <CustomCursor />
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="nav-logo" href="#top" aria-label="Stuti Mohapatra, back to top">SM<span>.</span></a>
        <div className="nav-links">
          <a href="#about">About</a><a href="#projects">Work</a><a href="#contact">Contact</a>
        </div>
        <span className="nav-status"><i /> Open to work</span>
      </nav>

      <section className="hero" id="top">
        <div className="hero-marquee" aria-hidden="true">
          <span>CODE / CREATE / COMPETE / CODE / CREATE / COMPETE /</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-index">PORTFOLIO ’26 <span>///</span> CSE + BUILDER</p>
            <h1 className="glitch-title" data-text="STUTI MOHAPATRA">
              <span>STUTI</span><span>MOHAPATRA</span>
            </h1>
            <p className="hero-subtitle">First-year Computer Science Engineering student <em>&amp;</em> Competitive Builder</p>
            <a className="hero-cta" href="#projects">See what I build <span>↘</span></a>
          </div>
          <CircuitAvatar />
        </div>
        <div className="hero-stamp" aria-hidden="true">2×<small>HACKATHON<br />RUNNER-UP</small></div>
        <a className="scroll-cue" href="#about"><span>↓</span> SCROLL TO EXPLORE</a>
      </section>

      <section className="about-section" id="about">
        <div className="section-label"><span>01</span> ABOUT.EXE</div>
        <div className="about-layout">
          <div className="about-burst" aria-hidden="true">HELLO!</div>
          <div className="comic-bubble">
            <p className="about-lead">I don’t just learn systems.<br /><strong>I build them.</strong></p>
            <p>Hands-on across <b>web development</b>, <b>embedded / IoT systems</b>, and <b>multi-agent AI</b>. I’m a 2x hackathon runner-up who likes taking ambitious ideas from sketch to working prototype.</p>
            <p>Previously a <b>Software Developer Intern at Paradip Port Authority</b>. Now actively looking for Software Engineering internships where curiosity, speed, and technical grit matter.</p>
            <span className="bubble-tail" aria-hidden="true" />
          </div>
          <div className="about-stat"><strong>3</strong><span>FIELDS,<br />ONE BUILDER</span></div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <header className="section-header">
          <div className="section-label"><span>02</span> SELECTED BUILDS</div>
          <h2>PROJECTS<span>!</span></h2>
          <p>Real problems. Sharp systems. Zero filler.</p>
        </header>
        <div className="project-stack">
          {projects.map((project) => <TiltProject key={project.number} project={project} />)}
        </div>
      </section>

      <section className="skills-section" aria-labelledby="skills-title">
        <div className="skills-heading"><span>03</span><h2 id="skills-title">MY TOOLBOX</h2><span>03</span></div>
        <Marquee />
        <Marquee reverse />
        <Marquee />
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-shape shape-one" aria-hidden="true" />
        <div className="contact-shape shape-two" aria-hidden="true" />
        <p className="contact-kicker">HAVE A HARD PROBLEM?</p>
        <h2>LET’S BUILD<br /><span>SOMETHING LOUD.</span></h2>
        <div className="contact-row">
          <p><span>BASED IN</span>Bhubaneswar, Odisha, India</p>
          <div className="social-links">
            <a href="https://github.com/Stuti-M" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
            <a href="https://www.linkedin.com/search/results/people/?keywords=Stuti%20Mohapatra" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
            <button type="button" onClick={copyDiscord} aria-label="Copy Discord username stuti_k_73">{copied ? "Copied!" : "Discord"} <span>{copied ? "✓" : "↗"}</span></button>
            <span className="email-pending" aria-label="Email address available on request">Email <small>ON REQUEST</small></span>
          </div>
        </div>
        <div className="footer-bottom"><span>STUTI MOHAPATRA © 2026</span><span>DESIGNED TO BE REMEMBERED.</span></div>
      </footer>
    </main>
  );
}