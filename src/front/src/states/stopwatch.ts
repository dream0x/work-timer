import { create } from "zustand";
import { useRecords } from "./record";

export const useStopwatch = create<{
	stopwatch: { start: Date | null; end: Date | null };
	startStopwatch: () => void;
	stopStopWatch: (title: string) => void;
}>((set, get) => {
	return {
		stopwatch: { start: null, end: null },

		startStopwatch: () => {
			// 開始時刻記録
			set((s) => ({
				stopwatch: { ...s.stopwatch, start: new Date() },
			}));
		},

		stopStopWatch: (title: string) => {
			// 終了時刻記録
			set((s) => ({
				stopwatch: { ...s.stopwatch, end: new Date() },
			}));

			// 記録追加
			const { start, end } = get().stopwatch;
			useRecords.getState().addRecord(title, start!, end!);
		},
	};
});
