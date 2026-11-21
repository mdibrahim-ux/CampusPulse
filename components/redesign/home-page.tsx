'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  FileSearch,
  GraduationCap,
  ListChecks,
  ShieldCheck,
} from 'lucide-react';
import { MotionConfig, motion } from 'framer-motion';
import { FeatureCard } from '@/components/redesign/feature-card';
import { HeroWorkspacePreview } from '@/components/redesign/hero-workspace-preview';
import { SiteHeader } from '@/components/redesign/site-header';

const features = [
  {
    index: '01',
    title: 'Find scholarships',
    description: 'Explore a curated directory, compare published conditions and follow links to the official application source.',
    href: '/scholarships',
    action: 'Browse schemes',
    icon: GraduationCap,
    tone: 'yellow' as const,
  },
  {
    index: '02',
    title: 'Check your eligibility',
    description: 'Review your profile against scheme criteria and understand which details may need a closer look.',
    href: '/eligibility-checker',
    action: 'Check eligibility',
    icon: ListChecks,
    tone: 'blue' as const,
  },
  {
    index: '03',
    title: 'Make documents clearer',
    description: 'Review visible document details and prepare the information you may need before submission.',
    href: '/document-review',
    action: 'Review a document',
    icon: FileSearch,
    tone: 'orange' as const,
  },
  {
    index: '04',
    title: 'Keep your progress together',
    description: 'Save schemes, note application stages and keep important follow-ups in one personal workspace.',
    href: '/tracker',
    action: 'Open your tracker',
    icon: CalendarCheck,
    tone: 'paper' as const,
  },
  {
    index: '05',
    title: 'Understand portal remarks',
    description: 'Break down confusing rejection or defect messages into clearer points to verify and act on.',
    href: '/rejection-analyzer',
    action: 'Get help with a remark',
    icon: ShieldCheck,
    tone: 'blue' as const,
  },
  {
    index: '06',
    title: 'Discover student services',
    description: 'Find practical support beyond scholarships, from useful services to student-focused resources.',
    href: '/services',
    action: 'Explore services',
    icon: BriefcaseBusiness,
    tone: 'yellow' as const,
  },
];

const steps = [
  {
    number: '01',
    title: 'Start with your situation',
    description: 'Add the academic and personal details that help you understand which options may be relevant.',
  },
  {
    number: '02',
    title: 'Explore with context',
    description: 'Compare scholarship conditions, check eligibility and learn what documents may be required.',
  },
  {
    number: '03',
    title: 'Keep the next step visible',
    description: 'Save useful schemes, add reminders and return to your progress when you need it.',
  },
];

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="nb-home-page">
        <SiteHeader />
        <main>
          <section className="nb-hero" aria-labelledby="nb-hero-title">
            <div className="nb-container nb-hero-grid">
              <div className="nb-hero-copy">
                <motion.div
                  className="nb-eyebrow"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="nb-eyebrow-mark" />
                  A STUDENT SUPPORT WORKSPACE
                </motion.div>

                <motion.h1
                  id="nb-hero-title"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  Make your next step <span>make sense.</span>
                </motion.h1>

                <motion.p
                  className="nb-hero-description"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  Scholarships, eligibility checks, document guidance and personal follow-ups —
                  bring the pieces of student support into one clearer place.
                </motion.p>

                <motion.div
                  className="nb-hero-actions"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href="/get-started" className="nb-button nb-button-primary">
                    Set up your workspace <ArrowUpRight size={17} />
                  </Link>
                  <Link href="/scholarships" className="nb-button nb-button-outline">
                    Explore scholarships <ArrowRight size={16} />
                  </Link>
                </motion.div>

                <motion.div
                  className="nb-hero-assurances"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.42 }}
                >
                  <span><BadgeCheck size={16} /> Official sources linked</span>
                  <i />
                  <span><ShieldCheck size={16} /> Independent guidance</span>
                </motion.div>
              </div>

              <motion.div
                className="nb-hero-visual"
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.72, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroWorkspacePreview />
              </motion.div>
            </div>
          </section>

          <section className="nb-principles" aria-label="CampusPulse approach">
            <div className="nb-container nb-principles-grid">
              <div><span>01 / DISCOVER</span><strong>Know what is available</strong></div>
              <div><span>02 / UNDERSTAND</span><strong>Know what applies to you</strong></div>
              <div><span>03 / ORGANIZE</span><strong>Know what to do next</strong></div>
            </div>
          </section>

          <section id="features" className="nb-section nb-features-section">
            <div className="nb-container">
              <motion.div
                className="nb-section-heading"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <span className="nb-section-kicker">ONE WORKSPACE / SIX PRACTICAL TOOLS</span>
                  <h2>Student support, without the scattered tabs.</h2>
                </div>
                <p>
                  Move from finding an opportunity to preparing for it, with helpful context at
                  each stage.
                </p>
              </motion.div>

              <div className="nb-feature-grid">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: 0.46,
                      delay: (index % 3) * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <FeatureCard {...feature} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="how-it-works" className="nb-section nb-how-section">
            <div className="nb-container">
              <motion.div
                className="nb-section-heading nb-how-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <span className="nb-section-kicker">A SIMPLE WAY FORWARD</span>
                  <h2>Start where you are.</h2>
                </div>
                <p>
                  You do not have to figure everything out at once. Take one useful step, then
                  build from there.
                </p>
              </motion.div>

              <div className="nb-steps-grid">
                {steps.map((step, index) => (
                  <motion.article
                    key={step.number}
                    className="nb-step-card"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.46, delay: index * 0.08 }}
                  >
                    <span className="nb-step-number">{step.number}</span>
                    <div className="nb-step-rule" />
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="nb-container nb-final-cta">
            <div className="nb-final-cta-mark" aria-hidden="true"><GraduationCap size={30} /></div>
            <div className="nb-final-cta-copy">
              <span className="nb-section-kicker">YOUR NEXT STEP STARTS HERE</span>
              <h2>Make room for what matters.</h2>
              <p>Bring your options, documents and follow-ups into one student-first workspace.</p>
            </div>
            <Link href="/get-started" className="nb-button nb-button-primary">
              Get started <ArrowUpRight size={17} />
            </Link>
          </section>
        </main>

        <footer className="nb-footer">
          <div className="nb-container nb-footer-inner">
            <Link href="/" className="nb-brand nb-footer-brand">
              <span className="nb-brand-mark" aria-hidden="true"><GraduationCap size={20} /></span>
              <span className="nb-brand-copy">
                <strong>CampusPulse</strong>
                <small>STUDENT SUPPORT, MADE CLEAR</small>
              </span>
            </Link>
            <p>
              CampusPulse is an independent student-support guide. Always confirm current
              requirements and deadlines with the official scheme source.
            </p>
            <span className="nb-footer-note">BUILT FOR THE NEXT STEP <ArrowUpRight size={13} /></span>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
