
"use client";

// React + Next
import { useState } from 'react';

// Internal
import { key, maxAge, value } from './config';
import Cookies from '@utils/cookies';

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
      Cookies.set({ key: key, data: value, maxAge: maxAge });
      return value;
    }

    return cookie;
  }

  const switchTheme = (): void => {
    const newTheme: ThemeOption = theme === 'light' ? 'dark' : 'light';

    Cookies.set({ key: key, data: newTheme, maxAge: maxAge });
    setTheme(newTheme);
  }

  return {
    theme,
    switchTheme
  }
}

export default useTheme;
