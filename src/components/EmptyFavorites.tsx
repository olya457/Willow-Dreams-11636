import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { images } from '../data/images';
import { layout } from '../theme/theme';

export function EmptyFavorites({ kind }: { kind: 'Articles' | 'Projects' }) {
  return (
    <View style={styles.container}>
      <Text style={[layout.body, styles.center]}>
        No favorite {kind.toLowerCase()} yet.
      </Text>
      <Image
        source={
          kind === 'Articles'
            ? images.favoriteArticles
            : images.favoriteProjects
        }
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 320,
    gap: 48,
    alignItems: 'center',
    paddingTop: 32,
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
  center: { textAlign: 'center', fontSize: 13 },
  image: { width: '65%', maxWidth: 235, height: 240 },
});
