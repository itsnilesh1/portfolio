"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Bug, Github, Mail, Linkedin, Trophy, Cpu, Sparkles, ExternalLink, Stars, Fingerprint, Phone, Download, ArrowDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ======== CONFIG (edit these) ========
const PROFILE = {
  name: "Nilesh Patil",
  roles: ["Cybersecurity Enthusiast", "Bug Bounty Hunter", "Builder", "Gym Lover"],
  blurb:
    "18 y/o | 6 ft | Mesomorph. Passionate about web security, authentication flaws, and practical builds. Dreaming big, shipping fast.",
  avatar:
    "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop",
  email: "mailto:nilesh@example.com",
  gh: "https://github.com/", // add username
  li: "https://www.linkedin.com/in/", // add username
  phone: "tel:+91-0000000000",
  resume: "#", // link a PDF
};

const SKILLS = [
  { icon: <Shield />, title: "Web Security", tags: ["Auth/Session", "CSRF", "2FA", "P4 focus"] },
  { icon: <Bug />, title: "Bug Bounty", tags: ["Recon", "Reporting", "VRT", "OpenBugBounty"] },
  { icon: <Cpu />, title: "Projects", tags: ["RFID", "ESP8266", "Voice Gate", "DBMS"] },
  { icon: <Fingerprint />, title: "Auth Flows", tags: ["Session Fixation", "Password Reset", "Cookies"] },
];

const PROJECTS = [
  {
    title: "RFID Attendance System",
    brief:
      "Built an RFID-based attendance system with real-time logging. Earned college fest recognition.",
    meta: ["RFID", "NodeMCU", "Google Sheets"],
    link: "#",
  },
  {
    title: "Voice Verification Smart Entry",
    brief:
      "Low-cost smart home entry: motion-triggered prompt, accepts voice keyword, alarms on mismatch.",
    meta: ["ESP8266", "Mic", "Security"],
    link: "#",
  },
  {
    title: "Bounty: Session Persist After Password Change",
    brief:
      "Reported a session invalidation flaw (P4). Accepted. Strengthened awareness of auth hygiene.",
    meta: ["P4", "Broken Auth", "Report"],
    link: "#",
  },
  {
    title: "2FA Bypass Investigation",
    brief:
      "Identified flow where session cookie issued before 2FA completion, enabling unauthorized changes.",
    meta: ["2FA", "Risk", "Research"],
    link: "#",
  },
];

const ACHIEVEMENTS = [
  {
    label: "First accepted bounty report",
    detail: "Password reset bug accepted; moving toward consistent P4 hunts.",
  },
  {
    label: "78% in Diploma (3rd Sem)",
    detail: "Balancing academics, gym, and bug hunting.",
  },
  { label: "OpenBugBounty Hunter", detail: "Actively reporting, learning, iterating." },
];


// ======== tiny utilities ========
const useTyping = (
  lines: string[],    // ✅ type added
  speed: number = 35,
  hold: number = 1000
) => {

  const [display, setDisplay] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    const typeLine = async () => {
      const line = lines[lineIdx] ?? "";
      for (let i = 0; mounted && i <= line.length; i++) {
        await new Promise((r) => setTimeout(r, speed));
        setDisplay(line.slice(0, i));
      }
      await new Promise((r) => setTimeout(r, hold));
      if (!mounted) return;
      if (lineIdx < lines.length - 1) {
        setLineIdx((x) => x + 1);
      } else {
        setDone(true);
      }
    };
    typeLine();
    return () => {
      mounted = false;
    };
  }, [lineIdx]);

  return { display, lineIdx, done };
};

// ======== visual candy: RGB gradient + particles + matrix ========
const ParticleField: React.FC<{ count?: number }> = ({ count = 60 }) => {
  const refs = useRef([] as HTMLDivElement[]);
  useEffect(() => {
    const id = setInterval(() => {
      refs.current.forEach((el) => {
        if (!el) return;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const s = 0.5 + Math.random() * 1.2;
        el.style.left = x + "%";
        el.style.top = y + "%";
        el.style.transform = `scale(${s})`;
        el.style.opacity = String(0.2 + Math.random() * 0.8);
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          className="absolute h-1.5 w-1.5 rounded-full blur-[1px] bg-white/70 shadow-[0_0_16px_2px_rgba(255,255,255,0.7)]"
          style={{ left: "50%", top: "50%", transition: "all 1.2s ease" }}
        />
      ))}
    </div>
  );
};

const MatrixRain: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(transparent,black_20%,black_80%,transparent)]">
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="absolute h-full w-[2px] left-0 top-0 bg-white/10"
        style={{
          left: `${(i * 2.5) % 100}%`,
          animation: `fall ${5 + (i % 5)}s linear ${(i % 10) * 0.7}s infinite`,
        }}
      />
    ))}
    <style>{`
      @keyframes fall { 0%{ transform: translateY(-110%);} 100%{ transform: translateY(110%);} }
    `}</style>
  </div>
);

// ======== Main Component ========
export default function CyberPortfolio() {
  const heroLines = useMemo(
    () => [
      "> whoami",
      `NILESH_PATIL`,
      "Cybersecurity | Bug Bounty | Builder | Gym",
      "> status: online — systems nominal",
    ],
    []
  );
  const { display, done } = useTyping(heroLines, 24, 700);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(255,0,150,0.15),transparent),radial-gradient(900px_500px_at_80%_30%,rgba(0,200,255,0.15),transparent),linear-gradient(180deg,#05060a,#0b0f17)] text-white">
      <MatrixRain />
      <ParticleField />

      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-mono text-sm tracking-widest">NILESH.IO</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="#about" className="text-xs md:text-sm opacity-80 hover:opacity-100">About</a>
            <a href="#skills" className="text-xs md:text-sm opacity-80 hover:opacity-100">Skills</a>
            <a href="#projects" className="text-xs md:text-sm opacity-80 hover:opacity-100">Projects</a>
            <a href="#achievements" className="text-xs md:text-sm opacity-80 hover:opacity-100">Wins</a>
            <a href="#contact" className="text-xs md:text-sm opacity-80 hover:opacity-100">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col items-center justify-center gap-6 px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-xl"
        >
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-400/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <div className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-3 font-mono text-xs opacity-70">/bin/terminal</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Star className="h-4 w-4" />
              <span className="text-xs">cyberpunk • glass • animated</span>
            </div>
          </div>
          <div className="mt-4 font-mono text-lg leading-relaxed">
            <span className="text-emerald-300">$</span> <span>{display}</span>
            <span className="ml-1 animate-pulse">▮</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-[1.2fr,0.8fr]"
        >
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Terminal className="h-5 w-5" /> Hello, World_ I’m {PROFILE.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-[auto,1fr]">
              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-2xl border border-white/20 shadow-xl">
                <img src={PROFILE.avatar} alt="avatar" className="h-full w-full object-cover" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 [box-shadow:0_0_25px_4px_rgba(255,255,255,0.2)_inset]" />
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {PROFILE.roles.map((r, i) => (
                    <span key={i} className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs opacity-90">
                      {r}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm opacity-90">{PROFILE.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild variant="secondary" className="rounded-2xl">
                    <a href={PROFILE.resume}><Download className="mr-2 h-4 w-4" /> Resume</a>
                  </Button>
                  <Button asChild className="rounded-2xl">
                    <a href="#projects"><ArrowDown className="mr-2 h-4 w-4" /> Explore Projects</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Shield className="h-5 w-5" /> Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-2xl border-white/20 text-white">
                <a href={PROFILE.gh} target="_blank" rel="noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl border-white/20 text-white">
                <a href={PROFILE.li} target="_blank" rel="noreferrer"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl border-white/20 text-white">
                <a href={PROFILE.email}><Mail className="mr-2 h-4 w-4" /> Email</a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl border-white/20 text-white">
                <a href={PROFILE.phone}><Phone className="mr-2 h-4 w-4" /> Call</a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold"><Cpu className="h-5 w-5" /> Skill Stack</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="group border-white/10 bg-white/5 text-white backdrop-blur-xl transition hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5 transition group-hover:scale-105">
                      {s.icon}
                    </span>
                    {s.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t, j) => (
                      <span key={j} className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs opacity-90">
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold"><Bug className="h-5 w-5" /> Projects & Reports</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="border-white/10 bg-white/5 text-white backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="truncate">{p.title}</span>
                    <a href={p.link} className="text-xs opacity-80 hover:opacity-100" target="_blank" rel="noreferrer">
                      open <ExternalLink className="ml-1 inline h-3 w-3" />
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-90">{p.brief}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.meta.map((m, k) => (
                      <span key={k} className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs">
                        {m}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="relative mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold"><Trophy className="h-5 w-5" /> Highlights</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="border-white/10 bg-white/5 text-white backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Stars className="h-4 w-4" /> {a.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-90">{a.detail}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold"><Mail className="h-5 w-5" /> Contact</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr,0.9fr]">
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg">Hacker-style Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const term = document.getElementById("terminal-output");
                  if (term) {
                    term.textContent = "> Sending message...\n> Message delivered successfully ✔️";
                  }
                }}
                className="grid gap-3"
              >
                <input className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/30" placeholder="Your Name" required />
                <input className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/30" placeholder="Email" type="email" required />
                <textarea className="min-h-[120px] rounded-xl border border-white/15 bg-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/30" placeholder="Your Message" required />
                <Button type="submit" className="rounded-2xl">Send</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Terminal className="h-5 w-5" /> Terminal Log</CardTitle>
            </CardHeader>
            <CardContent>
              <pre id="terminal-output" className="h-48 w-full overflow-auto rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs leading-relaxed">
$ init contact --secure
$ awaiting input...
              </pre>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm opacity-90">
                <a className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2" href={PROFILE.email}><Mail className="h-4 w-4" /> {PROFILE.email.replace("mailto:", "")}</a>
                <a className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2" href={PROFILE.gh} target="_blank" rel="noreferrer"><Github className="h-4 w-4" /> GitHub</a>
                <a className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2" href={PROFILE.li} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" /> LinkedIn</a>
                <a className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2" href={PROFILE.phone}><Phone className="h-4 w-4" /> {PROFILE.phone.replace("tel:", "")}</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-xs opacity-70">
        © {new Date().getFullYear()} {PROFILE.name}. Built with ♥ — cyberpunk, glass & motion.
      </footer>

      {/* glo-glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute -right-10 top-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>
    </div>
  );
}
