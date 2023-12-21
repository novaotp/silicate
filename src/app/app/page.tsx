// React + Next
import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";

// Internal
import { useUser } from "@libs/hooks/useUser/server";
import SilicateLogo from "@public/SilicateAppIconBlackVertical.png";
import { Loading } from "@components/shared";

export const metadata: Metadata = {
    title: "Dashboard - Silicate",
};

/**
 * Renders the dashboard page.
 *
 * - Greets the user with his first name.
 */
const Page = async (): Promise<JSX.Element> => {
    const user = await useUser();

    if (!user) {
        redirect("/auth/log-out");
    }

    return (
        <div className='relative flex h-full w-full flex-col items-center justify-center p-5'>
            <Suspense
                fallback={<Loading text="Chargement de l'utilisateur..." />}
            >
                <h1 className='text-3xl'>
                    <span>Bonjour</span>
                    &nbsp;
                    <span className='font-bold'>{user.firstName}</span>
                </h1>
                <Image src={SilicateLogo} alt='Silicate Logo' height={300} />
            </Suspense>
        </div>
    );
};

export default Page;
