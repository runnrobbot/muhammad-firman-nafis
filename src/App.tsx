import { lazy, Suspense } from 'react';
import { Hero } from './components/hero';
import { SectionSkeleton, SectionErrorBoundary, Header, ProgressBar } from './components/shared';
import { useSeoMeta } from './hooks/useSeoMeta';
import { usePageFadeIn } from './hooks/usePageFadeIn';

// Lazily loaded sections — keeps initial bundle lean (Requirements 1.5, 1.6)
const About = lazy(() => import('./components/about'));
const CV = lazy(() => import('./components/cv'));
const Timeline = lazy(() => import('./components/timeline'));
const CurrentRole = lazy(() => import('./components/current-role'));
const Skills = lazy(() => import('./components/skills'));
const Projects = lazy(() => import('./components/projects'));
const Github = lazy(() => import('./components/github'));
const Certifications = lazy(() => import('./components/certifications'));
const Exploring = lazy(() => import('./components/exploring'));
const Writing = lazy(() => import('./components/writing'));
const Contact = lazy(() => import('./components/contact'));
const Gallery = lazy(() => import('./components/gallery'));

function App(): JSX.Element {
  useSeoMeta();
  usePageFadeIn();

  return (
    <>
      {/* ── Reading Progress Bar ── */}
      <ProgressBar />

      {/* ── Header / Nav ── */}
      <Header />

      {/* Spacer so Hero isn't hidden under fixed header */}
      <div id="__top" style={{ height: '60px' }} aria-hidden="true" />

      {/* ── Hero — eager-loaded ── */}
      <Hero />

      {/* ── Main content ── */}
      <main id="main-content">
        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="480px" />}>
            <About />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="300px" />}>
            <CV />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="300px" />}>
            <CurrentRole />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="500px" />}>
            <Timeline />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="400px" />}>
            <Skills />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="600px" />}>
            <Projects />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="300px" />}>
            <Github />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="400px" />}>
            <Certifications />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="300px" />}>
            <Exploring />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="400px" />}>
            <Writing />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="500px" />}>
            <Contact />
          </Suspense>
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton minHeight="500px" />}>
            <Gallery />
          </Suspense>
        </SectionErrorBoundary>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: 'var(--space-xl) clamp(1.5rem, 5vw, 5rem)',
          borderTop: '1px solid var(--color-border)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          textAlign: 'center',
        }}
      >
        <p>
          © {new Date().getFullYear()} Muhammad Firman Nafis Aufa Suyanto. Built with React &amp;
          Vite.
        </p>
      </footer>
    </>
  );
}

export default App;
