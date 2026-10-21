const base = import.meta.env.BASE_URL;

const suviPalace = {
  name: 'Suvi Palace',
  address: 'Sasunavghar, Mumbai–Ahmedabad Highway, Opp. Royal Garden, Vasai-Virar, Maharashtra 401208',
  mapLink: 'https://maps.app.goo.gl/A9tuAxwJTjTa8rGm9',
};

// The printed invitations: full size for viewing and saving, plus a small copy for the gallery
const invite = (file, title, alt) => ({
  title,
  alt,
  src: `${base}images/invites/${file}.jpg`,
  thumb: `${base}images/invites/thumbs/${file}.jpg`,
  download: `siddhant-samiksha-${file}-invite.jpg`,
});

const invites = {
  groomMehendi: invite('groom-mehendi', 'Love, Written in Henna',
    'Mehendi invitation from the Dalal family, “Love, Written in Henna”: Thursday 03 December 2026, from 11:00 AM, at their home on Wardha Road, Nagpur'),
  groomWedding: invite('groom-wedding-reception', 'Lagna Sohala & Reception',
    'Wedding and reception invitation from the Dalal family: Lagna Sohala on Saturday 05 December 2026 at Suvi Palace, Vasai-Virar, and the reception on Monday 07 December 2026 at Jerryl Lawns, Nagpur'),
  brideMehendi: invite('bride-mehendi', 'Love, Written in Henna',
    'Mehendi invitation from the Patil family, “Love, Written in Henna”: Thursday 03 December 2026, from 1:00 PM, at Suvi Palace, Vasai-Virar'),
  brideHaldi: invite('bride-haldi', 'The Glow Before the Vows',
    'Haldi invitation from the Patil family, “The Glow Before the Vows”: Friday 04 December 2026, morning, at Suvi Palace, Vasai-Virar'),
  brideSangeet: invite('bride-sangeet', 'The Dance Before the Seven Steps',
    'Sangeet invitation from the Patil family, “The Dance Before the Seven Steps”: Friday 04 December 2026, evening, at Suvi Palace, Vasai-Virar'),
  brideWedding: invite('bride-wedding', 'Seven Steps to Forever',
    'Wedding invitation from the Patil family, “Seven Steps to Forever”: Lagna Sohala on Saturday 05 December 2026, muhurth 12:13 PM, at Suvi Palace, Vasai-Virar'),
};

// The couple as drawn on an invite, shown on that event's card
const art = (file, width, height, alt) => ({ src: `${base}images/characters/${file}.jpg`, width, height, alt });

export default {
  couple: {
    groomFirst: 'Siddhant',
    brideFirst: 'Samiksha',
  },

  ui: {
    shloka: '॥ श्री गणेशाय नमः ॥',
    weddingOf: 'The Wedding of',
    dateShort: '05 · 12 · 2026',
    openInvitation: 'Open the Invitation',
    team: 'Team',
    groomDoorSub: "The Groom's Side",
    brideDoorSub: "The Bride's Side",
    doorPrompt: 'Whose side are you here to celebrate?',
    sideWelcome: { groom: "Welcome to the groom's side", bride: "Welcome to the bride's side" },
    countdown: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
    sideToggle: { groom: "Siddhant's Side", bride: "Samiksha's Side" },
    discover: 'Discover',
    close: 'Close',
    reveal: 'Reveal',
    meetThem: 'Meet Them',
    venueLabel: 'Venue',
    dateLabel: 'Date',
    timeLabel: 'Time',
    chapters: ['Chapter One', 'Chapter Two', 'Chapter Three', 'Chapter Four', 'Chapter Five', 'Chapter Six'],
    madeWith: 'Made with love',
    engagedFor: 'Happily engaged for',
    countingLine: '…and counting, all the way to the mandap.',
    groomLabel: 'The Groom',
    brideLabel: 'The Bride',
    getDirections: 'Get directions',
    viewInvite: 'View invite',
    scanForLocation: 'Scan for location',
    download: 'Download',
    closeInvite: 'Close invitation',
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
    // Shared details sit on the event; `groom` and `bride` hold what differs by side.
    // `design` names the family whose card an event wears on both sides, `title`
    // is its poetic name, `invite` drives "View invite" and `art` is the couple
    // as drawn on one of the invites.
    events: [
      {
        id: 'mehendi',
        name: 'Mehendi',
        day: 'Thursday',
        date: '03 December 2026',
        design: 'bride',
        title: 'Love, Written in Henna',
        groom: {
          time: '11:00 AM onwards',
          description: 'An intimate mehendi gathering at the groom\'s home — intricate henna, close family, and happy chatter.',
          venue: {
            name: 'Nagpur',
            address: '203, Vedant Shine Appt., Ramkrishna Housing Society, Narendra Nagar, Wardha Rd., Nagpur – 440015',
            mapLink: 'https://www.google.com/maps/search/?api=1&query=203+Vedant+Shine+Appt+Ramkrishna+Housing+Society+Narendra+Nagar+Wardha+Rd+Nagpur+440015',
          },
          invite: invites.groomMehendi,
          art: art('mehendi-groom', 720, 610, 'Illustration of Siddhant laughing in a green kurta and marigold garland, seated on a cushion inside a marigold arch and holding up his hennaed hands'),
        },
        bride: {
          time: '1:00 PM onwards',
          description: 'Intricate henna, music, and an afternoon full of joy — right here at Suvi Palace.',
          venue: suviPalace,
          invite: invites.brideMehendi,
          art: art('mehendi-bride', 720, 610, 'Illustration of Samiksha laughing in a pink blouse and green skirt, seated on a cushion inside a marigold arch and holding up her hennaed hands'),
        },
      },
      {
        id: 'haldi',
        name: 'Halad Chadavane',
        day: 'Friday',
        date: '04 December 2026',
        time: 'Morning',
        venue: suviPalace,
        description: 'The auspicious halad ceremony — turmeric blessings from loved ones, laughter, and the golden glow of new beginnings.',
        design: 'bride',
        title: 'The Glow Before the Vows',
        invite: invites.brideHaldi,
        art: art('haldi', 720, 619, 'Illustration of Samiksha and Siddhant laughing, smeared with haldi, seated on low wooden stools under a marigold arch with a bowl of turmeric before them'),
      },
      {
        id: 'sangeet',
        name: 'Sangeet Sandhya',
        day: 'Friday',
        date: '04 December 2026',
        time: 'Evening',
        venue: suviPalace,
        description: 'A night of dance, music, and celebration. Come ready to move!',
        design: 'bride',
        title: 'The Dance Before the Seven Steps',
        invite: invites.brideSangeet,
        art: art('sangeet', 720, 493, 'Illustration of Samiksha in a pink lehenga and Siddhant in a white tuxedo dancing inside a ring of fairy lights and roses, with a speaker and a guitar beside them'),
      },
      {
        id: 'lagna',
        name: 'Lagna Sohala',
        kicker: 'शुभविवाह',
        day: 'Saturday',
        date: '05 December 2026',
        time: 'Muhurth · 12:13 PM',
        venue: suviPalace,
        description: 'The sacred ceremony where two hearts become one — Antarpat, Mangalashtaka and Saptapadi, followed by wedding celebrations.',
        art: art('lagna', 720, 613, 'Illustration of Samiksha and Siddhant holding wedding garlands on either side of the antarpat, inside a ring of pink and yellow flowers'),
        groom: { invite: invites.groomWedding },
        bride: { title: 'Seven Steps to Forever', tagline: 'Two souls. One journey.', invite: invites.brideWedding },
      },
    ],
  },

  reception: {
    heading: 'Reception',
    subheading: 'An evening of joy, laughter & togetherness',
    groom: {
      id: 'reception',
      name: 'Reception',
      kicker: 'स्वागत समारंभ',
      day: 'Monday',
      date: '07 December 2026',
      time: '7:00 PM onwards',
      venue: {
        name: 'Jerryl Lawns',
        address: 'Near Police Training School, Opp. Neeri High School, Laxminagar, Nagpur, Maharashtra 440022',
        mapLink: 'https://maps.app.goo.gl/mcbGs3rCCwASUY188',
      },
      description: 'Join us for an unforgettable evening of celebration as we toast to new beginnings with the groom\'s loved ones.',
      invite: invites.groomWedding,
      // The couple as drawn on the Dalal family's wedding invite
      art: art('reception', 720, 636, 'Illustration of Siddhant in a blue suit and Samiksha in an ivory lehenga on a reception stage, framed by a ring of roses, fairy lights and candles'),
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

  invitations: {
    heading: 'Our Invitations',
    subheading: 'Tap an invitation to view it or save a copy',
    groom: [invites.groomWedding],
    bride: [invites.brideMehendi, invites.brideHaldi, invites.brideSangeet, invites.brideWedding],
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
          name: 'Sohel',
          photo: `${base}images/groomsmen/sohel.jpg`,
          description: 'The All Rounder',
        },
        {
          name: 'Aashish',
          photo: `${base}images/groomsmen/aashish.jpg`,
          description: 'The Minion',
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

  footer: {
    closing: 'With Love',
    year: 2026,
  },
};
