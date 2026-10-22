import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { articles } from '../data/articles';
import { Screen } from '../components/Screen';
import { GradientText } from '../components/GradientText';
import { Button } from '../components/Button';
import { colors, fonts, layout } from '../theme/theme';
import { useAppData } from '../storage/AppProvider';
import type { LibraryStackParams } from '../navigation/types';

export function ArticleDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<LibraryStackParams, 'ArticleDetail'>) {
  const article = articles.find(item => item.id === route.params.id);
  const { data, update } = useAppData();
  if (!article) {
    return (
      <Screen>
        <Text style={layout.body}>This article could not be found.</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </Screen>
    );
  }
  async function answer(key: string, value: boolean) {
    try {
      await update(state => ({
        ...state,
        answers: { ...state.answers, [key]: value },
      }));
    } catch {
      Alert.alert(
        'Unable to save',
        'Your answer could not be saved. Please try again.',
      );
    }
  }
  return (
    <Screen>
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.goBack()}
        style={styles.back}
      >
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>
      <GradientText>{article.title}</GradientText>
      <Image source={article.image} style={styles.image} resizeMode="cover" />
      {article.paragraphs.map(paragraph => (
        <Text key={paragraph} style={layout.body}>
          {paragraph}
        </Text>
      ))}
      <Text style={layout.label}>TRUE OR FALSE?</Text>
      {article.questions.map((question, index) => {
        const key = `${article.id}:${index}`;
        const selection = data.answers[key];
        const answered = typeof selection === 'boolean';
        const correct = selection === question.answer;
        const feedbackColor = correct ? colors.success : colors.danger;
        return (
          <View key={key} style={layout.card}>
            <Text style={layout.body}>{question.statement}</Text>
            <View style={layout.row}>
              {[true, false].map(value => (
                <Pressable
                  key={String(value)}
                  accessibilityRole="radio"
                  accessibilityLabel={value ? 'True' : 'False'}
                  accessibilityState={{ checked: selection === value }}
                  onPress={() => {
                    void answer(key, value);
                  }}
                  style={[
                    styles.answer,
                    selection === value && { borderColor: feedbackColor },
                  ]}
                >
                  <Text
                    style={[
                      styles.answerText,
                      selection === value && { color: feedbackColor },
                    ]}
                  >
                    {value ? 'True' : 'False'}
                  </Text>
                </Pressable>
              ))}
            </View>
            {answered && (
              <Text
                accessibilityLiveRegion="polite"
                style={[layout.caption, { color: feedbackColor }]}
              >
                {correct
                  ? 'Correct!'
                  : `Not quite. The answer is ${
                      question.answer ? 'True' : 'False'
                    }.`}
              </Text>
            )}
          </View>
        );
      })}
    </Screen>
  );
}
const styles = StyleSheet.create({
  back: { alignSelf: 'flex-start', minHeight: 36, justifyContent: 'center' },
  backText: { fontFamily: fonts.body, fontSize: 15, color: colors.accent },
  image: { width: '100%', height: undefined, aspectRatio: 2 },
  answer: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  answerText: { fontFamily: fonts.body, fontSize: 15, color: colors.text },
});
