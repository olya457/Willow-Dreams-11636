import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { projects } from '../data/projects';
import { Screen } from '../components/Screen';
import { GradientText } from '../components/GradientText';
import { Button } from '../components/Button';
import { colors, fonts, layout } from '../theme/theme';
import { useAppData } from '../storage/AppProvider';
import { shareContent } from '../services/sharing';
import type {
  LibraryStackParams,
  FinderStackParams,
} from '../navigation/types';

type Props =
  | NativeStackScreenProps<LibraryStackParams, 'ProjectDetail'>
  | NativeStackScreenProps<FinderStackParams, 'ProjectDetail'>;
export function ProjectDetailScreen({ route, navigation }: Props) {
  const project = projects.find(item => item.id === route.params.id);
  const { data, toggleFavorite } = useAppData();
  if (!project) {
    return (
      <Screen>
        <Text style={layout.body}>This project could not be found.</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </Screen>
    );
  }
  const favorite = data.favoriteProjects.includes(project.id);
  return (
    <Screen>
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.goBack()}
        style={styles.back}
      >
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>
      <View style={styles.heading}>
        <GradientText>{project.title}</GradientText>
        <Text style={layout.caption}>Difficulty: {project.difficulty}</Text>
      </View>
      <View style={layout.row}>
        <Button
          title={favorite ? 'Favorited' : 'Favorite'}
          compact
          variant={favorite ? 'outline' : 'secondary'}
          onPress={() => {
            void toggleFavorite('favoriteProjects', project.id);
          }}
        />
        <Button
          title="Share"
          compact
          variant="secondary"
          onPress={() => {
            void shareContent(project);
          }}
        />
      </View>
      {project.steps.map((step, index) => (
        <View key={step.text} style={layout.card}>
          <View style={layout.row}>
            <View style={styles.number}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <Text style={layout.label}>STEP {index + 1}</Text>
          </View>
          <Image
            source={step.image}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={layout.body}>{step.text}</Text>
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  back: { alignSelf: 'flex-start', minHeight: 36, justifyContent: 'center' },
  backText: { fontFamily: fonts.body, fontSize: 15, color: colors.gold },
  heading: { gap: 6 },
  image: { width: '100%', height: undefined, aspectRatio: 1 },
  number: {
    width: 25,
    height: 25,
    borderRadius: 14,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: { fontFamily: fonts.body, color: colors.ink, fontSize: 13 },
});
