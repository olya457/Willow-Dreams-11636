import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePreventRemove } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Reveal } from '../components/Reveal';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { Screen } from '../components/Screen';
import { GradientText } from '../components/GradientText';
import { Button } from '../components/Button';
import { useAppData } from '../storage/AppProvider';
import { colors, fonts, layout } from '../theme/theme';
import {
  persistPhoto,
  photoUri,
  pickPhoto,
  removePhoto,
} from '../services/photos';
import { dateToLocalISO, readableDate } from '../utils/tools';
import type { GalleryStackParams } from '../navigation/types';

export function GalleryFormScreen({
  route,
  navigation,
}: NativeStackScreenProps<GalleryStackParams, 'GalleryForm'>) {
  const { stackActions } = useResponsiveLayout();
  const { data, update } = useAppData();
  const original = data.gallery.find(item => item.id === route.params?.id);
  const [name, setName] = useState(original?.name || '');
  const [date, setDate] = useState(original?.date || '');
  const [photo, setPhoto] = useState(original?.photo || '');
  const [dateOpen, setDateOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [picking, setPicking] = useState(false);
  const saved = useRef(false);
  const lock = useRef(false);
  const dirty =
    name !== (original?.name || '') ||
    date !== (original?.date || '') ||
    photo !== (original?.photo || '');
  usePreventRemove(dirty, ({ data: event }) => {
    if (saved.current) {
      navigation.dispatch(event.action);
      return;
    }
    if (lock.current) {
      return;
    }
    Alert.alert('Discard changes?', 'Your unsaved changes will be lost.', [
      { text: 'Keep editing', style: 'cancel' },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: () => navigation.dispatch(event.action),
      },
    ]);
  });
  async function choosePhoto() {
    setPicking(true);
    try {
      const uri = await pickPhoto();
      if (uri) {
        setPhoto(uri);
      }
    } catch (error) {
      Alert.alert(
        'Unable to add photo',
        error instanceof Error ? error.message : 'Please try again.',
      );
    } finally {
      setPicking(false);
    }
  }
  async function save() {
    if (!name.trim() || !date || !photo || lock.current) {
      return;
    }
    lock.current = true;
    setBusy(true);
    let newPhoto: string | undefined;
    try {
      const id =
        original?.id ||
        `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      if (photo !== original?.photo) {
        newPhoto = await persistPhoto(photo, id);
      }
      const entry = { id, name: name.trim(), date, photo: newPhoto || photo };
      await update(state => ({
        ...state,
        gallery: original
          ? state.gallery.map(item => (item.id === id ? entry : item))
          : [entry, ...state.gallery],
      }));
      saved.current = true;
      if (newPhoto && original) {
        await removePhoto(original.photo).catch(() => {});
      }
      navigation.goBack();
    } catch {
      if (newPhoto) {
        await removePhoto(newPhoto).catch(() => {});
      }
      Alert.alert(
        'Unable to save project',
        'Your changes are still here. Please try again.',
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <Screen keyboard>
      <GradientText>{original ? 'Edit project' : 'New project'}</GradientText>
      <Text style={layout.label}>PROJECT NAME</Text>
      <TextInput
        accessibilityLabel="Project name"
        value={name}
        onChangeText={setName}
        maxLength={100}
        placeholder="e.g. Autumn fruit basket"
        placeholderTextColor={colors.muted}
        style={styles.input}
        editable={!busy}
      />
      <Text style={layout.label}>DATE</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          date ? `Project date: ${readableDate(date)}` : 'Choose project date'
        }
        onPress={() => {
          setDateOpen(true);
        }}
        disabled={busy}
        style={styles.input}
      >
        <Text style={layout.body}>
          {date ? readableDate(date) : 'Choose a date'}
        </Text>
      </Pressable>
      {dateOpen && (
        <View>
          <DateTimePicker
            value={date ? new Date(`${date}T12:00:00`) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            themeVariant="dark"
            textColor={colors.text}
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (Platform.OS === 'android') {
                setDateOpen(false);
              }
              if (event.type === 'set' && selectedDate) {
                setDate(dateToLocalISO(selectedDate));
              }
            }}
          />
          {Platform.OS === 'ios' && (
            <Button
              title="Done"
              variant="secondary"
              compact
              onPress={() => {
                if (!date) {
                  setDate(dateToLocalISO(new Date()));
                }
                setDateOpen(false);
              }}
            />
          )}
        </View>
      )}
      <Text style={layout.label}>PHOTO</Text>
      {photo ? (
        <Reveal replayKey={photo}>
          <Image
            source={{ uri: photoUri(photo) }}
            style={styles.photo}
            resizeMode="cover"
          />
        </Reveal>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add project photo"
          onPress={() => {
            void choosePhoto();
          }}
          disabled={picking || busy}
          style={styles.placeholder}
        />
      )}
      <View style={layout.row}>
        <Button
          title={photo ? 'Change Photo' : 'Add Photo'}
          variant={photo ? 'outline' : 'secondary'}
          compact
          disabled={busy}
          busy={picking}
          onPress={() => {
            void choosePhoto();
          }}
        />
        <Text style={layout.caption}>
          {photo ? 'Photo added' : 'No photo yet'}
        </Text>
      </View>
      <View style={[styles.actions, stackActions && styles.stacked]}>
        <Button
          title="Cancel"
          variant="secondary"
          style={!stackActions && layout.fill}
          disabled={busy}
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Save"
          style={!stackActions && layout.fill}
          busy={busy}
          disabled={!name.trim() || !date || !photo || picking}
          onPress={() => {
            void save();
          }}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  stacked: { flexDirection: 'column' },
  input: {
    minHeight: 52,
    backgroundColor: colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
    marginTop: -10,
    justifyContent: 'center',
  },
  photo: { width: '100%', height: undefined, aspectRatio: 1, marginTop: -8 },
  placeholder: {
    width: '100%',
    aspectRatio: 1.8,
    backgroundColor: colors.border,
    marginTop: -8,
  },
  actions: { flexDirection: 'row', gap: 10, marginTop: 10 },
});
