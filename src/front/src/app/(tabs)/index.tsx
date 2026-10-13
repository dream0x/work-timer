import { useState } from "react";
import { Button, ListItem, Text, YStack } from "tamagui";

export default function Home() {
	const [timer, setTimer] = useState(0);
	const [intervalId, setIntervalId] = useState<number | null>(null);
	const [records, setRecords] = useState<number[]>([]);

	const startTimer = () => {
		if (intervalId) return;

		const id = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);
		setIntervalId(id);
	};

	const stopTimer = () => {
		clearInterval(intervalId);
		setIntervalId(null);

		setRecords((prev) => [...prev, timer]);
		setTimer(0);
	};

	return (
		<YStack>
			<Text>{timer}</Text>
			<Button onClick={startTimer}>start</Button>
			<Button onClick={stopTimer}>stop</Button>
			{records.map((record, i) => (
				<ListItem key={i} title={record} />
			))}
		</YStack>
	);
}
