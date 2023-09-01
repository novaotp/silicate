'use client'

// React / Next
import { useRef, FormEvent } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import SilicateLogo from '@public/silicate_logo.svg';
import { AuthResponseProps, LoginProps } from '@shared/interfaces';
import { loginController } from '../../../backend/controllers';
import { InputField, SubmitButton, AlternativeLink } from '../shared';
import styles from './index.module.scss';
import { clientRoute } from '@shared/utils/route';

export default function LoginComponent() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    const data: LoginProps = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    const result: AuthResponseProps = await loginController(data);

    if (!result.success) {
      alert(result.message)
    } else {
      router.push(clientRoute.app.use());
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeWrapper}>
        <h1>Re-bienvenue sur</h1>
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
          <SubmitButton label="Connexion" />
        </form>
        <AlternativeLink text="Mot de passe oublié ?" href='/auth/reset-password' linkLabel='Change-le' />
        <AlternativeLink text="Pas encore de compte ?" href='/auth/sign-up' linkLabel='Crées-en un' />
      </div>
    </div>
  )
}