import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { SideProvider } from './context/SideContext';
import InviteOpening from './components/InviteOpening';
import SideToggle from './components/SideToggle';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import OurStory from './components/OurStory';
import Timeline from './components/Timeline';
import EngagementDetails from './components/EngagementDetails';
import WeddingEvents from './components/WeddingEvents';
import Reception from './components/Reception';
import InviteGallery from './components/InviteGallery';
import MeetGroom from './components/MeetGroom';
import Hashtag from './components/Hashtag';
import Footer from './components/Footer';
import FilmGrain from './components/FilmGrain';
import { MotifDefs } from './components/Motifs';

// The particle engine is decorative and heavy, so it loads after first paint in its own chunk
const Particles = lazy(() => import('./components/Particles'));

export default function App() {
  return (
    // Guests with "reduce motion" switched on get fades instead of movement
    <MotionConfig reducedMotion="user">
    <SideProvider>
      <SmoothScroll />
      <MotifDefs />
      <ScrollProgress />
      <InviteOpening />
      <SideToggle />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
      <FilmGrain />
      <Navbar />
      {/* On Siddhant's side the page runs from day to night (theme.css);
          on Samiksha's these wrappers have no styling */}
      <main>
        <div className="phase-day tone-day" data-tone="day">
          <Hero />
          <OurStory />
          <AboutUs />
          <Timeline />
        </div>
        <div className="phase-dusk tone-day tone-dusk" data-tone="dusk">
          <EngagementDetails />
        </div>
        <div className="phase-night tone-night" data-tone="night">
          <WeddingEvents />
          <Reception />
          <InviteGallery />
          <MeetGroom />
          <Hashtag />
        </div>
      </main>
      <Footer />
    </SideProvider>
    </MotionConfig>
  );
}
