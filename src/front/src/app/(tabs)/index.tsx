import { useState } from "react";
import { Button, Sheet, Text, View, XStack, YStack } from "tamagui";
import Countdown from "@/components/Countdown";
import Pomodoro from "@/components/Pomodoro";
import Stopwatch from "@/components/Stopwatch";
import { type TimerMode, useTimerMode } from "@/states/timer-mode";

const modes: { value: TimerMode; label: string }[] = [
	{ value: "pomodoro", label: "ポモドーロ" },
	{ value: "countdown", label: "カウントダウン" },
	{ value: "stopwatch", label: "ストップウォッチ" },
];

export default function Home() {
	const timerMode = useTimerMode((state) => state.timerMode);
	const setTimerMode = useTimerMode((state) => state.setTimerMode);
	const [open, setOpen] = useState(false);

	const selectMode = (mode: TimerMode) => {
		setTimerMode(mode);
		setOpen(false);
	};

	const render = () => {
		switch (timerMode) {
			case "pomodoro":
				return <Pomodoro />;
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
					<Button onPress={() => setOpen(true)}>
						{modes.find((mode) => mode.value === timerMode)?.label}
					</Button>
				</View>
			</XStack>
			<Sheet modal open={open} onOpenChange={setOpen} snapPoints={[40]}>
				<Sheet.Overlay
					backgroundColor="black"
					transition="quick"
					opacity="0.5 enter:0 exit:0"
				/>

				<Sheet.Container>
					<Sheet.Background backgroundColor="$background" borderRadius="$6" />
					<YStack padding="$5" gap="$3">
						{modes.map(({ value, label }) => (
							<Button
								key={value}
								size="lg"
								theme={value === timerMode ? "active" : undefined}
								onPress={() => selectMode(value)}
							>
								{label}
							</Button>
						))}
					</YStack>
				</Sheet.Container>
			</Sheet>
		</YStack>
	);
}
