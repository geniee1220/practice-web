'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/navigation.module.css';

function Navigation() {
  const path = usePathname();
  console.log(path);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
          {path === '/' && <span>🏠</span>}
        </li>
        <li>
          <Link href="/about-us">About</Link>
          {path === '/about-us' && <span>📚</span>}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
