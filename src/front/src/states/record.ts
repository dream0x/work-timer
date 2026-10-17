import { create } from "zustand";
import type { Record } from "@/types/type";
import { splitDateRangeByDay } from "@/utils/date-util";

export const useRecords = create<{
	records: Record[];
	createRecord: (title: string, start: Date, end: Date) => void;
}>((set) => ({
	records: [],
	createRecord: (title: string, start: Date, end: Date) => {
		set((s) => ({
			records: [
				...s.records,
				...splitDateRangeByDay(start, end).map((segment) => ({
					id: crypto.randomUUID(),
					title,
					...segment,
				})),
			],
		}));
	},
}));
