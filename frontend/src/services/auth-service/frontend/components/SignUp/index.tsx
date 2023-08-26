'use client'

import { useRef, FormEvent } from 'react'
import Image from 'next/image';

import { SignUpProps } from '@shared/interfaces';
import { signUpController } from '../../../backend/controllers';
import SilicateLogo from '@public/silicate_logo.svg'

import styles from './index.module.css';
import { InputField, SubmitButton, AlternativeLink } from '../shared';

export default function SignUpComponent() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    const data: SignUpProps = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    await signUpController(data)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeWrapper}>
        <h1>Welcome to</h1>
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
            label="Name"
            placeholder="Entre ton nom complet ici..."
            name="name"
          />
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
          <SubmitButton label="Créer mon compte" />
        </form>
        <AlternativeLink text="T'as déjà un compte ?" href='/auth/login' linkLabel='Connecte-toi' />
      </div>
    </div>
  )
}