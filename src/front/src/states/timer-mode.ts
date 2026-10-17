import { create } from "zustand";

export type TimerMode = "pomodoro" | "countdown" | "stopwatch";
export const useTimerMode = create<{
	timerMode: TimerMode;
	setTimerMode: (mode: TimerMode) => void;
}>((set) => ({
	timerMode: "stopwatch",
	setTimerMode: (mode: TimerMode) => {
		set({ timerMode: mode });
	},
}));
