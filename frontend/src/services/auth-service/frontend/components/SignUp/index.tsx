'use client'

import { useRef, FormEvent } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SignUpProps } from '@shared/interfaces';
import { signUpController } from '../../../backend/controllers';
import SilicateLogo from '@public/silicate_logo.svg'

import styles from './index.module.css';
import { InputField, SubmitButton, AlternativeLink } from '../shared';
import { clientRoute } from '@shared/utils/route';

export default function SignUpComponent() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    const data: SignUpProps = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    const response = await signUpController(data);

    if (!response.success) {
      alert(response.message);
    } else {
      router.push(clientRoute.auth.login.use())
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeWrapper}>
        <h1>Bienvenue sur</h1>
        <Image
          src={SilicateLogo}
          alt="Silicate Logo"
          width={200}
          height={100}
        />
      </div>
      <div className={styles.formWrapper}>
        <form className={styles.form} ref={formRef} onSubmit={handleFormSubmit}>
          <InputField
            type="text"
            label="Prénom"
            placeholder="Entre ton prénom ici..."
            name="firstName"
          />
          <InputField
            type="text"
            label="Nom de famille"
            placeholder="Entre ton nom de famille ici..."
            name="lastName"
          />
          <InputField
            type="email"
            label="Email"
            placeholder="Entre ton email ici..."
            name="email"
          />
          <InputField
            type="password"
            label="Mot de passe"
            placeholder="Entre ton mot de passe ici..."
            name="password"
          />
          <SubmitButton label="Créer mon compte" />
        </form>
        <AlternativeLink text="T'as déjà un compte ?" href='/auth/login' linkLabel='Connecte-toi' />
      </div>
    </div>
  )
}