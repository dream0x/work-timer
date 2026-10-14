import { Text, YStack } from "tamagui";
import { useRecords } from "@/states/record";

export default function About() {
	const { records } = useRecords();
	const completed = records.filter((record) => record.duration !== null);

	return (
		<YStack>
			{completed.map((record) => (
				<Text key={record.id}>{`${record.id} - ${record.duration}`}</Text>
			))}
		</YStack>
	);
}
