import { Pause, Play } from "lucide-react-native";
import type { JSX, ReactNode } from "react";
import { Button, Input, XStack, YStack } from "tamagui";
import type { useTimer } from "@/hooks/useTimer";

export default function TimerControl(props: {
	timer: ReturnType<typeof useTimer>;
	children: JSX.Element;
}) {
	const { isRunning, startTimer, stopTimer, title, setTitle } = props.timer;

	return (
		<YStack flex={1}>
			<YStack flex={1} justifyContent="center" alignItems="center" gap="$10">
				{/* タイマー表示 */}
				{props.children}

				<XStack>
					{/* タイトル入力欄 */}
					<Input
						value={title}
						onChangeText={setTitle}
						placeholder="作業内容"
						width="50%"
					/>
					{/* 開始・終了ボタン */}
					{!isRunning ? (
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
