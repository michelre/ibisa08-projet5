import Link from "next/link";
import Image from "next/image";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <main className={styles.hero}>
        <div className={styles.overlay}>
          <Link href="/" aria-label="Retour à l'accueil" className={styles.logoLink}>
            <Image
              src="/logo-les-petits-plats.svg"
              alt="Les Petits Plats"
              width={190}
              height={26}
              priority
            />
          </Link>

          <div className={styles.content}>
            <div className={styles.code}>404 :(</div>
            <div className={styles.message}>La page que vous demandez est introuvable.</div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>Copyright © 2025 - Les Petits Plats</footer>
    </div>
  );
}