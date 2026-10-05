import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useResponsiveLayout() {
  const { width, height, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const usableWidth = width - insets.left - insets.right;
  const compact = usableWidth < 375 || height < 700;
  const gutter = usableWidth < 360 ? 16 : compact ? 18 : 22;
  const contentWidth = Math.min(usableWidth, 620) - gutter * 2;
  return {
    width,
    height,
    fontScale,
    compact,
    gutter,
    contentWidth,
    stackActions: contentWidth < 310 || fontScale > 1.25,
  };
}
