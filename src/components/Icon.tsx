import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../theme/theme';

export type IconName =
  | 'articles'
  | 'patterns'
  | 'projects'
  | 'quiz'
  | 'tools'
  | 'gallery'
  | 'left'
  | 'right'
  | 'close';
export function Icon({
  name,
  color = colors.text,
  size = 24,
}: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  let content: React.ReactNode;
  switch (name) {
    case 'articles':
      content = (
        <>
          <Path d="M6 3h13v18H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3ZM3 17h16M7 7h8M7 11h6" />
        </>
      );
      break;
    case 'patterns':
      content = (
        <>
          <Path d="M3 16c2-8 10-1 12-9M3 20c2-9 11-2 14-12M7 20c3-3 0-9 6-10M11 4c7-4 14 7 6 10M5 12c2-4 5-6 9-6" />
        </>
      );
      break;
    case 'projects':
      content = (
        <>
          <Path d="M2 9h20M4 9l3 11h10l3-11M7 9l4-7M17 9l-4-7M6 14h12M10 10v9M14 10v9" />
        </>
      );
      break;
    case 'quiz':
      content = (
        <>
          <Circle cx="12" cy="12" r="9" />
          <Path d="M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3M12 17h.01" />
        </>
      );
      break;
    case 'tools':
      content = (
        <>
          <Circle cx="12" cy="14" r="8" />
          <Path d="M9 2h6M12 2v4M18 6l2-2M12 10v4l3 2" />
        </>
      );
      break;
    case 'gallery':
      content = (
        <>
          <Rect x="3" y="3" width="18" height="18" rx="1" />
          <Circle cx="8" cy="8" r="1.5" />
          <Path d="m3 17 5-5 4 4 3-4 6 6" />
        </>
      );
      break;
    case 'left':
      content = <Path d="m15 4-8 8 8 8" />;
      break;
    case 'right':
      content = <Path d="m9 4 8 8-8 8" />;
      break;
    case 'close':
      content = <Path d="m6 6 12 12M18 6 6 18" />;
      break;
  }
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {content}
    </Svg>
  );
}
