import { useState } from "react";
import { Button, Text, View, YStack } from "tamagui";

export default function Home() {
	const [timer, setTimer] = useState(0);
	const [intervalId, setIntervalId] = useState<number | null>(null);
	const [records, setRecords] = useState<
		{ id: string; start: Date; end: Date | null; duration: number | null }[]
	>([]);
	const [recordingId, setRecordingId] = useState<string | null>(null);

	const startTimer = () => {
		// 既に記録中の場合
		if (intervalId) return;

		// 記録開始
		const id = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);
		setIntervalId(id);

		// 開始時間記録
		const recordId = crypto.randomUUID();
		setRecordingId(recordId);
		setRecords((prev) => [
			...prev,
			{ id: recordId, start: new Date(), end: null, duration: null },
		]);
	};

	const stopTimer = () => {
		// 記録停止
		clearInterval(intervalId);
		setIntervalId(null);
		setTimer(0);

		// 終了時間記録
		setRecords((prev) =>
			prev.map((e) => {
				const endDate = new Date();
				return e.id === recordingId
					? {
							...e,
							end: endDate,
							duration: endDate.getTime() - e.start.getTime(),
						}
					: e;
			}),
		);
		setRecordingId(null);
	};

	return (
		<YStack>
			<Text>{timer}</Text>

			{!recordingId ? (
				<Button onClick={startTimer}>start</Button>
			) : (
				<Button onClick={stopTimer}>stop</Button>
			)}

			{records.map((record) => {
				if (record.duration) {
					return (
						<Text key={record.id}>{`${record.id} - ${record.duration}`}</Text>
					);
				} else {
					return <View key={record.id} />;
				}
			})}
		</YStack>
	);
}
