import NextLink from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
        <div className={styles.linkContainer}>
    <div className={styles.header}>
      <NextLink className={styles.headerText} href="/join"><span>Join Game</span></NextLink>
    </div></div>
    <div className={styles.linkContainer}>
    <div className={styles.header}>
      <NextLink className={styles.headerText} href="/create"><span>Create Game</span></NextLink>
    </div></div>
    </div>
  );
}
