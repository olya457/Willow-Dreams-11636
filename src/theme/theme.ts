import { StyleSheet } from 'react-native';

export const colors = {
  background: '#212139',
  surface: '#2A2E4F',
  text: '#C4C0D5',
  muted: '#89859D',
  gold: '#C49B43',
  goldLight: '#DFCC91',
  border: '#536BA8',
  divider: '#30324F',
  danger: '#D37685',
  success: '#8DBC70',
  ink: '#201A13',
};
export const fonts = {
  body: 'InstrumentSans-Regular',
  heading: 'Fraunces-Regular',
};
export const goldGradient = ['#D3AE5A', '#BF943D'];
export const titleGradient = ['#E4D4A3', '#CCB36E'];
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
    color: colors.goldLight,
  },
});
