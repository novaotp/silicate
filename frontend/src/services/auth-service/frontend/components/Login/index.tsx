'use client'

import { useRef, FormEvent } from 'react'

import InputField from "../shared/InputField";

export default function LoginComponent() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log(email, password);
  }

  return (
    <div>
      <form ref={formRef} onSubmit={handleFormSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}