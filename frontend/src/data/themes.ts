export type ThemeName = keyof typeof themes;

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryDeeper: string;
  primaryLight: string;
  accent: string;
  accentLight: string;
  textLink: string;
  textHeading: string;
  textBody: string;
  textMuted: string;
  star: string;
  glow: string;
  footerHeading: string;
  footerText: string;
  footerAccent: string;
  surface: string;
}

export const themes = {
  'frutiger-aero': {
    name: 'Frutiger Aero',
    colors: {
      primary: '#00b4d8',
      primaryDark: '#0077b6',
      primaryDeeper: '#004a6a',
      primaryLight: '#b2ebf2',
      accent: '#2dc653',
      accentLight: '#66bb6a',
      textLink: '#006284',
      textHeading: '#004a6a',
      textBody: '#004a6a',
      textMuted: '#006284',
      star: '#00b4d8',
      glow: 'rgba(0,180,216,0.5)',
      footerHeading: '#80deea',
      footerText: 'rgba(144,202,249,0.6)',
      footerAccent: '#00b4d8',
      surface: '#e8f4f8',
    },
  },

  ocean: {
    name: 'OcÃ©ano Profundo',
    colors: {
      primary: '#0077b6',
      primaryDark: '#005c99',
      primaryDeeper: '#526274b2',
      primaryLight: '#90caf9',
      accent: '#00b4d8',
      accentLight: '#4dd0e1',
      textLink: '#005c99',
      textHeading: '#002b5c',
      textBody: '#002b5c',
      textMuted: '#005c99',
      star: '#0077b6',
      glow: 'rgba(0,119,182,0.5)',
      footerHeading: '#64b5f6',
      footerText: 'rgba(144,202,249,0.6)',
      footerAccent: '#0077b6',
      surface: '#e3f2fd',
    },
  },

  sunset: {
    name: 'Atardecer Costero',
    colors: {
      primary: '#ff6b6b',
      primaryDark: '#e63946',
      primaryDeeper: '#8d1b2a',
      primaryLight: '#ffb3b3',
      accent: '#ffb347',
      accentLight: '#ffcc80',
      textLink: '#c4283a',
      textHeading: '#5a1018',
      textBody: '#5a1018',
      textMuted: '#c4283a',
      star: '#ff6b6b',
      glow: 'rgba(255,107,107,0.5)',
      footerHeading: '#ffb3b3',
      footerText: 'rgba(255,179,179,0.6)',
      footerAccent: '#ff6b6b',
      surface: '#fff5f5',
    },
  },

  tropical: {
    name: 'TrÃ³pico Verde',
    colors: {
      primary: '#2dc653',
      primaryDark: '#24a843',
      primaryDeeper: '#0b4e1e',
      primaryLight: '#a5d6a7',
      accent: '#00b4d8',
      accentLight: '#4dd0e1',
      textLink: '#1b8a36',
      textHeading: '#0b4e1e',
      textBody: '#0b4e1e',
      textMuted: '#1b8a36',
      star: '#2dc653',
      glow: 'rgba(45,198,83,0.5)',
      footerHeading: '#81c784',
      footerText: 'rgba(129,199,132,0.6)',
      footerAccent: '#2dc653',
      surface: '#e8f5e9',
    },
  },
} as const;

// CAMBIA AQUÃ EL TEMA â€” solo cambia el string entre comillas
export const activeTheme: ThemeName = 'tropical';
