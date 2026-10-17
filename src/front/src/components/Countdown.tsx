import { Pause, Play } from "lucide-react-native";
import { type ReactNode, useEffect } from "react";
import { Button, Input, Text, XStack, YStack } from "tamagui";
import { useTimer } from "@/hooks/useTimer";

export default function Countdown() {
	const {
		elapsedSeconds,
		intervalRef,
		startTimer,
		stopTimer,
		title,
		setTitle,
	} = useTimer();

	const preset = Temporal.PlainTime.from("00:00:05");
	const display = preset.subtract({ seconds: elapsedSeconds });

	useEffect(() => {
		if (intervalRef.current && elapsedSeconds >= preset.second) {
			stopTimer();
		}
	}, [intervalRef.current, elapsedSeconds, preset.second, stopTimer]);

	return (
		<YStack flex={1}>
			<YStack flex={1} justifyContent="center" alignItems="center" gap="$10">
				{/* タイマー表示 */}
				<Text fontSize="$10">{display.toString()}</Text>

				<XStack>
					{/* タイトル入力欄 */}
					<Input placeholder="作業内容" value={title} onChangeText={setTitle} />
					{/* 開始・終了ボタン */}
					{!intervalRef.current ? (
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

function TimerButton(props: { children: ReactNode; pressFunc: () => void }) {
	return (
		<Button onPress={props.pressFunc} size="lg">
			{props.children}
		</Button>
	);
}
