import '../styles/global.css';

import { Metadata } from 'next';
import Navigation from '../components/navigation';

export const metadata: Metadata = {
  title: {
    template: '%s | Next Movies',
    default: 'Loading...',
  },
  description: 'The Best movies in one place',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
