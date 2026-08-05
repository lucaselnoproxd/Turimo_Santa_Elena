import { type ReactNode, useEffect } from 'react';
import { themes, activeTheme } from '../data/themes';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const theme = themes[activeTheme];
    if (!theme) return;

    const root = document.documentElement;
    const c = theme.colors;

    root.style.setProperty('--clr-primary', c.primary);
    root.style.setProperty('--clr-primary-dark', c.primaryDark);
    root.style.setProperty('--clr-primary-deeper', c.primaryDeeper);
    root.style.setProperty('--clr-primary-light', c.primaryLight);
    root.style.setProperty('--clr-accent', c.accent);
    root.style.setProperty('--clr-accent-light', c.accentLight);
    root.style.setProperty('--clr-text-link', c.textLink);
    root.style.setProperty('--clr-text-heading', c.textHeading);
    root.style.setProperty('--clr-text-body', c.textBody);
    root.style.setProperty('--clr-text-muted', c.textMuted);
    root.style.setProperty('--clr-star', c.star);
    root.style.setProperty('--clr-glow', c.glow);
    root.style.setProperty('--clr-footer-heading', c.footerHeading);
    root.style.setProperty('--clr-footer-text', c.footerText);
    root.style.setProperty('--clr-footer-accent', c.footerAccent);
    root.style.setProperty('--clr-surface', c.surface);
    root.style.setProperty('--clr-overlay-top', c.overlayTop);
    root.style.setProperty('--clr-overlay-mid', c.overlayMid);
    root.style.setProperty('--clr-overlay-bottom', c.overlayBottom);
  }, []);

  return <>{children}</>;
}
