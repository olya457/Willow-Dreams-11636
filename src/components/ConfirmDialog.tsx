import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GradientText } from './GradientText';
import { Button } from './Button';
import { useReducedMotion } from '../hooks/useMotionPreference';
import { colors, layout } from '../theme/theme';

export function ConfirmDialog({
  visible,
  onCancel,
  onConfirm,
  busy,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  busy: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <Modal
      visible={visible}
      transparent
      animationType={reduced ? 'none' : 'fade'}
      onRequestClose={() => {
        if (!busy) {
          onCancel();
        }
      }}
    >
      <View style={styles.overlay}>
        <ScrollView
          style={styles.dialogScroll}
          contentContainerStyle={styles.dialog}
          accessibilityViewIsModal
          bounces={false}
        >
          <GradientText style={styles.title}>Delete this project?</GradientText>
          <Text style={layout.body}>
            This will remove it from your gallery.
          </Text>
          <View style={layout.row}>
            <Button
              title="Cancel"
              variant="ghost"
              style={layout.fill}
              disabled={busy}
              onPress={onCancel}
            />
            <Button
              title="Delete"
              style={layout.fill}
              busy={busy}
              onPress={onConfirm}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#131329B3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dialogScroll: { width: '100%', maxWidth: 430, maxHeight: '90%', flexGrow: 0 },
  dialog: {
    width: '100%',
    maxWidth: 430,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 22,
    gap: 14,
  },
  title: { fontSize: 24, lineHeight: 30 },
});
