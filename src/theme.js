export const colors = {
  primary: '#7CC0F0',
  navy: '#1B3A7A',
  ink: '#0F2347',
  cream: '#FAF6EF',
  card: '#FFFFFF',
  tint: '#E3EEF9',
  border: '#D9E3F0',
  inputBorder: '#74879F',
  muted: '#5B6B87',
  placeholder: '#5F6F8C',
  danger: '#B3261E',
  dangerSoft: '#FDECEA',
  success: '#1F7A4D',
  successSoft: '#DDF3E6',
  star: '#9A5B00',
  skeleton: '#E9E2D3',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 };

export const type = {
  display: { fontSize: 40, lineHeight: 46, fontWeight: '800' },
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '800' },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '800' },
  h3: { fontSize: 18, lineHeight: 24, fontWeight: '700' },
  body: { fontSize: 16, lineHeight: 24 },
  small: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 13, lineHeight: 18 },
};

export const MIN_TOUCH = 44;

export const radius = { sm: 10, md: 16, lg: 24, pill: 999 };

export const focusRing = { outlineWidth: 3, outlineColor: colors.ink, outlineOffset: 2, outlineStyle: 'solid' };

export const centered = (max) => ({ width: '100%', maxWidth: max, alignSelf: 'center' });
