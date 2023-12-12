
"use client";

// Ract + Next
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

// Internal
import { verify } from '@/utils/jwt';
import { checkCredentials } from './server';
import { useToast } from '@/libs/contexts/ToastContext';

/// -- Components -- ///
import {
  AlternativeLink,
  Form,
  Header,
  Input,
  Main,
  Submit,
  Window
} from '../shared';

/** Returns the main component for the log-in page. */
export const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { showToast } = useToast();

  const resetPassword = () => {
    setPassword("");
  }

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const jwt = await checkCredentials(email, password);

    if (!jwt) {
      showToast('Votre email ou mot de passe est incorrect.', "error");
      resetPassword();
      return;
    }

    const payload = await verify(jwt);

    setCookie("id", jwt, { maxAge: payload.exp! - payload.iat! });

    showToast('Vous êtes connecté avec succès.', "success");
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
