import React, { useCallback, useState } from 'react';
import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { GradientText } from '../components/GradientText';
import { Button } from '../components/Button';
import { Choice } from '../components/Choice';
import { Progress } from '../components/Progress';
import { images } from '../data/images';
import { quizQuestions } from '../data/quiz';
import { recommendProject } from '../utils/recommendation';
import { colors, layout } from '../theme/theme';
import { useAppData } from '../storage/AppProvider';
import type { FinderStackParams } from '../navigation/types';

export function FinderScreen({
  navigation,
}: NativeStackScreenProps<FinderStackParams, 'Finder'>) {
  const { data, update } = useAppData();
  const [stage, setStage] = useState<'intro' | 'quiz' | 'result'>(
    data.quizAnswers.length === 4 ? 'result' : 'intro',
  );
  const [answers, setAnswers] = useState<number[]>(data.quizAnswers);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const goBack = useCallback(() => {
    if (stage !== 'quiz') {
      return false;
    }
    if (step > 0) {
      setStep(value => value - 1);
    } else {
      setStage('intro');
    }
    return true;
  }, [stage, step]);
  useFocusEffect(
    useCallback(() => {
      const listener = BackHandler.addEventListener(
        'hardwareBackPress',
        goBack,
      );
      return () => listener.remove();
    }, [goBack]),
  );
  function start() {
    setAnswers([]);
    setStep(0);
    setStage('quiz');
  }
  async function next() {
    if (answers[step] === undefined) {
      return;
    }
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setBusy(true);
    try {
      await update(state => ({ ...state, quizAnswers: answers }));
      setStage('result');
    } catch {
      Alert.alert(
        'Unable to save',
        'Please try again to save your recommendation.',
      );
    } finally {
      setBusy(false);
    }
  }
  if (stage === 'intro') {
    return (
      <Screen transitionKey={`${stage}-${step}`}>
        <GradientText>Find your project</GradientText>
        <View style={styles.hero}>
          <Image
            source={images.quiz}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>
        <Text style={layout.body}>
          Answer four short questions about your experience, time and taste. We
          will recommend the willow project that suits you best.
        </Text>
        <View style={styles.footer}>
          <Button title="Start" onPress={start} />
        </View>
      </Screen>
    );
  }
  if (stage === 'result') {
    const project = recommendProject(answers);
    return (
      <Screen transitionKey={`${stage}-${step}`}>
        <Text style={layout.label}>YOUR RECOMMENDATION</Text>
        <GradientText>{project.title}</GradientText>
        <Image
          source={project.image}
          style={styles.resultImage}
          resizeMode="contain"
        />
        <Text style={[layout.caption, styles.gold]}>
          Difficulty: {project.difficulty}
        </Text>
        <Text style={layout.body}>{project.description}</Text>
        <Button
          title="Open project"
          onPress={() =>
            navigation.navigate('ProjectDetail', { id: project.id })
          }
        />
        <Button title="Retake quiz" variant="secondary" onPress={start} />
      </Screen>
    );
  }
  const question = quizQuestions[step];
  return (
    <Screen transitionKey={`${stage}-${step}`}>
      <Progress step={step + 1} />
      <GradientText style={styles.question}>{question.title}</GradientText>
      <View style={styles.choices}>
        {question.options.map((option, index) => (
          <Choice
            key={option}
            label={option}
            selected={answers[step] === index}
            radio={false}
            onPress={() =>
              setAnswers(current => {
                const nextAnswers = [...current];
                nextAnswers[step] = index;
                return nextAnswers;
              })
            }
          />
        ))}
      </View>
      <Button
        title={step === 3 ? 'Find my project' : 'Next'}
        busy={busy}
        disabled={answers[step] === undefined}
        onPress={() => {
          void next();
        }}
      />
      <Button title="Back" variant="ghost" onPress={goBack} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  hero: { backgroundColor: colors.surface, padding: 25 },
  heroImage: { width: '100%', height: undefined, aspectRatio: 1 },
  footer: {
    flexGrow: 1,
    flexShrink: 0,
    minHeight: 110,
    justifyContent: 'flex-end',
  },
  resultImage: { width: '100%', height: undefined, aspectRatio: 1 },
  gold: { color: colors.accent },
  question: { marginTop: 12, fontSize: 27, lineHeight: 34 },
  choices: { gap: 8 },
});
