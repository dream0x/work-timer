import { create } from "zustand";
import type { RecordType } from "@/types/type";
import { splitDateRangeByDay } from "@/utils/date-util";

export const useRecords = create<{
	records: RecordType[];
	addRecord: (start: Date, end: Date) => void;
}>((set) => ({
	records: [],
	addRecord: (start: Date, end: Date) => {
		set((s) => ({
			records: [
				...s.records,
				...splitDateRangeByDay(start, end).map((segment) => ({
					id: crypto.randomUUID(),
					...segment,
				})),
			],
		}));
	},
}));
