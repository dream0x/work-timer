import { useEffect } from "react";
import { Text } from "tamagui";
import { useTimer } from "@/hooks/useTimer";
import TimerControl from "./TimerControl";

export default function Countdown() {
	const timer = useTimer();
	const { elapsedSeconds, isRunning, stopTimer } = timer;

	const preset = Temporal.PlainTime.from("00:00:05");
	const display = preset.subtract({ seconds: elapsedSeconds });

	useEffect(() => {
		// カウントダウンが0になった場合にタイマーを停止する
		if (isRunning && elapsedSeconds >= preset.second) {
			stopTimer();
		}
	}, [isRunning, elapsedSeconds, preset.second, stopTimer]);

	return (
		<TimerControl timer={timer}>
			<Text fontSize="$10">{display.toString()}</Text>
		</TimerControl>
	);
}
