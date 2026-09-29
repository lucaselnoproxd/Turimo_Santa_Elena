import { type ReactNode, useEffect } from 'react';
import { themes, activeTheme, type ThemeColors } from '../data/themes';

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

const CSS_VARS: ReadonlyArray<{ var: string; key: keyof ThemeColors }> = [
  { var: '--clr-primary', key: 'primary' },
  { var: '--clr-primary-dark', key: 'primaryDark' },
  { var: '--clr-primary-deeper', key: 'primaryDeeper' },
  { var: '--clr-primary-light', key: 'primaryLight' },
  { var: '--clr-accent', key: 'accent' },
  { var: '--clr-accent-light', key: 'accentLight' },
  { var: '--clr-text-link', key: 'textLink' },
  { var: '--clr-text-heading', key: 'textHeading' },
  { var: '--clr-text-body', key: 'textBody' },
  { var: '--clr-text-muted', key: 'textMuted' },
  { var: '--clr-star', key: 'star' },
  { var: '--clr-glow', key: 'glow' },
  { var: '--clr-footer-heading', key: 'footerHeading' },
  { var: '--clr-footer-text', key: 'footerText' },
  { var: '--clr-footer-accent', key: 'footerAccent' },
  { var: '--clr-surface', key: 'surface' },
];

function applyColors(colors: Partial<ThemeColors>) {
  const root = document.documentElement;
  for (const { var: cssVar, key } of CSS_VARS) {
    const value = colors[key];
    if (typeof value === 'string') root.style.setProperty(cssVar, value);
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const theme = themes[activeTheme];
    if (theme) applyColors(theme.colors);

    // FASE 2: el tema puede editarse desde el panel de admin.
    // Se pide el tema remoto, pero si no hay backend o falla,
    // el sitio sigue funcionando con el tema local predefinido.
    let cancelled = false;
    fetch(`${BASE_URL}/theme`)
      .then((res) => (res.ok ? (res.json() as Promise<{ colors?: Partial<ThemeColors> }>) : null))
      .then((data) => {
        if (!cancelled && data?.colors) applyColors(data.colors);
      })
      .catch(() => {
        // tema local ya aplicado = suficiente
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <>{children}</>;
}