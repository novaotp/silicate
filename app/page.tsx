
// Next
import { type Metadata } from 'next';

// Internal
import { RegisterLink, LogInLink } from '@components/home';

export const metadata: Metadata = {
  title: 'Home - Silicate'
}

/** The main page of the website. */
const Page = (): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[bg-color] p-8">
      <h1 className="text-4xl bg-gradient-to-r from-purple-600 from-30% to-indigo-200 bg-clip-text">Silicate</h1>
      <h2 className="text-justify text-xl text-text-color my-4">L'appli pour gérer ta vie scolaire facilement</h2>
      <p className="text-gray-400 text-justify my-4">
        Tu es étudiant et submergé par les devoirs, les cours et
        les dates limites ? Pas de soucis ! Avec Silicate, organise-toi
        en un clin d'œil et dis adieu au stress. C'est comme avoir un
        assistant perso pour ton école, mais en mieux !
      </p>
      <div className="relative mt-10">
        <RegisterLink />
        <p className="relative text-gray-400 text-center
          before:content-[''] before:absolute before:top-1/2 before:w-2/5 before:h-[1px] before:bg-gray-400 before:left-0
          after:content-[''] after:absolute after:top-1/2 after:w-2/5 after:h-[1px] after:bg-gray-400 after:right-0"
        >
          ou
        </p>
        <LogInLink />
      </div>
    </div>
  )
}

export default Page;
