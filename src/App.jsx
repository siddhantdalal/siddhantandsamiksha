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
import MeetGroom from './components/MeetGroom';

import Hashtag from './components/Hashtag';
import Footer from './components/Footer';
import FilmGrain from './components/FilmGrain';
import Particles from './components/Particles';

export default function App() {
  return (
    // Guests with "reduce motion" switched on get fades instead of movement
    <MotionConfig reducedMotion="user">
    <SideProvider>
      <SmoothScroll />
      <ScrollProgress />
      <InviteOpening />
      <SideToggle />
      <Particles />
      <FilmGrain />
      <Navbar />
      <main>
        <Hero />
        <OurStory />
        <AboutUs />
        <Timeline />
        <EngagementDetails />
        <WeddingEvents />

        <Reception />
        <MeetGroom />
        <Hashtag />
      </main>
      <Footer />
    </SideProvider>
    </MotionConfig>
  );
}
