
"use client";

import Loading from '@/components/shared/Loading';
import useAccount from '@hooks/useAccount';

/** The main component of the profile page. */
const Profile = (): JSX.Element => {
  const { account, updateAccountField, isError, isLoading } = useAccount();

  if (isError) return <p>An error occurred while fetching the requested resource...</p>
  if (isLoading) return <Loading text="Chargement de vos données..." />

  return (
    <div>
      <input
        type="text"
        value={account.firstName}
        onChange={(event) => updateAccountField('firstName', event.target.value)}
        placeholder="Votre prénom ici..."
      />
      <input
        type="text"
        value={account.lastName}
        onChange={(event) => updateAccountField('lastName', event.target.value)}
        placeholder="Votre nom ici..."
      />
      <input
        type="email"
        value={account.email}
        onChange={(event) => updateAccountField('email', event.target.value)}
        placeholder="Votre email ici..."
      />
    </div>
  )
}

export default Profile;
