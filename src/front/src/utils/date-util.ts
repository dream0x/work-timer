import type { AddRecord, Record } from "@/types/type";

/**
 * 開始日時から終了日時までの期間を日ごとに分割する
 */
export const splitDateRangeByDay = (
	startDate: Date,
	endDate: Date,
): AddRecord[] => {
	const result: AddRecord[] = [];
	let current = new Date(startDate);

	while (current < endDate) {
		// 翌日の午前0時
		const nextDay = new Date(current);
		nextDay.setHours(24, 0, 0, 0);

		// 指定終了日時と翌日0時のうち、早い方
		const dayEnd = new Date(Math.min(nextDay.getTime(), endDate.getTime()));

		result.push({
			date: new Date(
				current.getFullYear(),
				current.getMonth(),
				current.getDate(),
			),
			start: new Date(current),
			end: new Date(dayEnd),
			duration: dayEnd.getTime() - current.getTime(),
		});

		current = dayEnd;
	}

	return result;
};

function groupByDate(records: Record[]) {
	const groups = new Map<string, Record[]>();

	for (const record of records) {
		const date = [
			record.start.getFullYear(),
			String(record.start.getMonth() + 1).padStart(2, "0"),
			String(record.start.getDate()).padStart(2, "0"),
		].join("-");

		const group = groups.get(date) ?? [];
		group.push(record);
		groups.set(date, group);
	}

	return [...groups.entries()]
		.sort(([a], [b]) => b.localeCompare(a))
		.map(([date, data]) => ({ date, data }));
}

/**
 * 期間をフォーマットする
 */
export const formatDuration = (ms: number) => {
	const totalSeconds = Math.floor(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	return `${hours}h${minutes}m${seconds}s:`;
};

/**
 * 日付をフォーマットする
 */
export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}年${month}月${day}日`;
};
