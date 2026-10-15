import { Tabs } from "expo-router";
import { ChartColumn, Timer } from "lucide-react-native";

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "タイマー",
					tabBarIcon: ({ color, size }) => <Timer color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="record"
				options={{
					title: "記録",
					tabBarIcon: ({ color, size }) => (
						<ChartColumn color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
}
