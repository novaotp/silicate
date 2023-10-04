
"use client";

// React + Next
import { useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

// Internal
import { key, maxAge, value } from './config';
import Cookies from '@classes/cookies';

interface UseThemeReturnProps {
  /**
   * The current theme.
   * 
   * Options :
   * 
   *  - light
   *  - dark
   */
  theme: ThemeOption;
  /** Switches the theme. */
  switchTheme: () => void;
}

/** The theme options. */
type ThemeOption = 'light' | 'dark';

/** A client-side hook to get and change the current theme. */
const useTheme = (): UseThemeReturnProps => {
  const [theme, setTheme] = useState<ThemeOption>(validateTheme());

  function validateTheme(): ThemeOption {
    const cookie: string | undefined = Cookies.get(key);

    if (!cookie || (cookie !== 'light' && cookie !== 'dark')) {
      return value;
    }

    return cookie;
  }

  const switchTheme = (): void => {
    const newTheme: ThemeOption = theme === 'light' ? 'dark' : 'light';

    setCookie(key, newTheme, { maxAge: maxAge }); // Set to 10 years
    setTheme(newTheme);
  }

  return {
    theme,
    switchTheme
  }
}

export default useTheme;
