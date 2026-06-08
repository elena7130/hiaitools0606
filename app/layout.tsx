import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Hi AI Tools',
    default: 'Hi AI Tools - Discover the Best AI Tools',
  },
  description:
    'Hi AI Tools collects and categorizes AI products from around the world, helping you quickly find the best AI tools for writing, marketing, coding, design, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
