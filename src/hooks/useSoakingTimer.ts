import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, AppState } from 'react-native';
import { useAppData } from '../storage/AppProvider';
import {
  cancelTimerNotification,
  scheduleTimerNotification,
} from '../services/notifications';
import { remainingTime, soakingDuration } from '../utils/tools';
import type { RodCondition, RodThickness } from '../types/models';

export function useSoakingTimer() {
  const { data, update } = useAppData();
  const timer = data.timer;
  const [now, setNow] = useState(Date.now());
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const completing = useRef(false);
  const [notice, setNotice] = useState<string | null>(null);
  useEffect(() => {
    const listener = AppState.addEventListener('change', state => {
      if (state === 'active') {
        setNow(Date.now());
      }
    });
    const interval = setInterval(() => setNow(Date.now()), 500);
    return () => {
      clearInterval(interval);
      listener.remove();
    };
  }, []);
  const remaining = remainingTime(timer, now);
  useEffect(() => {
    if (timer.status !== 'running' || remaining > 0 || completing.current) {
      return;
    }
    completing.current = true;
    void update(state =>
      state.timer.status === 'running' && remainingTime(state.timer) === 0
        ? {
            ...state,
            timer: {
              ...state.timer,
              endsAt: null,
              remaining: 0,
              status: 'finished',
            },
          }
        : state,
    )
      .then(() => {
        if (AppState.currentState === 'active') {
          Alert.alert(
            'Soaking time is complete',
            'Check that your rods bend smoothly before you start weaving.',
          );
        }
      })
      .catch(() => {
        setNotice('The timer finished, but its status could not be saved.');
      })
      .finally(() => {
        completing.current = false;
      });
  }, [remaining, timer.status, update]);
  const perform = useCallback(async (action: () => Promise<void>) => {
    if (lock.current) {
      return;
    }
    lock.current = true;
    setBusy(true);
    try {
      await action();
      setNow(Date.now());
    } catch {
      Alert.alert(
        'Unable to update timer',
        'Please try again. Your saved timer has been kept.',
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }, []);
  const select = (
    thickness: RodThickness | null,
    condition: RodCondition | null,
  ) =>
    perform(async () => {
      await cancelTimerNotification();
      const duration =
        thickness && condition ? soakingDuration(thickness, condition) : 0;
      await update(state => ({
        ...state,
        timer: {
          thickness,
          condition,
          duration,
          remaining: duration,
          endsAt: null,
          status: 'idle',
        },
      }));
      setNotice(null);
    });
  const start = () =>
    perform(async () => {
      if (timer.status === 'running' || !timer.duration) {
        return;
      }
      const duration =
        timer.status === 'finished' ? timer.duration : timer.remaining;
      const endsAt = Date.now() + duration;
      let notified = false;
      try {
        notified = await scheduleTimerNotification(endsAt);
      } catch {
        notified = false;
      }
      try {
        await update(state => ({
          ...state,
          timer: {
            ...state.timer,
            remaining: duration,
            endsAt,
            status: 'running',
          },
        }));
      } catch (error) {
        await cancelTimerNotification().catch(() => {});
        throw error;
      }
      setNotice(
        notified
          ? null
          : 'Timer started. Enable notifications in Settings to receive an alert when the app is closed.',
      );
    });
  const pause = () =>
    perform(async () => {
      const pausedRemaining = remainingTime(timer);
      await cancelTimerNotification();
      await update(state => ({
        ...state,
        timer: {
          ...state.timer,
          remaining: pausedRemaining,
          endsAt: null,
          status: pausedRemaining ? 'paused' : 'finished',
        },
      }));
    });
  const reset = () =>
    perform(async () => {
      await cancelTimerNotification();
      await update(state => ({
        ...state,
        timer: {
          ...state.timer,
          endsAt: null,
          remaining: state.timer.duration,
          status: 'idle',
        },
      }));
      setNotice(null);
    });
  return { timer, remaining, busy, notice, select, start, pause, reset };
}
