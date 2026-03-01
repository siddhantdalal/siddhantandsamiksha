import { SideProvider } from './context/SideContext';
import SideSelector from './components/SideSelector';
import SideToggle from './components/SideToggle';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import OurStory from './components/OurStory';
import Timeline from './components/Timeline';
import EngagementDetails from './components/EngagementDetails';
import WeddingEvents from './components/WeddingEvents';

import Reception from './components/Reception';
import MeetGroom from './components/MeetGroom';
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
        <AboutUs />
        <OurStory />
        <Timeline />
        <EngagementDetails />
        <WeddingEvents />

        <Reception />
        <MeetGroom />
        <RSVP />
        <Hashtag />
      </main>
      <Footer />
    </SideProvider>
  );
}
