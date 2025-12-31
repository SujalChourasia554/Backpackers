import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logoLink}>
          <span className={styles.logoText}>
            <span className={styles.logoBlue}>Go</span>
            <span className={styles.logoOrange}>Trip</span>
          </span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/explore" className={styles.navLink}>Search</Link>
          <Link href="/moments" className={styles.navLink}>Moments</Link>
          <Link href="/login" className={styles.loginButton}>Login</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
