const base = import.meta.env.BASE_URL;

export default {
  couple: {
    groomFirst: 'Siddhant',
    brideFirst: 'Samiksha',
  },

  ui: {
    shloka: '|| श्री गणेशाय नमः ||',
    weddingOf: 'The Wedding of',
    dateShort: '05 · 12 · 2026',
    openInvitation: 'Open the Invitation',
    team: 'Team',
    groomDoorSub: "The Groom's Side",
    brideDoorSub: "The Bride's Side",
    doorPrompt: 'Whose side are you here to celebrate?',
    countdown: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
    sideToggle: { groom: "Siddhant's Side", bride: "Samiksha's Side" },
    discover: 'Discover',
    close: 'Close',
    reveal: 'Reveal',
    meetThem: 'Meet Them',
    dressCode: 'Dress Code',
    venueLabel: 'Venue',
    dateLabel: 'Date',
    timeLabel: 'Time',
    chapters: ['Chapter One', 'Chapter Two', 'Chapter Three', 'Chapter Four', 'Chapter Five', 'Chapter Six'],
    shareLabel: 'Share your moments with',
    madeWith: 'Made with love',
    engagedFor: 'Happily engaged for',
    countingLine: '…and counting, all the way to the mandap.',
    groomLabel: 'The Groom',
    brideLabel: 'The Bride',
  },

  hero: {
    tagline: 'Two Souls. One Journey.',
    date: '05 December 2026',
    cta: 'Save The Date',
    welcome: {
      groom: 'Welcome to our celebration — so glad you\'re on Team Groom!',
      bride: 'Welcome to our celebration — so glad you\'re on Team Bride!',
    },
  },

  weddingDate: '2026-12-05T12:13:00',

  aboutUs: {
    heading: 'About Us',
    subheading: 'The two hearts behind this love story',
    connectionText: 'Two cities, one destiny — 800 km apart, yet hearts perfectly aligned.',
    mapCities: { left: 'Mumbai', right: 'Nagpur' },
    prompt: 'Get to know the two souls whose worlds are about to become one.',
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
    closingLine: 'They say HR finds the best talent — well, Samiksha didn\'t even need a job posting. One look and Siddhant\'s resume was accepted for a lifetime role.',
    closingStrong: 'Best hire ever.',
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
        description: 'A dinner that turned into hours of conversation, a drive back that turned into a speeding ticket — and a memory that still makes us laugh. Who knew love could come with a fine?',
      },
      {
        title: 'Becoming Each Other\'s Person',
        description: 'Somewhere between the late-night calls and the comfortable silences, we stopped being two separate lives — and became each other\'s home.',
      },
      {
        title: 'The Realisation',
        description: 'Every prayer whispered, every quiet hope held close to the heart — it was always leading here. The pieces of the puzzle finally fell into place, just as we always believed they would. We knew this was forever.',
      },
      {
        title: 'Forever Begins',
        description: 'The chapter we\'ve been dreaming of. Our families unite, our hearts become one.',
      },
    ],
  },

  engagement: {
    heading: 'Sakharpuda',
    script: 'We said yes!',
    date: '01 May 2026',
    countdownDate: '2026-05-01T18:00:00',
    note: 'With the blessings of our families and rings on our fingers, our forever officially began on the first of May. The Sakharpuda is done — now the countdown to the mandap is on.',
  },

  weddingEvents: {
    heading: 'Wedding Celebrations',
    subheading: 'Three days of love, laughter & togetherness',
    venue: 'Suvi Palace',
    address: 'Sasunavghar, Mumbai-Ahmedabad Highway, Opp. Royal Garden, Vasai-Virar, Maharashtra 401208',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Suvi+Palace+Sasunavghar+Vasai-Virar',
    mehendiGroom: {
      name: 'Mehendi',
      iconKey: 'Mehendi',
      date: '03 December 2026',
      time: '11:00 AM onwards',
      description: 'An intimate mehendi gathering at the groom\'s home — intricate henna, close family, and happy chatter.',
      address: '203, Vedant Shine Appt., Ramkrishna Housing Society, Narendra Nagar, Wardha Rd., Nagpur – 440015',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=203+Vedant+Shine+Appt+Ramkrishna+Housing+Society+Narendra+Nagar+Wardha+Rd+Nagpur+440015',
      dressCode: '',
    },
    mehendiBride: {
      name: 'Mehendi',
      iconKey: 'Mehendi',
      date: '03 December 2026',
      time: '1:00 PM onwards',
      description: 'Intricate henna, music, and an afternoon full of joy — right here at Suvi Palace.',
      dressCode: '',
    },
    events: [
      {
        name: 'Halad Chadavane',
        iconKey: 'Haldi',
        date: '04 December 2026',
        time: 'Morning',
        description: 'The auspicious halad ceremony — turmeric blessings from loved ones, laughter, and the golden glow of new beginnings.',
        dressCode: '',
      },
      {
        name: 'Sangeet Sandhya',
        iconKey: 'Sangeet',
        date: '04 December 2026',
        time: 'Evening',
        description: 'A night of dance, music, and celebration. Come ready to move!',
        dressCode: '',
      },
      {
        name: 'Lagna Sohala',
        iconKey: 'Wedding',
        date: '05 December 2026',
        time: 'Muhurth at 12:13 PM',
        description: 'The sacred ceremony where two hearts become one — Antarpat, Mangalashtaka and Saptapadi, followed by wedding celebrations.',
        dressCode: '',
      },
    ],
  },

  reception: {
    heading: 'Reception',
    subheading: 'An evening of joy, laughter & togetherness',
    groom: {
      city: 'Nagpur',
      venue: 'Jerryl Lawns, Near Police Training School, Opp. Neeri High School, Kotwal Nagar, Laxminagar, Nagpur, Maharashtra 440022',
      date: '07 December 2026',
      time: '7:00 PM onwards',
      description: 'Join us for an unforgettable evening of celebration as we toast to new beginnings with the groom\'s loved ones.',
      note: 'You\'re seeing details for the Nagpur reception based on your side selection.',
    },
    bride: {
      city: 'Kolhapur',
      venue: 'A beautiful celebration in Kolhapur — to be revealed soon',
      date: 'A heartfelt December evening in Kolhapur',
      time: 'When love fills the room',
      description: 'An evening filled with warmth, laughter and love as we celebrate with the bride\'s nearest and dearest.',
      note: 'You\'re seeing details for the Kolhapur reception based on your side selection.',
    },
  },

  meetGroom: {
    heading: 'Meet the Groom',
    subheading: 'The man who stole her heart',
    promptText: 'Curious about the one who swept her off her feet? Take a sneak peek into his world.',
    photos: [
      { src: `${base}images/groom/the-roots.jpg`, alt: 'Siddhant' },
      { src: `${base}images/groom/the-scholar.jpg`, alt: 'Siddhant' },
      { src: `${base}images/groom/photo-3.jpg`, alt: 'Siddhant' },
      { src: `${base}images/groom/the-explorer.jpg`, alt: 'Siddhant' },
      { src: `${base}images/groom/the-professional.jpg`, alt: 'Siddhant' },
    ],
    details: [
      {
        title: 'Roots',
        iconKey: 'home',
        text: 'Born in Umred, a small town near Nagpur, and brought up in the heart of Nagpur — the city that shaped who he is today.',
      },
      {
        title: 'The Scholar',
        iconKey: 'scholar',
        text: 'Completed his graduation in BCA, then packed his bags and moved to the UK for 5 years to pursue his Masters in MSc Network Management & Cloud Computing.',
      },
      {
        title: 'The Professional',
        iconKey: 'work',
        text: 'Worked in the UK for 3.5 years, gaining invaluable experience, and is now back in India building his career forward.',
      },
      {
        title: 'The Explorer',
        iconKey: 'explore',
        text: 'A soul that thrives on exploring new places, cooking up a storm in the kitchen, and most of all — bike touring across the open roads.',
      },
    ],
    groomsmen: {
      heading: 'Meet the Groomsmen',
      promptText: 'The brothers who\'ve had his back through every chapter — now standing beside him on the biggest day of his life.',
      members: [
        {
          name: 'Aashish & Sohel',
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
          name: 'Vandan & Fenil',
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
      { src: `${base}images/bride/photo-1.jpg`, alt: 'Samiksha' },
      { src: `${base}images/bride/photo-2.jpg`, alt: 'Samiksha' },
      { src: `${base}images/bride/photo-3.jpg`, alt: 'Samiksha' },
      { src: `${base}images/bride/photo-4.jpg`, alt: 'Samiksha' },
      { src: `${base}images/bride/photo-5.jpg`, alt: 'Samiksha' },
    ],
    details: [
      {
        title: 'Roots',
        iconKey: 'home',
        text: 'Born and brought up in the city of dreams — Mumbai. A true Mumbaikar at heart, shaped by the energy and spirit of the city.',
      },
      {
        title: 'The Scholar',
        iconKey: 'scholar',
        text: 'Completed her Bachelor of Commerce followed by an MBA in Human Resource Management & Services — building a strong foundation for the leader she was becoming.',
      },
      {
        title: 'The Professional',
        iconKey: 'work',
        text: 'Working in Mumbai\'s corporate world in the HR Department, she found her calling in understanding and managing people.',
      },
      {
        title: 'The People Person',
        iconKey: 'people',
        text: 'She has no match when it comes to connecting with people. Always curious, always eager to learn and try something new — she makes everyone around her feel seen and valued.',
      },
    ],
    bridesmaids: {
      heading: 'Meet the Bridesmaids',
      promptText: 'The sisters who\'ve held her hand through every chapter — now standing beside her on the most beautiful day of her life.',
      members: [
        {
          name: 'Tanvi',
          photo: `${base}images/bridesmaids/tanvi.jpg`,
          description: 'Solace — the quiet comfort she turns to without words. The gentle place that gathers her back together.',
        },
        {
          name: 'Vibha',
          photo: `${base}images/bridesmaids/vibha.jpg`,
          description: 'North Star — the steady light that guides her home, no matter how dark the night.',
        },
        {
          name: 'Priya',
          photo: `${base}images/bridesmaids/priya.jpg`,
          description: 'Serene & Sensible — her calm in the chaos and the clarity in every storm.',
        },
        {
          name: 'Rasika',
          photo: `${base}images/bridesmaids/rasika.jpg`,
          description: 'Boss Baby — the youngest in years, yet the most rooted in love.',
        },
      ],
    },
  },

  hashtags: ['#SidKiSami', '#SamSaidSid', '#SiddhantWedsSamiksha', '#TheSidAndSamSaga'],

  footer: {
    closing: 'With Love',
    names: 'Siddhant & Samiksha',
    year: 2026,
  },

  nav: [
    { label: 'Home', href: '#hero' },
    { label: 'About Us', href: '#about-us' },
    { label: 'Our Journey', href: '#our-journey' },
    { label: 'Events', href: '#events' },
    { label: 'Meet', href: '#meet', sideAware: true, groomLabel: 'Meet the Groom', brideLabel: 'Meet the Bride' },
  ],
};
