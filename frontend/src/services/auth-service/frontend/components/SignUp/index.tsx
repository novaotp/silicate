'use client'

import { useRef, FormEvent } from 'react'

import InputField from "../shared/InputField";
import { SignUpProps } from '@shared/interfaces';
import { signUpController } from '../../../backend/controllers';

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
    <div>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <InputField
          type="text"
          placeholder="Entre ton nom complet ici..."
          name="name"
        />
        <InputField
          type="email"
          placeholder="Entre ton email ici..."
          name="email"
        />
        <InputField
          type="password"
          placeholder="Entre ton mot de passe ici..."
          name="password"
        />
        <button type="submit">Create my account</button>
      </form>
    </div>
  )
}