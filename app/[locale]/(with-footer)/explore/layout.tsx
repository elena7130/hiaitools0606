import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

  return {
    title: 'AI Tools | HIAI',
    description: 'Curated AI tools to help professionals work smarter, learn faster, and achieve more.',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/explore`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
