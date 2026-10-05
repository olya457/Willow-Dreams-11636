import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  TriggerType,
} from '@notifee/react-native';

const TIMER_NOTIFICATION = 'willow-soaking-timer';
export async function scheduleTimerNotification(
  endsAt: number,
): Promise<boolean> {
  const permission = await notifee.requestPermission();
  if (permission.authorizationStatus === AuthorizationStatus.DENIED) {
    return false;
  }
  const channelId = await notifee.createChannel({
    id: 'soaking',
    name: 'Willow soaking timer',
    importance: AndroidImportance.HIGH,
  });
  await notifee.createTriggerNotification(
    {
      id: TIMER_NOTIFICATION,
      title: 'Your willow soaking timer is complete',
      body: 'Check that your rods bend smoothly before you start weaving.',
      android: {
        channelId,
        smallIcon: 'ic_notification',
        pressAction: { id: 'default' },
      },
      ios: { sound: 'default' },
    },
    { type: TriggerType.TIMESTAMP, timestamp: endsAt },
  );
  return true;
}
export async function cancelTimerNotification() {
  await notifee.cancelNotification(TIMER_NOTIFICATION);
}
