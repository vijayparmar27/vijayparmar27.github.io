import type { Capability, Job, Metric, StackGroup } from './types';

export const SITE = {
  name: 'Vijay Parmar',
  role: 'Full Stack Developer',
  title: 'Vijay Parmar — Full Stack Developer',
  description:
    'Full Stack Developer with five years in Node.js, TypeScript, Socket.IO and Redis. Real-time multiplayer game engines, live driver tracking and freight operations at scale.',
  ogDescription:
    'I build the real-time layer underneath apps. Node.js, TypeScript, Socket.IO, Redis.',
  url: 'https://vijayparmar27.github.io/',
  email: 'vijayparmar0027@gmail.com',
  phone: '+91 81403 11309',
  phoneHref: '+918140311309',
  location: 'Rajkot / Surat · India',
  themeColor: '#070709',
  socials: [
    { label: 'GitHub', url: 'https://www.github.com/vijayparmar27' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/vijay-parmar-00467b2b8/' },
    { label: 'Instagram', url: 'https://www.instagram.com/_vijay__parmar_/' },
  ],
} as const;

export const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#capabilities', label: 'Approach' },
  { href: '#stack', label: 'Stack' },
] as const;

export const RAIL_LINKS = [
  { id: 'top', label: 'Intro' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'capabilities', label: 'Approach' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
] as const;

export const HERO_METRICS: Metric[] = [
  { value: '5 yrs', label: 'Building production backends since 2021' },
  { value: '12', label: 'White-label game platforms on one engine' },
  { value: '10K+', label: 'Concurrent trips held live at peak' },
  { value: '40%', label: 'Faster freight quote turnaround at WAL' },
];

export const MARQUEE_ITEMS = [
  'TypeScript',
  'Node.js',
  'Socket.IO',
  'Redis',
  'MongoDB',
  'React.js',
  'Next.js',
  'FastAPI',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'AWS',
  'React Native',
  'BullMQ',
  'GraphQL',
];

export const JOBS: Job[] = [
  {
    period: 'Apr 2025 — Dec 2025',
    location: 'Rajkot, India',
    length: '9 months',
    role: 'Full Stack Developer',
    company: 'Logistic Infotech Pvt Ltd',
    bullets: [
      'Built WAL, a freight-operations platform, end to end — Quotes, Orders, Carriers and Customer Management as connected modules, React.js front end on a Sails.js / MySQL backend.',
      'Architected a carrier-selection flow that ranks carriers based on rate and availability, reducing quote turnaround time by 40%.',
      'Engineered live shipment tracking using Socket.IO to provide real-time state synchronization for operations staff and customers.',
    ],
    chips: ['React.js', 'Sails.js', 'Node.js', 'TypeScript', 'Socket.IO', 'MySQL', 'PostgreSQL'],
  },
  {
    period: 'Apr 2024 — Feb 2025',
    location: 'Rajkot, India',
    length: '11 months',
    role: 'MEAN Stack Developer',
    company: 'Elluminati Inc',
    bullets: [
      'Built the backend for an Uber-style on-demand mobility product: trip lifecycle, live driver location tracking, in-app rider–driver chat and a multi-channel notification system.',
      'Optimized driver geo-state modeling in Redis for low-latency nearest-driver lookups, and scaled Socket.IO rooms to support 10,000+ concurrent trips at peak.',
      'Designed and documented the REST API consumed by three clients — rider app, driver app and admin panel.',
    ],
    chips: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Socket.IO', 'TypeScript', 'AWS'],
  },
  {
    period: 'Mar 2021 — Mar 2024',
    location: 'Surat, India',
    length: '3 years',
    role: 'Node.js Developer',
    company: 'Artoon Solutions',
    bullets: [
      'Built real-time multiplayer game backends — point / pool / deal rummy, Teen Patti, CallBreak and Roulette — covering table lifecycle, turn timers, bet settlement and mid-hand reconnection over Socket.IO.',
      'Kept live game state in Redis and match history in MongoDB so a dropped player could rejoin the same hand instead of forfeiting; shipped MultiTable Rummy for concurrent seats across tables.',
      'Deployed a standardized core engine across 12 white-label platforms, reducing new-platform launch time from weeks to days.',
    ],
    chips: ['Node.js', 'TypeScript', 'Socket.IO', 'Redis', 'MongoDB', 'Express'],
  },
];

export const CAPABILITIES: Capability[] = [
  {
    title: 'Real-time systems',
    body: 'Socket.IO room topology, authoritative server state, turn timers and mid-session reconnection — the parts that decide whether a live product feels solid or flaky.',
  },
  {
    title: 'API architecture',
    body: 'REST and GraphQL services in Node and FastAPI, documented as contracts so three separate clients can build against them without guessing.',
  },
  {
    title: 'Data & caching',
    body: 'Redis for hot state and geo lookups, MongoDB for event history, MySQL and PostgreSQL where relational integrity matters. Schema design first, indexes second.',
  },
  {
    title: 'Cloud & DevOps',
    body: 'Dockerized services on AWS EC2 and S3, Kubernetes (CKAD), CI/CD automation and BullMQ for background jobs and scheduled work.',
  },
  {
    title: 'Product front ends',
    body: 'React and Next.js for web, Expo React Native for Android and iOS — enough front-end depth to own a feature from database to screen.',
  },
  {
    title: 'Game logic',
    body: 'Rummy variants, Teen Patti, CallBreak and Roulette: trick evaluation, bet settlement, rake and payout rules that have to be exactly right, every hand.',
  },
];

export const STACK_GROUPS: StackGroup[] = [
  { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++'] },
  {
    name: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'FastAPI',
      'Socket.IO',
      'REST APIs',
      'GraphQL',
      'gRPC (basic)',
      'Microservices',
    ],
  },
  { name: 'Frontend', items: ['React.js', 'Next.js', 'React Native', 'Tailwind CSS', 'HTML & CSS'] },
  { name: 'Database', items: ['MongoDB', 'Redis', 'PostgreSQL', 'MySQL'] },
  {
    name: 'Cloud & DevOps',
    items: ['AWS (EC2, S3, SNS, SES)', 'Docker', 'Kubernetes (CKAD)', 'CI/CD automation', 'BullMQ'],
  },
];

export const EDUCATION = {
  school: 'Government Engineering College, Godhra',
  detail: 'Bachelor of Engineering · Gujarat Technological University · 2016 — 2020',
};
