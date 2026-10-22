import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0B241A',
  surface: '#214638',
  text: '#EDF6EF',
  muted: '#B2CABC',
  accent: '#A6D6AD',
  accentLight: '#D9EFCD',
  border: '#628E75',
  divider: '#355E49',
  danger: '#FFA8AE',
  success: '#A6D6AD',
  ink: '#102C1E',
  overlay: '#061A13CC',
};
export const fonts = {
  body: 'InstrumentSans-Regular',
  heading: 'Fraunces-Regular',
};
export const backgroundGradient = ['#285B40', '#163E2C', '#0B241A'];
export const accentGradient = ['#C6E5B5', '#8DC79C'];
export const titleGradient = ['#F0F8DF', '#B8DDBE'];
export const layout = StyleSheet.create({
  fill: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  spaced: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    padding: 12,
    gap: 12,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 17,
    letterSpacing: 1,
    color: colors.accentLight,
  },
});
