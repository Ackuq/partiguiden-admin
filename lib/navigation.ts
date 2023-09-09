const pages = {
  home: {
    href: '/',
    name: 'Home',
  },
  subjects: {
    href: '/subjects',
    name: 'Subjects',
  },
  parties: {
    href: '/parties',
    name: 'Parties',
  },
  standpoints: {
    href: '/standpoints',
    name: 'Standpoints',
  },
} as const;

export const headerLinks = [
  pages.subjects,
  pages.parties,
  pages.standpoints,
] as const;
