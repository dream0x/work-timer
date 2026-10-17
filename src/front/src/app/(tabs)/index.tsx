import { Select, View, XStack, YStack } from "tamagui";
import Countdown from "@/components/Countdown";
import Stopwatch from "@/components/Stopwatch";
import { useTimerMode } from "@/states/timer-mode";

export default function Home() {
	const timerMode = useTimerMode((state) => state.timerMode);
	const setTimerMode = useTimerMode((state) => state.setTimerMode);

	const render = () => {
		switch (timerMode) {
			case "pomodoro":
				return null;
			case "countdown":
				return <Countdown />;
			case "stopwatch":
				return <Stopwatch />;
		}
	};

	return (
		<YStack flex={1}>
			{render()}
			<XStack>
				<View flex={1}>
					<Select value={timerMode} onValueChange={setTimerMode}>
						<Select.Trigger>
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							<Select.ScrollUpButton />
							<Select.Viewport>
								<Select.Group>
									<Select.Item value="pomodoro">
										<Select.ItemText>ポモドーロ</Select.ItemText>
									</Select.Item>
									<Select.Item value="countdown">
										<Select.ItemText>カウントダウン</Select.ItemText>
									</Select.Item>
									<Select.Item value="stopwatch">
										<Select.ItemText>ストップウォッチ</Select.ItemText>
									</Select.Item>
								</Select.Group>
							</Select.Viewport>
							<Select.ScrollDownButton />
						</Select.Content>
					</Select>
				</View>
			</XStack>
		</YStack>
	);
}
