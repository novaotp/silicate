
'use client';

// Next
import Link from 'next/link';

// Internal
import styles from './page.module.scss';
import { clientRoute } from '@shared/classes/route';

interface FeatureCardProps {
  title: string,
  text: string,
}

function FeatureCard({ title, text }: FeatureCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  )
}

/** The component on the landing page. */
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
      {/* <div className={styles.section2}>
        <h2 className={styles.subTitle}>Fonctionnalités</h2>
        <Link className={styles.details} href={clientRoute.features.use()}>La liste complète ici</Link>
        <FeatureCard
          title="Maîtrisez Vos Notes"
          text="Gérez vos notes efficacement : ajoutez
                des pondérations, calculez votre moyenne
                et numérisez vos examens !"
        />
        <FeatureCard
          title="Jamais Oublié, Toujours Notifié"
          text="Garde une longueur d'avance sur tes
                tâches avec nos rappels et note facilement
                toutes tes échéances !"
        />
        <FeatureCard
          title="Connecte et Collabore"
          text="Crée ou rejoins des groupes, partage des
                fichiers et collabore sur des devoirs,
                tout ça en un seul endroit !"
        />
      </div> */}
    </div>
  )
}

export default LandingComponent;
