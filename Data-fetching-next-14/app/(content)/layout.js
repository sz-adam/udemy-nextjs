import MainHeader from '@/components/MainHeader';
import '../globals.css';

export const metadata = {
  title: 'Next.js Page Routing & Rendering',
  description: 'Learn how to route to different pages.',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body id='page'>
        <MainHeader />
        {children}
        </body>
    </html>
  )
}
