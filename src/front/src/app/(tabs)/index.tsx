import { useState } from "react";
import Stopwatch from "@/components/Stopwatch";

type TimerMode = "pomodoro" | "timer" | "stopwatch";

export default function Home() {
	const [timerMode, setTimerMode] = useState<TimerMode>("stopwatch");

	const render = () => {
		switch (timerMode) {
			case "stopwatch":
				return <Stopwatch />;
			case "pomodoro":
				return null;
			case "timer":
				return null;
		}
	};

	return render();
}
