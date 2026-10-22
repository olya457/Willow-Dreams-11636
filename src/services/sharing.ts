import { Alert, Share } from 'react-native';
import type { Article, Project } from '../types/models';

export async function shareContent(item: Article | Project) {
  const body =
    'paragraphs' in item
      ? item.paragraphs.join('\n\n')
      : item.steps
          .map((step, index) => `${index + 1}. ${step.text}`)
          .join('\n\n');
  try {
    await Share.share({
      title: item.title,
      message: `${item.title}\nWillow Craft Studio\n\n${body}`,
    });
  } catch {
    Alert.alert('Unable to share', 'Please try again.');
  }
}
