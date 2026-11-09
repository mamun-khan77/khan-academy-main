export const SITE = {
  name: 'Khan Academy',
  supportEmail: 'support@example.com',
  downloads: {
    android: 'https://play.google.com/store',
    ios: 'https://apps.apple.com',
    desktop: null as string | null,
  },
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com' },
    { label: 'YouTube', href: 'https://www.youtube.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  ],
  paymentMethods: ['bKash', 'Nagad', 'SSLCommerz', 'Bank Transfer'],
} as const;
