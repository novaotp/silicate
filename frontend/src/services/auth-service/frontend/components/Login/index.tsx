'use client'

import { useRef, FormEvent } from 'react'
import Image from 'next/image';

import SilicateLogo from '@public/silicate_logo.svg';
import { LoginProps } from '@shared/interfaces';
import { loginController } from '../../../backend/controllers';

import { InputField, SubmitButton, AlternativeLink } from '../shared';
import styles from './index.module.css';

export default function LoginComponent() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    const data: LoginProps = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    await loginController(data)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeWrapper}>
        <h1>Welcome back to</h1>
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
            label="Password"
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