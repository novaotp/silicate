// Brand types reference : https://stackoverflow.com/a/61621026
// Forces the types to be seen as-is by Intellisense.

import { get, writable } from "svelte/store";

type Millisecond = number & { __brand: "millisecond" };
type PomodoroTimerState = 'running' | 'paused' | 'idle';

const asMillisecond = (value: number): Millisecond => {
    return value as Millisecond;
}

/** 25 minutes in seconds. */
export const POMODORO_TIMER_DURATION: Millisecond = asMillisecond(25 * 60 * 1000);

export const timer = writable<NodeJS.Timeout | undefined>();
export const timeLeft = writable(POMODORO_TIMER_DURATION);
export const timerCurrentState = writable<PomodoroTimerState>("idle");

export const startTimer = () => {
    if (get(timerCurrentState) === 'running') return;

    timerCurrentState.set('running');

    /* localStorage.setItem('pomodoro-state', get(currentState)); */

    timer.set(
        setInterval(() => {
            timeLeft.update((lastValue) => {
                const newValue = lastValue - 1000;
                return asMillisecond(newValue);
            });
            /* localStorage.setItem('pomodoro-time-left', get(timeLeft).toString()); */

            if (get(timeLeft) <= 0) {
                /** @see https://github.com/novaotp/silicate/issues/22 */
                if ("vibrate" in navigator) {
                    vibrate();
                } else {
                    beep();
                }

                resetTimer();
            }
        }, 1000)
    );
};

export const pauseTimer = () => {
    // Clear the timer
    clearInterval(get(timer));
    timer.set(undefined);

    timerCurrentState.set('paused');
    /* localStorage.setItem('pomodoro-state', currentState);
    localStorage.setItem('pomodoro-time-left', timeLeft.toString());
    localStorage.removeItem('pomodoro-left-at'); */
};

export const resetTimer = () => {
    // Clear the timer
    clearInterval(get(timer));
    timer.set(undefined);

    // Reset
    timeLeft.set(POMODORO_TIMER_DURATION);
    timerCurrentState.set('idle');

    /* localStorage.removeItem('pomodoro-state');
    localStorage.removeItem('pomodoro-time-left');
    localStorage.removeItem('pomodoro-left-at'); */
};

const beep = () => {
    const audio = new Audio("https://freesound.org/data/previews/536/536420_4921277-lq.mp3");
    audio.play();
}

const vibrate = () => {
    navigator.vibrate([400, 400, 400, 400, 400])
}
