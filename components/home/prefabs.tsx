
'use client';

import Link from 'next/link';

export const RegisterLink = () => {
  return (
    <AuthLink href="/auth/sign-up" label="Inscris-toi" variant="accent" />
  )
}

export const LogInLink = () => {
  return (
    <AuthLink href="/auth/log-in" label="Se connecter" variant="normal" />
  )
}

interface AuthLinkProps {
  href: string;
  label: string;
  /** The accent variant will be more suited for an important link. */
  variant: "accent" | "normal";
}

/**
 * Renders a link with a normal and an accent theme.
 * 
 * - The accent theme will be used for primary links.
 * - The normal theme will be used for secondary links.
 */
const AuthLink = ({ href, label, variant }: AuthLinkProps) => {
  const colors = variant === 'accent' ? "bg-primary-color text-opposite-text-color" : "bg-bg-color text-primary-color border border-primary-color";

  return (
    <Link
      className={`relative block w-full text-center p-3 my-5 rounded-lg bg-bg-color ${colors}`}
      href={href}
    >
      {label}
    </Link>
  )
}
