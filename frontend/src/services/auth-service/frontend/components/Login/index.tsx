'use client'

// React / Next
import { useRef, FormEvent } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import SilicateLogo from '@public/silicate_logo.svg';
import { AuthResponseProps, LoginProps, TokenResponseProps } from '@shared/interfaces';
import { loginController, newCookie, verifyTokenController } from '../../../backend/controllers';
import { InputField, SubmitButton, AlternativeLink } from '../shared';
import styles from './index.module.scss';
import { clientRoute } from '@shared/classes/route';

export default function LoginComponent() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleLogin = async (): Promise<AuthResponseProps> => {
    const formData = new FormData(formRef.current!);

    const data: LoginProps = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    const response: AuthResponseProps = await loginController(data);

    return response;
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const authResponse: AuthResponseProps = await handleLogin();

    if (!authResponse.success) {
      return alert(authResponse.message);
    }

    const tokenResponse: TokenResponseProps = await verifyTokenController({ jwt: authResponse.jwt });

    if (!tokenResponse.payload) {
      router.push(clientRoute.auth.login.use())
    }

    await newCookie("id", authResponse.jwt!, tokenResponse.payload.exp! * 1000);

    router.push(clientRoute.app.use());
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
        <AlternativeLink text="Pas encore de compte ?" href={clientRoute.auth.signup.use()} linkLabel='Crées-en un' />
      </div>
    </div>
  )
}