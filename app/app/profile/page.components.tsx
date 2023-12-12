
"use client";

import { Loading } from '@app/_components/Loading';
import { useUser } from '@libs/hooks/useUser';

/** The main component of the profile page. */
export const Profile = (): JSX.Element => {
  const user = useUser();

  return (
    <div>
      {
        !user
        ? <Loading text="Chargement de ton profil..." />
        : <>
            <input
              type="text"
              value={user.firstName}
              placeholder="Votre prénom ici..."
            />
            <input
              type="text"
              value={user.lastName}
              placeholder="Votre nom ici..."
            />
            <input
              type="email"
              value={user.email}
              placeholder="Votre email ici..."
            />
          </>
      }
    </div>
  )
}
