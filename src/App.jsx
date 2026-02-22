import { SideProvider } from './context/SideContext';
import SideSelector from './components/SideSelector';
import SideToggle from './components/SideToggle';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Timeline from './components/Timeline';
import EngagementDetails from './components/EngagementDetails';
import WeddingEvents from './components/WeddingEvents';
import EventSchedule from './components/EventSchedule';
import Reception from './components/Reception';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';

import Hashtag from './components/Hashtag';
import Footer from './components/Footer';
import FilmGrain from './components/FilmGrain';
import Particles from './components/Particles';

export default function App() {
  return (
    <SideProvider>
      <SideSelector />
      <SideToggle />
      <Particles />
      <FilmGrain />
      <Navbar />
      <main>
        <Hero />
        <OurStory />
        <Timeline />
        <EngagementDetails />
        <WeddingEvents />
        <EventSchedule />
        <Reception />
        <Gallery />
        <RSVP />
        <Hashtag />
      </main>
      <Footer />
    </SideProvider>
  );
}
