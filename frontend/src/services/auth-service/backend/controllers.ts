'use server'

import { AuthResponseProps, LoginProps, SignUpProps, TokenResponseProps, VerifyTokenProps } from "@shared/interfaces";
import { serverRoute } from "@shared/utils/route";

export async function signUpController(data: SignUpProps): Promise<AuthResponseProps> {
  const url = process.env.API_SERVER_URL + serverRoute.auth.signup.use();
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: "no-store"
  }
  const response = await fetch(url, init);
  const result: AuthResponseProps = await response.json();

  return result;
}

export async function loginController(data: LoginProps): Promise<AuthResponseProps> {
  const url = process.env.API_SERVER_URL + serverRoute.auth.login.use();
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: "no-store"
  }
  const response = await fetch(url, init);
  const result: AuthResponseProps = await response.json();

  return result;
}

export async function verifyTokenController(data: VerifyTokenProps): Promise<TokenResponseProps> {
  const url = process.env.API_SERVER_URL + '/auth/verifytoken';
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: "no-store"
  }
  const response = await fetch(url, init);
  const result: TokenResponseProps = await response.json();

  return result;
}