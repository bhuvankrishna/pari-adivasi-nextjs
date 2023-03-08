import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
    return(
        <header className={styles.header}>
      <nav>
        <ul className={styles.nav__ul}>
          <li className={styles.nav__li}>
            <Link href="/paintings">
                Home
            </Link>
          </li>
          <li className={styles.nav__li}>
            <Link href="#">
                About
            </Link>
          </li>
          <li className={styles.nav__li}>
            <Link href="/paintings">
                Paintings
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className={styles.nav__h1}>Pari</h1>
    </header>
    );
};

export default Header;