import { Tabs } from "expo-router";
import { Layers, Timer } from "lucide-react-native";

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
					tabBarIcon: ({ color, size }) => <Layers color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}
