import React, { useRef, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Reveal } from '../components/Reveal';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { Screen } from '../components/Screen';
import { GradientText } from '../components/GradientText';
import { Button } from '../components/Button';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useAppData } from '../storage/AppProvider';
import { images } from '../data/images';
import { layout } from '../theme/theme';
import { photoUri, removePhoto } from '../services/photos';
import { readableDate } from '../utils/tools';
import type { GalleryStackParams } from '../navigation/types';
import type { GalleryEntry } from '../types/models';

export function GalleryScreen({
  navigation,
}: NativeStackScreenProps<GalleryStackParams, 'Gallery'>) {
  const { compact, height } = useResponsiveLayout();
  const { data, update } = useAppData();
  const [deleting, setDeleting] = useState<GalleryEntry | null>(null);
  const [busy, setBusy] = useState(false);
  const deletingLock = useRef(false);
  async function deleteEntry() {
    if (!deleting || deletingLock.current) {
      return;
    }
    deletingLock.current = true;
    setBusy(true);
    try {
      await update(state => ({
        ...state,
        gallery: state.gallery.filter(item => item.id !== deleting.id),
      }));
      await removePhoto(deleting.photo).catch(() => {});
      setDeleting(null);
    } catch {
      Alert.alert(
        'Unable to delete',
        'Your project is still in your gallery. Please try again.',
      );
    } finally {
      deletingLock.current = false;
      setBusy(false);
    }
  }
  const create = () => navigation.navigate('GalleryForm');
  if (!data.gallery.length) {
    return (
      <Screen transitionKey="empty" contentStyle={styles.empty}>
        <Image
          source={images.gallery}
          style={[
            styles.emptyImage,
            compact && styles.smallImage,
            compact && { height: height * 0.25 },
          ]}
          resizeMode="contain"
        />
        <View style={styles.emptyCopy}>
          <GradientText style={styles.emptyTitle}>
            Your gallery is empty
          </GradientText>
          <Text style={[layout.body, styles.center]}>
            Record your finished willow pieces here and watch your craft grow.
          </Text>
        </View>
        <Button title="Create" onPress={create} style={styles.create} />
      </Screen>
    );
  }
  return (
    <Screen scroll={false} contentStyle={styles.screen}>
      <View style={layout.spaced}>
        <View style={layout.fill}>
          <GradientText>My Gallery</GradientText>
        </View>
        <Button compact title="Create" onPress={create} />
      </View>
      <FlatList
        data={data.gallery}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <Reveal style={layout.card} delay={index * 45}>
            <Image
              source={{ uri: photoUri(item.photo) }}
              style={styles.photo}
              resizeMode="cover"
            />
            <GradientText style={styles.cardTitle}>{item.name}</GradientText>
            <Text style={layout.caption}>{readableDate(item.date)}</Text>
            <View style={layout.row}>
              <Button
                title="Edit"
                compact
                variant="ghost"
                onPress={() =>
                  navigation.navigate('GalleryForm', { id: item.id })
                }
              />
              <Button
                title="Delete"
                compact
                variant="danger"
                onPress={() => setDeleting(item)}
              />
            </View>
          </Reveal>
        )}
      />
      <ConfirmDialog
        visible={!!deleting}
        busy={busy}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          void deleteEntry();
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { paddingBottom: 0 },
  list: { gap: 18, paddingBottom: 24 },
  photo: { width: '100%', height: undefined, aspectRatio: 1 },
  cardTitle: { fontSize: 21, lineHeight: 28 },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    paddingBottom: 70,
  },
  emptyImage: { width: '76%', height: 235, marginBottom: 20 },
  smallImage: { marginBottom: 0 },
  emptyCopy: { alignItems: 'center', gap: 12, maxWidth: 320 },
  emptyTitle: { textAlign: 'center', fontSize: 26 },
  center: { textAlign: 'center' },
  create: { minWidth: 118 },
});
