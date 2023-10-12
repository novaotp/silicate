
'use client';

// Next
import Link from 'next/link';

// Internal
import styles from './page.module.scss';
import { clientRoute } from '@shared/classes/routes';

/** The main component of the landing page. */
const LandingComponent = (): JSX.Element => {
  return (
    <div className={styles.window}>
      <div className={styles.section1}>
        <h1 className={styles.title}>Silicate</h1>
        <h2 className={styles.subTitle}>L'appli pour gérer ta vie scolaire facilement</h2>
        <p className={styles.paragraph}>
          Tu es étudiant et submergé par les devoirs, les cours et
          les dates limites ? Pas de soucis ! Avec Silicate, organise-toi
          en un clin d'œil et dis adieu au stress. C'est comme avoir un
          assistant perso pour ton école, mais en mieux !
        </p>
        <Link className={`${styles.links} ${styles.signup}`} href={clientRoute.auth.signup.use()}>Inscris-toi</Link>
        <p className={styles.linksDelimitor}>ou</p>
        <Link className={`${styles.links} ${styles.login}`} href={clientRoute.auth.login.use()}>Se connecter</Link>
      </div>
    </div>
  )
}

export default LandingComponent;
