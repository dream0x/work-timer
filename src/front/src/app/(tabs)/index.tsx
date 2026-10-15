import { Pause, Play } from "lucide-react-native";
import { useState } from "react";
import { Pressable } from "react-native";
import { Circle, Text, YStack } from "tamagui";
import { useStopwatch } from "@/states/stopwatch";

export default function Home() {
	const [timer, setTimer] = useState(0);
	const [intervalId, setIntervalId] = useState<number | null>(null);
	const { startStopwatch, stopStopWatch } = useStopwatch();

	const startTimer = () => {
		// 既に記録中の場合
		if (intervalId) return;

		// 記録開始
		const id = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);
		setIntervalId(id);

		startStopwatch();
	};

	const stopTimer = () => {
		// 記録停止
		clearInterval(intervalId);
		setIntervalId(null);
		setTimer(0);

		// 終了時間記録
		stopStopWatch();
	};

	return (
		<YStack flex={1}>
			<YStack flex={1} justifyContent="center" alignItems="center">
				<Circle
					size={250}
					backgroundColor="royalblue"
					borderColor="white"
					borderWidth="$4"
				>
					<Text fontSize="$10">{timer}</Text>
				</Circle>
			</YStack>

			<YStack justifyContent="center" alignItems="center">
				{!intervalId ? (
					<Pressable style={{ padding: 50 }} onPress={startTimer}>
						<Play size={50} />
					</Pressable>
				) : (
					<Pressable style={{ padding: 50 }} onPress={stopTimer}>
						<Pause size={50} />
					</Pressable>
				)}
			</YStack>
		</YStack>
	);
}
