import { Text, XStack, YStack } from "tamagui";
import { useRecords } from "@/states/record";
import { formatDate, formatDuration } from "@/utils/date-util";

export default function About() {
	const { records } = useRecords();
	const dateRecords = Object.groupBy(records, (record) =>
		record.date.toDateString(),
	);

	return (
		<YStack flex={1}>
			{Object.entries(dateRecords).map(([date, records]) => (
				<YStack key={date}>
					<Text>{formatDate(date)}</Text>
					{records?.map((record) => (
						<XStack key={record.id}>
							<Text>{record.title}</Text>
							<Text>{`${formatDuration(record.duration)}`}</Text>
						</XStack>
					))}
				</YStack>
			))}
		</YStack>
	);
}
