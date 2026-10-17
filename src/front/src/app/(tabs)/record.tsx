import { Text, XStack, YStack } from "tamagui";
import { useRecords } from "@/states/record";
import { formatDate, formatDuration } from "@/utils/date-util";

export default function About() {
	const { records } = useRecords();
	const dateRecords = Object.groupBy(records, (record) =>
		record.date.toDateString(),
	);

	return (
		<YStack flex={1} padding="$10">
			{Object.entries(dateRecords).map(([date, records]) => (
				<YStack key={date} gap="$2.5">
					<Text>{formatDate(date)}</Text>
					{records?.map((record) => (
						<XStack key={record.id} background="gray-200">
							<Text flex={1} numberOfLines={1}>
								{record.title}
							</Text>
							<Text flex={1}>{`${formatDuration(record.duration)}`}</Text>
						</XStack>
					))}
				</YStack>
			))}
		</YStack>
	);
}
