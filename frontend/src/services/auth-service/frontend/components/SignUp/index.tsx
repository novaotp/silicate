'use client'

// React / Next
import { useRef, FormEvent } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Internal
import SilicateLogo from '@public/silicate_logo.svg'
import { AuthResponseProps, SignUpProps, TokenResponseProps } from '@shared/interfaces';
import { clientRoute } from '@shared/classes/route';
import { newCookie, signUpController, verifyTokenController } from '../../../backend/controllers';
import styles from './index.module.scss';
import { InputField, SubmitButton, AlternativeLink } from '../shared';

export default function SignUpComponent() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSignUp = async (): Promise<AuthResponseProps> => {
    const formData = new FormData(formRef.current!);

    const data: SignUpProps = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    const response: AuthResponseProps = await signUpController(data);

    return response;
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const authResponse: AuthResponseProps = await handleSignUp();

    if (!authResponse.success) {
      return alert(authResponse.message);
    }

    const tokenResponse: TokenResponseProps = await verifyTokenController({ jwt: authResponse.jwt });

    if (!tokenResponse.payload) {
      router.push(clientRoute.auth.login.use());
    }

    await newCookie("id", authResponse.jwt!, tokenResponse.payload.exp! * 1000);

    router.push(clientRoute.app.use());
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
            pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/"
          />
          <InputField
            type="password"
            label="Mot de passe"
            placeholder="Entre ton mot de passe ici..."
            name="password"
          />
          <SubmitButton label="Créer mon compte" />
        </form>
        <AlternativeLink text="T'as déjà un compte ?" href={clientRoute.auth.login.use()} linkLabel='Connecte-toi' />
      </div>
    </div>
  )
}