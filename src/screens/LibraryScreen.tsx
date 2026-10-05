import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { articles } from '../data/articles';
import { projects } from '../data/projects';
import { Reveal } from '../components/Reveal';
import { Screen } from '../components/Screen';
import { GradientText } from '../components/GradientText';
import { SegmentedControl } from '../components/SegmentedControl';
import { ContentCard } from '../components/ContentCard';
import { EmptyFavorites } from '../components/EmptyFavorites';
import { useAppData } from '../storage/AppProvider';
import type { LibraryStackParams } from '../navigation/types';
import type { Article, Project } from '../types/models';

type Props = NativeStackScreenProps<LibraryStackParams, 'Library'> & {
  kind: 'Articles' | 'Projects';
};
export function LibraryScreen({ kind, navigation }: Props) {
  const [selected, setSelected] = useState(0);
  const { data, toggleFavorite } = useAppData();
  const favoriteKey =
    kind === 'Articles' ? 'favoriteArticles' : 'favoriteProjects';
  const favorites = data[favoriteKey];
  const items: (Article | Project)[] =
    kind === 'Articles' ? articles : projects;
  const shown = selected
    ? items.filter(item => favorites.includes(item.id))
    : items;
  return (
    <Screen
      transitionKey={selected}
      scroll={false}
      contentStyle={styles.screen}
    >
      <View style={styles.header}>
        <GradientText>{kind}</GradientText>
        <SegmentedControl
          items={['All', 'Favorites']}
          selected={selected}
          onChange={setSelected}
        />
      </View>
      <FlatList
        key={`${kind}-${selected}`}
        data={shown}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyFavorites kind={kind} />}
        renderItem={({ item, index }) => (
          <Reveal delay={index * 45}>
            <ContentCard
              item={item}
              favorite={favorites.includes(item.id)}
              onFavorite={() => {
                void toggleFavorite(favoriteKey, item.id);
              }}
              onOpen={() =>
                navigation.navigate(
                  kind === 'Articles' ? 'ArticleDetail' : 'ProjectDetail',
                  { id: item.id },
                )
              }
            />
          </Reveal>
        )}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { paddingBottom: 0, gap: 12 },
  header: { gap: 20 },
  list: { flexGrow: 1, gap: 16, paddingBottom: 24 },
});
