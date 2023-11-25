
"use client";

// React + Next
import { type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

// Internal
import { signUp } from './server';

/// -- Components -- ///
import {
  Window,
  AlternativeLink,
  Form,
  Header,
  Input,
  Main,
  Switcher
} from '../_components';
import { useToast } from '@/libs/contexts/ToastContext';

/** Returns the main component for the sign-up page. */
export const SignUp = (): JSX.Element => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();
  const { showToast } = useToast();

  const handleOnSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    if (!await signUp(data)) {
      showToast('Impossible d\'enregistrer votre compte.', "error");
      return;
    }

    showToast('Votre compte a bien été enregistré.', "success");
    router.push('/auth/log-in');
  }
  
  return (
    <Window>
      <Header title="Bienvenue sur" />
      <Main>
        <Form onSubmit={handleOnSubmit}>
          <Switcher>
            <div>
              <Input label="Prénom" placeholder="Entre ton prénom ici..." value={firstName} setValue={setFirstName} />
              <Input label="Nom de famille" placeholder="Entre ton nom de famille ici..." value={lastName} setValue={setLastName} />
            </div>
            <div>
              <Input label="Email" placeholder="Entre ton email ici..." value={email} setValue={setEmail} type="email" />
              <Input label="Mot de passe" placeholder="Entre ton mot de passe ici..." value={password} setValue={setPassword} type='password' />
              <Input label="Confirmer le mot de passe" placeholder="Entre ton mot de passe ici..." value={confirmPassword} setValue={setConfirmPassword} type="password" />
            </div>
          </Switcher>
        </Form>
        <AlternativeLink text="T'as déjà un compte ?" href='/auth/log-in' label='Connecte-toi' />
      </Main>
    </Window>
  )
}
