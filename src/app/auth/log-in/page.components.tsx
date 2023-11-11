
"use client";

// Ract + Next
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

// Internal
import { verify } from '@/utils/jwt';
import { logIn } from './server';

/// -- Components -- ///
import {
  AlternativeLink,
  Form,
  Header,
  Input,
  Main,
  Submit,
  Window
} from '../_components';

/** Returns the main component for the log-in page. */
export const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const resetPassword = () => {
    setPassword("");
  }

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const jwt = await logIn(email, password);

    if (!jwt) {
      alert("Invalid credentials");
      resetPassword();
      return;
    }

    const payload = await verify(jwt);

    setCookie("id", jwt, { expires: new Date(payload.exp! * 1000) });

    router.push('/app');
  }

  return (
    <Window>
      <Header title="Re-bienvenue sur" />
      <Main>
        <Form onSubmit={handleOnSubmit}>
          <Input type="email" label="Email" placeholder="Entre ton email ici..." value={email} setValue={setEmail} />
          <Input type="password" label="Mot de passe" placeholder="Entre ton mot de passe ici..." value={password} setValue={setPassword} />
          <Submit label="Connexion" />
        </Form>
        <AlternativeLink text="T'as pas encore de compte ?" href='/auth/sign-up' label='Crées-en un' />
      </Main>
    </Window>
  )
}
