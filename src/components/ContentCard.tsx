import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Article, Project } from '../types/models';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { GradientText } from './GradientText';
import { Button } from './Button';
import { colors, layout } from '../theme/theme';
import { shareContent } from '../services/sharing';

export function ContentCard({
  item,
  favorite,
  onFavorite,
  onOpen,
}: {
  item: Article | Project;
  favorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
}) {
  const { stackActions } = useResponsiveLayout();
  const isProject = 'steps' in item;
  return (
    <View style={layout.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open ${item.title}`}
        onPress={onOpen}
        style={styles.open}
      >
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <View style={layout.spaced}>
          <View style={layout.fill}>
            <GradientText style={styles.title}>{item.title}</GradientText>
          </View>
          {isProject && (
            <Text style={[layout.caption, styles.gold]}>{item.difficulty}</Text>
          )}
        </View>
      </Pressable>
      <View style={[layout.row, styles.actions]}>
        <Button
          title={favorite ? 'Favorited' : 'Favorite'}
          compact
          variant={favorite ? 'outline' : 'ghost'}
          accessibilityLabel={`${favorite ? 'Remove' : 'Add'} ${item.title} ${
            favorite ? 'from' : 'to'
          } favorites`}
          onPress={onFavorite}
        />
        <Button
          title="Share"
          compact
          variant="ghost"
          onPress={() => {
            void shareContent(item);
          }}
        />
        {!isProject && (
          <View style={[styles.end, stackActions && styles.fullWidth]}>
            <Button compact title="Open" onPress={onOpen} />
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  actions: { flexWrap: 'wrap' },
  fullWidth: { flexBasis: '100%', alignItems: 'stretch' },
  open: { gap: 12 },
  image: { width: '100%', height: undefined, aspectRatio: 2.5 },
  title: { fontSize: 18, lineHeight: 24 },
  gold: { color: colors.gold },
  end: { flex: 1, alignItems: 'flex-end' },
});
