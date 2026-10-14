import { useState } from "react";
import { Button, Text, YStack } from "tamagui";
import { useRecords } from "@/states/record";

export default function Home() {
	const [timer, setTimer] = useState(0);
	const [intervalId, setIntervalId] = useState<number | null>(null);
	const { startRecord, stopRecord } = useRecords();

	const startTimer = () => {
		// 既に記録中の場合
		if (intervalId) return;

		// 記録開始
		const id = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);
		setIntervalId(id);

		// 開始時間記録
		startRecord();
	};

	const stopTimer = () => {
		// 記録停止
		clearInterval(intervalId);
		setIntervalId(null);
		setTimer(0);

		// 終了時間記録
		stopRecord();
	};

	return (
		<YStack>
			<Text>{timer}</Text>

			{!intervalId ? (
				<Button onClick={startTimer}>start</Button>
			) : (
				<Button onClick={stopTimer}>stop</Button>
			)}
		</YStack>
	);
}
