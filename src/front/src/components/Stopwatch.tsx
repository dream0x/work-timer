import { Pause, Play } from "lucide-react-native";
import type { ReactNode } from "react";
import { Button, Input, Text, XStack, YStack } from "tamagui";
import { useTimer } from "@/hooks/useTimer";

export default function Stopwatch() {
	const {
		elapsedSeconds,
		intervalRef,
		startTimer,
		stopTimer,
		title,
		setTitle,
	} = useTimer();

	return (
		<YStack flex={1}>
			<YStack flex={1} justifyContent="center" alignItems="center" gap="$10">
				{/* タイマー表示 */}
				<Text fontSize="$10">{elapsedSeconds}</Text>

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
