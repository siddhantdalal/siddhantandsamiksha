import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Timeline from './components/Timeline';
import EngagementDetails from './components/EngagementDetails';
import WeddingEvents from './components/WeddingEvents';
import EventSchedule from './components/EventSchedule';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import VenueTravel from './components/VenueTravel';
import Hashtag from './components/Hashtag';
import Footer from './components/Footer';
import FilmGrain from './components/FilmGrain';
import Particles from './components/Particles';

export default function App() {
  return (
    <>
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
        <Gallery />
        <RSVP />
        <VenueTravel />
        <Hashtag />
      </main>
      <Footer />
    </>
  );
}
