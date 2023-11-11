
"use client";

// React + Next
import { useState } from 'react';

// Internal
import { key, maxAge, value } from './config';
import { getCookie, setCookie } from 'cookies-next';

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
    const cookie: string | undefined = getCookie(key)?.toString();

    if (!cookie || (cookie !== 'light' && cookie !== 'dark')) {
      setCookie(key, value, { maxAge: maxAge });
      return value;
    }

    return cookie;
  }

  const switchTheme = (): void => {
    const newTheme: ThemeOption = theme === 'light' ? 'dark' : 'light';

    setCookie(key, newTheme, { maxAge: maxAge });
    setTheme(newTheme);
  }

  return {
    theme,
    switchTheme
  }
}

export default useTheme;
