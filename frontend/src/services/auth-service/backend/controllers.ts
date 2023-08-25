'use server'

import { SignUpProps } from "@shared/interfaces";

export async function signUpController(data: SignUpProps) {
  const url = process.env.API_SERVER_URL + '/signup';
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  const response = await fetch(url, init);
  const result = await response.json();
}