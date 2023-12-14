
// React + Next
import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

// Internal
import { useUser } from "@/libs/hooks/useUser";
import { Loading } from "@/components/shared";
import { TextInput } from "@/components/app/profile";

export const metadata: Metadata = {
  title: "Mon profil - Silicate"
}

/** The profile page. */
const Page = async (): Promise<JSX.Element> => {
  const user = await useUser();

  if (!user) {
    redirect('/auth/log-out');
  }

  return (
    <div className="relative w-full h-full p-5">
      <Suspense fallback={<Loading text="Chargement de l'utilisateur..." />}>
        <TextInput label="Prénom" name="firstName" placeholder="Votre prénom ici..." defaultValue={user.firstName} />
        <TextInput label="Nom" name="lastName" placeholder="Votre nom ici..." defaultValue={user.lastName} />
        <TextInput label="Email" name="email" placeholder="Votre email ici..." defaultValue={user.email} />
      </Suspense>
    </div>
  )
}

export default Page;
