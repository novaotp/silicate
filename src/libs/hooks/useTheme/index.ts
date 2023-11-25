
"use client";

// React + Next
import { useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

// Internal
import { key, maxAge, value } from './config';
import { getServerSideTheme } from './server';

/** A client-side hook to get and change the current theme. */
export const useTheme = () => {
  const [theme, setTheme] = useState<string>(validateTheme());

  function validateTheme() {
    const cookie = getCookie(key)?.toString();

    if (!cookie || (cookie !== 'light' && cookie !== 'dark')) {
      setCookie(key, value, { maxAge: maxAge });
      return value;
    }

    return cookie;
  }

  const switchTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    setCookie(key, theme, { maxAge: maxAge });
  }

  return { theme, switchTheme };
}

export { getServerSideTheme };
