import { useRef, useState } from "react";
import { useRecords } from "@/states/record";
import { type TimerMode, useTimerMode } from "@/states/timer-mode";

export function useTimer() {
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const timerMode = useTimerMode((state) => state.timerMode);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const sessionRef = useRef<{ start: Date | null; end: Date | null }>({
		start: null,
		end: null,
	});
	const [isRunning, setIsRunning] = useState(false);
	const [title, setTitle] = useState("");
	const { createRecord } = useRecords();

	const startTimer = () => {
		// 既にタイマーが動作中の場合
		if (intervalRef.current) return;

		// タイマー開始
		intervalRef.current = setInterval(() => {
			setElapsedSeconds((prev) => prev + 1);
		}, 1000);
		sessionRef.current.start = new Date();
		setIsRunning(true);
	};

	const stopTimer = () => {
		// タイマー停止
		clearInterval(intervalRef.current);
		intervalRef.current = null;
		setElapsedSeconds(0);
		sessionRef.current.end = new Date();
		setIsRunning(false);

		// 停止処理
		const { start, end } = sessionRef.current;
		createRecord(title, start!, end);
		setTitle("");
	};

	return {
		elapsedSeconds,
		timerRef: sessionRef,
		isRunning,
		startTimer,
		stopTimer,
		title,
		setTitle,
	};
}
