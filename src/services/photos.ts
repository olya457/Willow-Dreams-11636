import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';

export async function pickPhoto(): Promise<string | null> {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
    quality: 0.9,
    maxWidth: 1800,
    maxHeight: 1800,
  });
  if (result.didCancel) {
    return null;
  }
  if (result.errorCode || !result.assets?.[0]?.uri) {
    throw new Error(
      result.errorCode === 'permission'
        ? 'Allow photo access in Settings to choose an image.'
        : 'The photo could not be opened. Please choose another image.',
    );
  }
  return result.assets[0].uri;
}
export async function persistPhoto(uri: string, id: string): Promise<string> {
  const directory = `${RNFS.DocumentDirectoryPath}/gallery`;
  await RNFS.mkdir(directory);
  const extension = uri.split(/[?#]/)[0].split('.').pop()?.toLowerCase();
  const safeExtension =
    extension && ['jpg', 'jpeg', 'png', 'heic', 'webp'].includes(extension)
      ? extension
      : 'jpg';
  const destination = `${directory}/${id}-${Date.now()}.${safeExtension}`;
  await RNFS.copyFile(uri.replace(/^file:\/\//, ''), destination);
  return `gallery/${destination.split('/').pop()}`;
}
export function photoUri(photo: string): string {
  return photo.startsWith('gallery/')
    ? `file://${RNFS.DocumentDirectoryPath}/${photo}`
    : photo;
}

export async function removePhoto(uri: string) {
  const path = photoUri(uri).replace(/^file:\/\//, '');
  if (
    path.startsWith(`${RNFS.DocumentDirectoryPath}/gallery/`) &&
    (await RNFS.exists(path))
  ) {
    await RNFS.unlink(path);
  }
}
