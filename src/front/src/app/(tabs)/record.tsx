import { Text, YStack } from "tamagui";
import { useRecords } from "@/states/record";
import { formatDate, formatDuration } from "@/utils/date-util";

export default function About() {
	const { records } = useRecords();
	const dateRecords = new Map<string, typeof records>();
	for (const record of records) {
		const key = record.date.toDateString();
		dateRecords.set(key, [...(dateRecords.get(key) ?? []), record]);
	}

	return (
		<YStack flex={1} padding="$10">
			{[...dateRecords].map(([date, records]) => (
				<YStack key={date} gap="$2.5">
					<Text>{formatDate(date)}</Text>
					{records?.map((record) => (
						<YStack
							key={record.id}
							background="gray-200"
							padding="$2.5"
							borderRadius="$5"
						>
							<Text numberOfLines={1}>{record.title}</Text>
							<Text>{`${formatDuration(record.duration)}`}</Text>
						</YStack>
					))}
				</YStack>
			))}
		</YStack>
	);
}
