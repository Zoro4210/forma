import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Forma — Sunday, a modular sofa.',
  description: 'Sunday by Forma. Explore the modular sofa in three woven finishes, inspect the upholstery, and view dimensions and care notes.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
