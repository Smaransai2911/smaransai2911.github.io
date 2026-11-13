// Small brand glyphs as inline SVG (lucide no longer ships brand icons).
const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true }

export const GitHubIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)

export const LinkedInIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

export const AmazonIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M14.2 10.3c0 1.2.03 2.2-.58 3.27-.5.87-1.28 1.4-2.16 1.4-1.2 0-1.9-.92-1.9-2.27 0-2.67 2.4-3.15 4.64-3.15v.75Zm3.14 7.6a.65.65 0 0 1-.74.07c-1.04-.86-1.23-1.26-1.8-2.08-1.72 1.75-2.94 2.28-5.17 2.28-2.64 0-4.7-1.63-4.7-4.9 0-2.55 1.38-4.28 3.35-5.13 1.7-.75 4.08-.88 5.9-1.09v-.4c0-.75.06-1.64-.38-2.29-.38-.58-1.12-.82-1.77-.82-1.2 0-2.27.62-2.53 1.9-.05.29-.26.57-.55.58l-3.06-.33c-.26-.06-.54-.27-.47-.67C6.2 1.7 9.07.8 11.63.8c1.31 0 3.02.35 4.05 1.34 1.31 1.22 1.19 2.85 1.19 4.62v4.18c0 1.26.52 1.81 1.01 2.49.17.24.21.53 0 .7-.55.46-1.52 1.3-2.05 1.77l-.5-.01Z" />
  </svg>
)

export const UnsplashIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M7.5 6.75V0h9v6.75h-9Zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5Z" />
  </svg>
)

export const InstagramIcon = (p) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const GoodreadsIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="Georgia, serif">g</text>
  </svg>
)

export const socialIcons = {
  goodreads: GoodreadsIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  amazon: AmazonIcon,
  unsplash: UnsplashIcon,
  instagram: InstagramIcon,
}
