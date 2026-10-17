import { type LucideIcon, Pause, Play } from "lucide-react-native";
import { type ReactNode, useState } from "react";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";
import { useStopwatch } from "@/states/stopwatch";

export default function Home() {
	const [timer, setTimer] = useState(0);
	const [intervalId, setIntervalId] = useState<number | null>(null);
	const [title, setTitle] = useState<string>("");
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
		stopStopWatch(title);

		// 入力欄初期化
		setTitle("");
	};

	return (
		<YStack flex={1}>
			<YStack flex={1} justifyContent="center" alignItems="center" gap="$10">
				{/* タイマー表示 */}
				<Text fontSize="$10">{timer}</Text>

				<XStack>
					{/* タイトル入力欄 */}
					<Input placeholder="作業内容" value={title} onChangeText={setTitle} />
					{/* 開始・終了ボタン */}
					{!intervalId ? (
						<TimerButton pressFunc={startTimer}>
							<Play />
						</TimerButton>
					) : (
						<TimerButton pressFunc={stopTimer}>
							<Pause />
						</TimerButton>
					)}
				</XStack>
			</YStack>
		</YStack>
	);
}

export function TimerButton(props: {
	children: ReactNode;
	pressFunc: () => void;
}) {
	return (
		<Button onPress={props.pressFunc} size="lg">
			{props.children}
		</Button>
	);
}
