/**
 * Central content file. Edit values here; components never hard-code content.
 *
 * Fields marked `verified: false` (or listed under `todo`) are placeholders or
 * values carried over from earlier material that still need confirmation.
 */

export const site = {
  url: 'https://smaransai2911.github.io/',
  archiveUrl: '/archive/',
  copyrightStartYear: 2026,
  // Web3Forms: put the public access key in a .env file as VITE_WEB3FORMS_KEY,
  // or paste it below. (Web3Forms keys are public by design, but keep them out of git anyway.)
  web3formsAccessKey: import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
}

export const person = {
  name: 'Ganaparthi Sai Smaran',
  firstLine: 'Ganaparthi',
  accentLine: 'Sai Smaran',
  authorName: 'Sai Smaran',
  location: 'Bengaluru, India',
  badge: 'Apprentice at Volvo Group India · Bengaluru, India',
  tagline: 'Computer Science graduate building a career in technology and innovation, who also writes and photographs.',
  philosophy: [
    { word: 'Technology', verb: 'is how I build.' },
    { word: 'Literature', verb: 'is how I express.' },
    { word: 'Photography', verb: 'is how I observe.' },
  ],
}

export const social = {
  github: { label: 'GitHub', url: 'https://github.com/smaransai2911' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sai-smaran-ganaparthi-5b517624b' },
  amazon: { label: 'Amazon Author', url: 'https://www.amazon.in/stores/author/B0H62QDWWX' },
  goodreads: { label: 'Goodreads', url: 'https://www.goodreads.com/author/show/70918818.Sai_Smaran' },
  unsplash: { label: 'Unsplash', url: 'https://unsplash.com/@smaran__chowdary' },
  instagram: { label: 'Instagram', url: 'https://www.instagram.com/smaran__chowdary' },
}

export const contact = {
  // Shown as a fallback next to the form. Leave empty to hide.
  email: '',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'photography', label: 'Photography' },
  { id: 'contact', label: 'Contact' },
]

// Which sections each persona brings into focus. Nothing is ever hidden.
export const personas = [
  { id: 'all', label: 'All', sections: null },
  { id: 'technology', label: 'Technology', sections: ['experience', 'projects', 'skills'] },
  { id: 'author', label: 'Author', sections: ['publications'] },
  { id: 'photographer', label: 'Photographer', sections: ['photography'] },
]

export const about = {
  heading: 'More than one dimension.',
  paragraphs: [
    'I studied computer science because I liked the idea that a messy problem could be taken apart, understood and rebuilt as something that works. At Volvo Group India I am learning how that looks inside a large enterprise: data moving between tools, workflows being reshaped, and the patient work of making information usable.',
    'Away from the screen I write. I have self-published books on Kindle, mostly about memory, loss, weather and the things people carry without saying. Writing taught me that precision and feeling are not opposites.',
    'I also photograph, and share the results on Unsplash. A camera makes you wait for the moment, then decide what to leave out. I find that useful when I am designing anything.',
    'The Synaptic Archive is where these three habits meet: an experimental space of words and images that I keep alongside this portfolio.',
  ],
}

export const experience = [
  {
    id: 'volvo',
    organisation: 'Volvo Group India Pvt. Ltd.',
    role: 'NATS Graduate Apprentice Trainee',
    association: 'Innovation Expert',
    location: 'Bengaluru, India',
    start: 'August 2026',
    end: 'Present',
    // Learning / exposure areas only. These are NOT claims of delivered work.
    exposure: [
      'Alteryx workflows',
      'Databricks migration exposure',
      'SQL and database concepts',
      'Power BI',
      'Data transformation and analytics',
    ],
    note: 'Listed as areas of exposure and learning, not as completed deliverables.',
  },
]

export const education = [
  {
    id: 'alliance',
    institution: 'Alliance University',
    // Keep configurable: match the exact wording on the degree certificate.
    degree: 'B.Tech in Computer Science',
    period: '2022 – 2026',
    verified: false,
  },
]

export const certifications = {
  // Issuer wall only. Add `title`, `year`, `url`, `image` once each credential is verified.
  items: [
    { issuer: 'Microsoft', title: '', year: '', url: '', image: '' },
    { issuer: 'NVIDIA', title: '', year: '', url: '', image: '' },
    { issuer: 'Oracle', title: '', year: '', url: '', image: '' },
    { issuer: 'Tata', title: '', year: '', url: '', image: '' },
  ],
}

// Exposure areas, not proficiency ratings.
export const skills = [
  { group: 'Languages', items: ['Python', 'SQL'] },
  { group: 'Data & analytics tools', items: ['Power BI', 'Alteryx', 'Databricks'] },
  { group: 'Interests', items: ['AI / Machine Learning', 'Data engineering', 'Enterprise data workflows', 'Innovation'] },
]

const AMAZON_ECHOES = 'https://amzn.in/d/0f7qsr8X'
const AMAZON_GHOST = 'https://amzn.in/d/02eif5LI'
const AMAZON_WEATHER = 'https://amzn.in/d/08COmqGR'

/**
 * Excerpts are the author's own words, copied from the original Synaptic Archive
 * (the act whose source label names the book). Replace/extend with passages
 * you want to feature.
 */
export const books = [
  {
    id: 'echoes',
    title: 'Echoes of Heart',
    year: '2024', // from the archive's source label; confirm
    description: '',
    archiveNote: 'Writing from this book anchors Acts I and II of The Synaptic Archive.',
    amazon: AMAZON_ECHOES,
    cover: '/books/echoes-of-heart.webp',
    hue: 'from-[#2a1d0c] to-[#120d06]',
    excerpts: [
      {
        label: 'The Canvas of Shifting Shades · Act I',
        text: "As an AI/ML builder focused on intelligent systems, I know life isn't meant to be painted in a single color. One shade can never become a technical or creative masterpiece. Optimization alone isn't life. It's the shifting blend of raw engineering data algorithms and human experience that gives narrative digital spaces their true depth. Every emotion is a variable, making your path feel truly alive. It is the art you are actively living. Like a complex structural painting, if the patterns never change, neither will the final picture.",
      },
      {
        label: 'Shattered Trust within the Orbit · Act II',
        text: "As a contemporary published author, I map human experience against complex landscapes. I don't know why I trusted the structure, knowing it might break. But it shattered into countless architectural fragments. Pulling me into an unpredictable orbit, those deceptive words were secret letters to my heart. Writing through titles like Echoes of the Heart and The Ghost Note, I explore a love that flows with tears — a frequency entirely undeserved.",
      },
    ],
  },
  {
    id: 'ghost',
    title: 'The Ghost Note',
    year: '2025', // from the archive's source label; confirm
    description: '',
    archiveNote: 'Writing from this book anchors Act V of The Synaptic Archive.',
    amazon: AMAZON_GHOST,
    cover: '/books/the-ghost-note.webp',
    hue: 'from-[#0c1426] to-[#070a12]',
    excerpts: [
      {
        label: 'The Magic of the 11:00 PM Window Seat · Act V',
        text: "Some moments cannot be photographed. This is one of them. Picture this — a night journey, around 11 p.m. You're sitting by the window of a bus. You slide it open. That cold air rushes in — soft, gentle, alive. It brushes your face and something inside you feels lighter. You look outside. The moon is there — quiet, bright, distant. Not loud, not demanding — just present. Then it happens. A random song starts playing in your earphones — not the one you searched for, but the one you needed. The wind you feel. The moon you see. The thoughts you didn't plan to think. The song you didn't choose. Everything connects. You're not just watching the night — you're part of it. This belongs only to you. What you see in these frames isn't the moment. It's the closest the camera could get to the feeling — and sometimes, that's enough. The magic doesn't come when you try. It comes when you allow.",
      },
    ],
  },
  {
    id: 'weather',
    title: 'The Lyrics of Strange Weather',
    subtitle: 'A Collection of Unraveled Memories and Risen Moons',
    year: 'June 2026', // from the archive's source label; confirm
    description: '',
    archiveNote: 'Writing from this book anchors Acts III and IV of The Synaptic Archive.',
    amazon: AMAZON_WEATHER,
    cover: '/books/the-lyrics-of-strange-weather.webp',
    hue: 'from-[#0a1f1f] to-[#060f10]',
    excerpts: [
      {
        label: 'The Rainfall as Real Irrigation · Act III',
        text: "Developing deployable tools requires resilience when the storm rolls in. It will rain where your real ideas fall onto the earth. It's not the earth — it's the you who are feeling it, who are sensing it. Use those same tears, that same rain which was sad, to grow something back. A farming of happiness — where the same water that hurt you now feeds something new. If there is no rain, there won't be any farming, there won't be any greenish. Same way, if there are no tears, there won't be anything to clear them. You don't need any person beside you to clean the tears. But beside you, you need to be there. If you don't live here, who will carry you?",
      },
      {
        label: 'The Kinetic Force of Shifting Currents · Act IV',
        text: "Everything in nature moves. Leaves don't dance without the wind. Rivers don't flow without rain. Nothing moves on its own — something always pushes it forward. And you're no different. Without movement, nothing changes. Not your life, not your thoughts, not your path. You can look back — that's fine. But if you stay there, you become still. And stillness, when it lasts too long, turns into being stuck. Look at nature closely — the way water finds its path even through rocks. It never stops. It adapts. It moves. That's not illusion. That's how life works. So if you don't move yourself, nothing will move for you. You are the force behind your own change. The meaning, the direction, the growth — all of it begins with you taking a step.",
      },
    ],
  },
    {
    id: 'vision',
    title: 'The Vision Within',
    subtitle: 'From You to Me',
    year: '2026',,
    description: '',
    archiveNote: '',
    amazon: 'https://www.amazon.in/dp/B0H8NVVLM1',
    cover: '/books/the-vision-within.webp',
    hue: 'from-[#1d1226] to-[#0c0812]',
    excerpts: [],
  },
  {
    id: 'introduced',
    title: 'The Book That Introduced Me to Myself',
    subtitle: '',
    year: '2026',
    description: '',
    archiveNote: '',
    amazon: 'https://www.amazon.in/dp/B0HFDVJQK2',
    cover: '/books/the-book-that-introduced-me-to-myself.webp',
    hue: 'from-[#201a14] to-[#0d0b09]',
    excerpts: [],
  },
]

export const bookSection = {
  heading: 'Words that outlive moments.',
  support: 'Self-published on Kindle. A collection of emotions, memories, observations and stories.',
  authorPageUrl: social.amazon.url,
}

const U = (id) => `https://images.unsplash.com/photo-${id}?w=1200&auto=format&fit=crop&q=60`

/**
 * Add a photograph by appending one object: no component changes needed.
 * `src` may be a full URL or a file in /public/photography/.
 * `verified:false` = carried over from the original archive; confirm each is yours.
 * Categories below follow the themes of the five Archive acts.
 */
export const photoCategories = ['Colour & light', 'Shadow & distance', 'Rain & growth', 'Movement', 'Night']

export const photos = [
  ['Colour & light', '1676657894823-70bd0c6a0c28', 'Shifting colour landscape', 'landscape'],
  ['Colour & light', '1674563814872-79d5fa734bce', 'Golden-hour horizon', 'portrait'],
  ['Colour & light', '1684167852839-b89fcb6d645f', 'Atmospheric depth', 'landscape'],
  ['Colour & light', '1694279166754-f45555844a19', 'Light and shadow play', 'portrait'],
  ['Shadow & distance', '1768493429974-52e9d07077bd', 'Dusk horizon', 'landscape'],
  ['Shadow & distance', '1763786554581-5cb18e60e252', 'Heavy contrast architecture', 'portrait'],
  ['Shadow & distance', '1762688652758-91e52cb776be', 'Bare branches in winter light', 'landscape'],
  ['Shadow & distance', '1759495051146-32097d836633', 'Distance and perspective', 'portrait'],
  ['Rain & growth', '1759233476767-edf2af41be00', 'Overcast stormy weather', 'landscape'],
  ['Rain & growth', '1759024349639-b81602a5ef6a', 'Misty valley', 'portrait'],
  ['Rain & growth', '1759024349715-00fffb8daadb', 'Rain on green leaves', 'landscape'],
  ['Rain & growth', '1757345257922-cc53b89e56cf', 'Storm clouds moving', 'portrait'],
  ['Movement', '1743526374130-efea08ffab73', 'Current and waves', 'landscape'],
  ['Movement', '1743350337456-b90530e80a0d', 'Water in motion', 'portrait'],
  ['Movement', '1724691509855-a70c7160a489', 'Open nature, dynamic sky', 'landscape'],
  ['Movement', '1707271564416-1502779870f2', 'Forward motion', 'portrait'],
  ['Night', '1707271564450-b18fafe731b3', 'Moonrise silhouette', 'landscape'],
  ['Night', '1702036780861-53914558ab7e', 'Night sky exposure', 'portrait'],
  ['Night', '1702036780917-4035e59220aa', 'Midnight stillness', 'landscape'],
  ['Night', '1700497902480-a39ed899c13a', 'Late-hour gradient', 'portrait'],
].map(([category, id, caption, shape], i) => ({
  id: `p${i + 1}`,
  src: U(id),
  category,
  caption,
  location: '',
  shape,
  verified: false,
  link: '', // optional: direct Unsplash photo page
}))

export const photography = {
  heading: 'Through the lens.',
  support: 'Some moments are too quiet for words.',
  handle: '@smaran__chowdary',
  profileUrl: social.unsplash.url,
  // Earlier figures were "~140 photos" and "100K+ views" in one place and "160+" in another.
  // Not shown as verified facts. Set `showStats` true only after confirming current numbers.
  stats: { photoCount: '', views: '', showStats: false },
}
