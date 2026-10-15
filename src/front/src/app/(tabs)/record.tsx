import { Text, YStack } from "tamagui";
import { useRecords } from "@/states/record";
import type { RecordType } from "@/types/type";
import { formatDate, formatDuration } from "@/utils/date-util";

export default function About() {
	const { records } = useRecords();
	const dateGroup = Object.groupBy(records, (record) =>
		record.date.toDateString(),
	);
	const sections = Object.entries(dateGroup)
		.filter((entry): entry is [string, RecordType[]] => entry[1] !== undefined)
		.map(([date, data]) => ({
			title: date,
			data,
		}));

	return (
		<YStack flex={1}>
			{Object.entries(dateGroup).map(([date, records]) => (
				<YStack key={date}>
					<Text>{formatDate(new Date(date))}</Text>
					{records?.map((record) => (
						<Text key={record.id}>{`${formatDuration(record.duration)}`}</Text>
					))}
				</YStack>
			))}
		</YStack>
	);
}
