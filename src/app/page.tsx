// Next
import { type Metadata } from "next";

// Internal
import { RegisterLink, LogInLink } from "@components/home";

export const metadata: Metadata = {
    title: "Home - Silicate",
};

/** The main page of the website. */
const Page = (): JSX.Element => {
    return (
        <div className='relative flex h-full w-full flex-col justify-center bg-[bg-color] p-8'>
            <h1 className='bg-gradient-to-r from-purple-600 from-30% to-indigo-200 bg-clip-text text-4xl font-bold'>
                Silicate
            </h1>
            <h2 className='my-4 text-justify text-xl font-semibold text-text-color'>
                L'appli pour gérer ta vie scolaire facilement
            </h2>
            <p className='my-4 text-justify text-gray-400'>
                Tu es étudiant et submergé par les devoirs, les cours et les
                dates limites ? Pas de soucis ! Avec Silicate, organise-toi en
                un clin d'œil et dis adieu au stress. C'est comme avoir un
                assistant perso pour ton école, mais en mieux !
            </p>
            <div className='relative mt-5 flex flex-col'>
                <RegisterLink />
                <p
                    className="relative text-center text-gray-400
          before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-2/5 before:bg-gray-400 before:content-['']
          after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-2/5 after:bg-gray-400 after:content-['']"
                >
                    ou
                </p>
                <LogInLink />
            </div>
        </div>
    );
};

export default Page;
