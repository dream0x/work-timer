import { useEffect, useState } from "react";
import { Text, YStack } from "tamagui";
import { useTimer } from "@/hooks/useTimer";
import TimerControl from "./TimerControl";

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

type Phase = "work" | "break";

export default function Pomodoro() {
	const [phase, setPhase] = useState<Phase>("work");
	const isWork = phase === "work";
	const timer = useTimer({ record: isWork });
	const { elapsedSeconds, isRunning, startTimer, stopTimer } = timer;

	const phaseSeconds = isWork ? WORK_SECONDS : BREAK_SECONDS;
	const remainingSeconds = phaseSeconds - elapsedSeconds;

	useEffect(() => {
		// 作業と休憩の終了後は次のフェーズを自動開始する
		if (isRunning && elapsedSeconds >= phaseSeconds) {
			stopTimer();
			setPhase(isWork ? "break" : "work");
			startTimer();
		}
	}, [isRunning, elapsedSeconds, phaseSeconds, isWork, startTimer, stopTimer]);

	const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
	const seconds = String(remainingSeconds % 60).padStart(2, "0");

	return (
		<TimerControl timer={timer}>
			<YStack alignItems="center">
				<Text fontSize="$6">{isWork ? "作業" : "休憩"}</Text>
				<Text fontSize="$10">{`${minutes}:${seconds}`}</Text>
			</YStack>
		</TimerControl>
	);
}
