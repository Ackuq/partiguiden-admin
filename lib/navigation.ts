export const PAGES = {
  home: {
    href: '/',
    name: 'Hem',
  },
  subjects: {
    href: '/subjects',
    name: 'Ämnen',
  },
  parties: {
    href: '/parties',
    name: 'Partier',
  },
  standpoints: {
    href: '/standpoints',
    name: 'Ståndpunkter',
  },
} as const;

export const HEADER_LINKS = [
  PAGES.subjects,
  PAGES.parties,
  PAGES.standpoints,
] as const;
