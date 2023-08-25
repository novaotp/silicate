'use client'

import { useRef, FormEvent } from 'react'

import InputField from "../shared/InputField";

export default function SignUpComponent() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log(name, email, password);
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