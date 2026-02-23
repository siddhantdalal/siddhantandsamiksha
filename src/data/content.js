const base = import.meta.env.BASE_URL;

export const content = {
  couple: {
    groomFirst: 'Siddhant',
    groomLast: 'Dalal',
    brideFirst: 'Samiksha',
    brideLast: 'Patil',
  },

  hero: {
    tagline: 'Two Souls. One Journey.',
    date: 'A beautiful beginning, coming soon',
    cta: 'Save The Date',
    welcome: {
      groom: 'Welcome to our celebration — so glad you\'re on Team Groom!',
      bride: 'Welcome to our celebration — so glad you\'re on Team Bride!',
    },
  },

  // Wedding date — update this to the actual date
  weddingDate: '2026-12-12T10:00:00',

  aboutUs: {
    heading: 'About Us',
    subheading: 'The two hearts behind this love story',
    groom: {
      name: 'Siddhant Dalal',
      photo: `${base}images/about/siddhant-about.jpg`,
      hometown: 'Nagpur',
      bio: 'Born in Nagpur, now calling Pune home — Siddhant is a Software Developer by day and a biker by night. A big-time bike tourer with an endless love for the open road, he believes the best conversations happen at 100 km/h with the wind in your face.',
    },
    bride: {
      name: 'Samiksha Patil',
      photo: `${base}images/about/samiksha-about.jpg`,
      hometown: 'Mumbai',
      bio: 'Born and brought up in the city of dreams, Samiksha is a corporate HR professional by day, and a person who knows how to handle things — be it personal or professional. With a heart as warm as her smile, she brings grace and strength to everything she touches.',
    },
    closingLine: 'She\'s been shuffled across every HR department — but even without being on the recruiting team, she still managed to recruit Siddhant for a lifetime. Best hire ever.',
  },

  ourStory: {
    heading: 'Our Story',
    text: `Some love stories are written in the stars — ours was written in stolen glances and late-night conversations. What started as a simple hello turned into a lifetime of laughter, adventure, and an unshakable bond. We found in each other a best friend, a confidant, and a love that feels like coming home. Now, we're ready to begin our forever — and we want you there to celebrate with us.`,
  },

  timeline: {
    heading: 'Our Journey',
    subheading: 'From the first spark to forever',
    events: [
      {
        title: 'The First Meeting',
        description: 'A chance encounter that changed everything. Two worlds collided and nothing was ever the same.',
      },
      {
        title: 'The First Date',
        description: 'Coffee turned into dinner, dinner turned into hours of conversation, and hours turned into a connection that would last a lifetime.',
      },
      {
        title: 'Becoming Each Other\'s Person',
        description: 'Somewhere between the late-night calls and the comfortable silences, we stopped being two separate lives — and became each other\'s home.',
      },
      {
        title: 'The Realisation',
        description: 'Every prayer whispered, every wish made on 11:11 — it was always leading here. The pieces of the puzzle finally fell into place, just as we always manifested. We knew this was forever.',
      },
      {
        title: 'Forever Begins',
        description: 'The chapter we\'ve been dreaming of. Our families unite, our hearts become one.',
      },
    ],
  },

  engagement: {
    heading: 'Engagement Ceremony',
    date: 'First week of May 2026',
    time: 'Stay tuned for the moment',
    venue: 'Somewhere magical in Mumbai',
    address: 'Exact venue to be revealed soon',
    mapEmbed: '', // paste Google Maps embed URL here
  },

  weddingEvents: {
    heading: 'Wedding Celebrations',
    subheading: 'Four days of love, laughter & togetherness',
    events: [
      {
        name: 'Haldi',
        date: 'A golden day awaits',
        time: 'To be revealed',
        venue: 'Coming soon',
        description: 'A vibrant ceremony of turmeric blessings, laughter, and auspicious beginnings.',
        dressCode: '',
        icon: '☀️',
      },
      {
        name: 'Mehendi',
        date: 'When the time is just right',
        time: 'To be revealed',
        venue: 'Coming soon',
        description: 'Intricate henna designs, music, and an afternoon filled with joy and tradition.',
        dressCode: '',
        icon: '🌿',
      },
      {
        name: 'Sangeet',
        date: 'A night worth waiting for',
        time: 'To be revealed',
        venue: 'Coming soon',
        description: 'A night of dance, music, and celebration. Come ready to move!',
        dressCode: '',
        icon: '🎶',
      },
      {
        name: 'Wedding',
        date: 'The day we\'ve dreamed of',
        time: 'To be revealed',
        venue: 'Coming soon',
        description: 'The sacred ceremony where two hearts become one. Pheras under the mandap.',
        dressCode: '',
        icon: '💍',
      },
    ],
  },

  eventSchedule: {
    heading: 'Wedding Day Schedule',
    subheading: 'The day our forever begins',
    schedule: [
      { time: 'Step 1', event: 'Guest Arrival & Seating', icon: '🪷' },
      { time: 'Step 2', event: 'Ganesh Puja', icon: '🙏' },
      { time: 'Step 3', event: 'Baraat Procession', icon: '🐎' },
      { time: 'Step 4', event: 'Varmala Ceremony', icon: '💐' },
      { time: 'Step 5', event: 'Kanyadaan & Pheras', icon: '🔥' },
      { time: 'Step 6', event: 'Vidaai', icon: '🥹' },
      { time: 'Step 7', event: 'Wedding Lunch', icon: '🍽️' },
    ],
  },

  reception: {
    heading: 'Reception',
    subheading: 'An evening of joy, laughter & togetherness',
    groom: {
      city: 'Nagpur',
      venue: 'A stunning venue in the heart of Nagpur — to be revealed soon',
      date: 'An evening worth the wait',
      time: 'To be revealed',
      description: 'Join us for an unforgettable evening of celebration as we toast to new beginnings with the groom\'s loved ones.',
      dressCode: 'To be announced',
    },
    bride: {
      city: 'Kolhapur',
      venue: 'A beautiful celebration in Kolhapur — to be revealed soon',
      date: 'An evening worth the wait',
      time: 'To be revealed',
      description: 'An evening filled with warmth, laughter and love as we celebrate with the bride\'s nearest and dearest.',
      dressCode: 'To be announced',
    },
  },

  meetGroom: {
    heading: 'Meet the Groom',
    subheading: 'The man who stole her heart',
    promptText: 'Curious about the one who swept her off her feet? Take a sneak peek into his world.',
    photos: [
      { src: `${base}images/groom/photo-2.jpg`, alt: 'Siddhant' },
      { src: `${base}images/groom/the-scholar.jpg`, alt: 'Siddhant' },
      { src: `${base}images/groom/photo-3.jpg`, alt: 'Siddhant' },
      { src: `${base}images/groom/photo-4.jpg`, alt: 'Siddhant' },
      { src: `${base}images/groom/photo-5.jpg`, alt: 'Siddhant' },
    ],
    details: [
      {
        title: 'Roots',
        text: 'Born in Umred, a small town near Nagpur, and brought up in the heart of Nagpur — the city that shaped who he is today.',
        icon: '🏡',
      },
      {
        title: 'The Scholar',
        text: 'Completed his graduation in BCA, then packed his bags and moved to the UK for 5 years to pursue his Masters in MSc Network Management & Cloud Computing.',
        icon: '🎓',
      },
      {
        title: 'The Professional',
        text: 'Worked in the UK for 3.5 years, gaining invaluable experience, and is now back in India building his career forward.',
        icon: '💼',
      },
      {
        title: 'The Explorer',
        text: 'A soul that thrives on exploring new places, cooking up a storm in the kitchen, and most of all — bike touring across the open roads.',
        icon: '🏍️',
      },
    ],
    groomsmen: {
      heading: 'Meet the Groomsmen',
      promptText: 'The brothers who\'ve had his back through every chapter — now standing beside him on the biggest day of his life.',
      members: [
        {
          name: 'Sohel & Aashish',
          photo: `${base}images/groomsmen/sohel-aashish.jpg`,
          description: 'The Wolfpack Members',
        },
        {
          name: 'Sai',
          photo: `${base}images/groomsmen/sai.jpg`,
          description: 'The Riding Partner',
        },
        {
          name: 'Aditya',
          photo: `${base}images/groomsmen/aditya.jpg`,
          description: 'The OG',
        },
        {
          name: 'Rushabh & Manan',
          photo: `${base}images/groomsmen/london-1.jpg`,
          description: 'The Home Away From Home',
        },
        {
          name: 'Fenil & Vandan',
          photo: `${base}images/groomsmen/london-2.jpg`,
          description: 'The Home Away From Home',
        },
      ],
    },
  },

  meetBride: {
    heading: 'Meet the Bride',
    subheading: 'The woman who made his world complete',
    promptText: 'Curious about the one who captured his heart? Here\'s a glimpse into her beautiful world.',
    photos: [
      { src: `${base}images/about/samiksha.jpg`, alt: 'Samiksha' },
      { src: `${base}images/bride/photo-2.jpg`, alt: 'Samiksha' },
      { src: `${base}images/bride/photo-3.jpg`, alt: 'Samiksha' },
      { src: `${base}images/bride/photo-4.jpg`, alt: 'Samiksha' },
      { src: `${base}images/bride/photo-5.jpg`, alt: 'Samiksha' },
    ],
    details: [
      {
        title: 'Roots',
        text: 'Born and brought up in the city of dreams — Mumbai. A true Mumbaikar at heart, shaped by the energy and spirit of the city.',
        icon: '🏡',
      },
      {
        title: 'The Scholar',
        text: 'Completed her Bachelor of Commerce followed by an MBA in Human Resource Management & Services — building a strong foundation for the leader she was becoming.',
        icon: '🎓',
      },
      {
        title: 'The Professional',
        text: 'Working in Mumbai\'s corporate world in the HR Department, she found her calling in understanding and managing people.',
        icon: '💼',
      },
      {
        title: 'The People Person',
        text: 'She has no match when it comes to connecting with people. Always curious, always eager to learn and try something new — she makes everyone around her feel seen and valued.',
        icon: '✨',
      },
    ],
  },

  rsvp: {
    heading: 'RSVP',
    subheading: 'We would be honored by your presence',
    successMessage: 'Thank you! We can\'t wait to celebrate with you.',
  },

  venueTravel: {
    heading: 'Venue & Travel',
    subheading: 'All the details you\'ll need, coming soon with love',
    venue: {
      name: 'A place as magical as our love story',
      address: 'The perfect destination is being chosen — stay tuned',
      mapEmbed: '',
    },
    hotels: [
      {
        name: 'Comfort awaits you',
        distance: 'Close to all the celebrations',
        phone: 'Details arriving soon',
        note: 'We\'re handpicking the best stays for our loved ones',
      },
      {
        name: 'More options on the way',
        distance: 'Convenience is our priority',
        phone: 'Details arriving soon',
        note: 'Your comfort means the world to us',
      },
    ],
    travel: {
      airport: 'Flight details will be shared once the venue is set',
      railway: 'Train routes and options coming soon',
      parking: 'We\'ll make sure getting here is as easy as possible',
    },
  },

  hashtags: ['#SidKiSami', '#SamSaidSid', '#SiddhantWedsSamiksha'],

  footer: {
    closing: 'With Love',
    names: 'Siddhant & Samiksha',
    year: 2026,
  },

  nav: [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#our-story' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
  ],
};
