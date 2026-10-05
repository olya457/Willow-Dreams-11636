import notifee from '@notifee/react-native';
import {
  cancelTimerNotification,
  scheduleTimerNotification,
} from '../src/services/notifications';

beforeEach(() => {
  jest.clearAllMocks();
});
test('denied notifications do not create a trigger', async () => {
  (notifee.requestPermission as jest.Mock).mockResolvedValue({
    authorizationStatus: 0,
  });
  expect(await scheduleTimerNotification(Date.now() + 60000)).toBe(false);
  expect(notifee.createTriggerNotification).not.toHaveBeenCalled();
});
test('schedules a notification at the timer deadline and cancels the same identifier', async () => {
  (notifee.requestPermission as jest.Mock).mockResolvedValue({
    authorizationStatus: 1,
  });
  (notifee.createChannel as jest.Mock).mockResolvedValue('soaking');
  const deadline = Date.now() + 60000;
  expect(await scheduleTimerNotification(deadline)).toBe(true);
  expect(notifee.createTriggerNotification).toHaveBeenCalledWith(
    expect.objectContaining({ id: 'willow-soaking-timer' }),
    expect.objectContaining({ timestamp: deadline }),
  );
  await cancelTimerNotification();
  expect(notifee.cancelNotification).toHaveBeenCalledWith(
    'willow-soaking-timer',
  );
});
