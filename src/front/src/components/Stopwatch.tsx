import { Text } from "tamagui";
import { useTimer } from "@/hooks/useTimer";
import TimerControl from "./TimerControl";

export default function Stopwatch() {
	const timer = useTimer();
	const { elapsedSeconds } = timer;

	return (
		<TimerControl timer={timer}>
			<Text fontSize="$10">{elapsedSeconds}</Text>
		</TimerControl>
	);
}
