import { useRef, useState } from "react";
import { useRecords } from "@/states/record";

type TimerMode = "pomodoro" | "timer" | "stopwatch";

export function useTimer() {
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const modeRef = useRef<TimerMode | null>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const timerRef = useRef<{ start: Date | null; end: Date | null }>({
		start: null,
		end: null,
	});
	const [title, setTitle] = useState("");
	const { createRecord } = useRecords();

	const startTimer = () => {
		// 既にタイマーが動作中の場合
		if (intervalRef.current) return;

		// タイマー開始
		intervalRef.current = setInterval(() => {
			setElapsedSeconds((prev) => prev + 1);
		}, 1000);
		timerRef.current.start = new Date();
	};

	const stopTimer = () => {
		// タイマー停止
		clearInterval(intervalRef.current);
		intervalRef.current = null;
		setElapsedSeconds(0);
		timerRef.current.end = new Date();

		// 停止処理
		const { start, end } = timerRef.current;
		createRecord(title, start!, end);
		setTitle("");
	};

	return {
		elapsedSeconds,
		modeRef,
		intervalRef,
		timerRef,
		startTimer,
		stopTimer,
		title,
		setTitle,
	};
}
