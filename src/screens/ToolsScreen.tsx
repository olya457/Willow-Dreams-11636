import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Reveal } from '../components/Reveal';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { Screen } from '../components/Screen';
import { GradientText } from '../components/GradientText';
import { SegmentedControl } from '../components/SegmentedControl';
import { Button } from '../components/Button';
import { Choice } from '../components/Choice';
import { colors, fonts, layout } from '../theme/theme';
import {
  calculateRods,
  formatDuration,
  projectSizes,
  projectTypes,
  type ProjectSize,
  type ProjectType,
} from '../utils/tools';
import { useSoakingTimer } from '../hooks/useSoakingTimer';
import type { RodCondition, RodThickness } from '../types/models';

export function ToolsScreen() {
  const [tab, setTab] = useState(0);
  return (
    <Screen transitionKey={tab}>
      <GradientText>Tools</GradientText>
      <SegmentedControl
        items={['Material Calculator', 'Willow Soaking Timer']}
        selected={tab}
        onChange={setTab}
      />
      {tab === 0 ? <MaterialCalculator /> : <SoakingTimer />}
    </Screen>
  );
}
function MaterialCalculator() {
  const [type, setType] = useState<ProjectType | null>(null);
  const [size, setSize] = useState<ProjectSize | null>(null);
  const [result, setResult] = useState<number | null>(null);
  return (
    <>
      <Text style={layout.label}>PROJECT TYPE</Text>
      <View style={styles.options}>
        {projectTypes.map(value => (
          <Choice
            key={value}
            label={value}
            selected={type === value}
            onPress={() => {
              setType(value);
              setResult(null);
            }}
          />
        ))}
      </View>
      <Text style={layout.label}>SIZE</Text>
      <View style={styles.options}>
        {projectSizes.map(value => (
          <Choice
            key={value}
            label={value}
            selected={size === value}
            onPress={() => {
              setSize(value);
              setResult(null);
            }}
          />
        ))}
      </View>
      <Button
        title="Calculate"
        disabled={!type || !size}
        onPress={() => {
          if (type && size) {
            setResult(calculateRods(type, size));
          }
        }}
      />
      {result !== null && (
        <Reveal style={styles.result} accessibilityLiveRegion="polite">
          <Text style={layout.label}>ESTIMATED WILLOW RODS</Text>
          <Text style={styles.value}>{result}</Text>
          <Text style={layout.caption}>rods of mixed thickness</Text>
          <Text style={[layout.caption, styles.center]}>
            A planning estimate. Actual amounts depend on dimensions, rod length
            and weaving density.
          </Text>
        </Reveal>
      )}
    </>
  );
}
function SoakingTimer() {
  const { timer, remaining, busy, notice, select, start, pause, reset } =
    useSoakingTimer();
  const { stackActions, compact } = useResponsiveLayout();
  const locked = timer.status === 'running' || timer.status === 'paused';
  return (
    <>
      <Text style={layout.label}>ROD THICKNESS</Text>
      <View style={styles.options}>
        {(['Thin', 'Medium', 'Thick'] as RodThickness[]).map(value => (
          <Choice
            key={value}
            label={value}
            selected={timer.thickness === value}
            disabled={locked || busy}
            onPress={() => {
              void select(value, timer.condition);
            }}
          />
        ))}
      </View>
      <Text style={layout.label}>ROD CONDITION</Text>
      <View style={styles.options}>
        {(['Dried', 'Fresh-cut', 'Stripped'] as RodCondition[]).map(value => (
          <Choice
            key={value}
            label={value}
            selected={timer.condition === value}
            disabled={locked || busy}
            onPress={() => {
              void select(timer.thickness, value);
            }}
          />
        ))}
      </View>
      <View style={styles.result}>
        <Text style={layout.label}>SOAKING TIME</Text>
        <Text
          accessibilityLabel={`${formatDuration(remaining)} remaining`}
          style={[styles.value, compact && styles.smallValue]}
        >
          {formatDuration(remaining)}
        </Text>
        {timer.status === 'finished' && (
          <Text style={layout.body}>Your soaking time is complete.</Text>
        )}
        {timer.status === 'paused' && (
          <Text style={layout.caption}>Paused</Text>
        )}
      </View>
      <View style={stackActions ? styles.stacked : layout.row}>
        <Button
          title={timer.status === 'paused' ? 'Resume' : 'Start'}
          style={!stackActions && layout.fill}
          disabled={!timer.duration || timer.status === 'running' || busy}
          compact
          onPress={() => {
            void start();
          }}
        />
        <Button
          title="Pause"
          style={!stackActions && layout.fill}
          variant="secondary"
          compact
          disabled={timer.status !== 'running' || busy}
          onPress={() => {
            void pause();
          }}
        />
        <Button
          title="Reset"
          style={!stackActions && layout.fill}
          variant="secondary"
          compact
          disabled={!timer.duration || busy}
          onPress={() => {
            void reset();
          }}
        />
      </View>
      {notice && <Text style={layout.caption}>{notice}</Text>}
      <Text style={layout.caption}>
        Use this time as a guide. Check the rods’ flexibility before weaving.
      </Text>
    </>
  );
}
const styles = StyleSheet.create({
  smallValue: { fontSize: 34 },
  stacked: { gap: 8 },
  options: { gap: 8, marginTop: -8 },
  result: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    padding: 22,
    alignItems: 'center',
    gap: 10,
  },
  value: {
    fontFamily: fonts.heading,
    color: colors.accent,
    fontSize: 43,
    fontVariant: ['tabular-nums'],
  },
  center: { textAlign: 'center' },
});
