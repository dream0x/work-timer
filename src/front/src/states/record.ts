import { create } from "zustand";
import type { TimeRecord } from "@/types/type";

export const useRecords = create<{
	records: TimeRecord[];
	recordingId: string | null;
	startRecord: () => void;
	stopRecord: () => void;
}>((set, get) => ({
	records: [],
	recordingId: null,
	startRecord: () => {
		const id = crypto.randomUUID();
		set((s) => ({
			records: [
				...s.records,
				{ id, start: new Date(), end: null, duration: null },
			],
			recordingId: id,
		}));
	},
	stopRecord: () => {
		const { recordingId } = get();
		if (!recordingId) return;
		const endDate = new Date();
		set((s) => ({
			records: s.records.map((r) =>
				r.id === recordingId
					? {
							...r,
							end: endDate,
							duration: endDate.getTime() - r.start.getTime(),
						}
					: r,
			),
			recordingId: null,
		}));
	},
}));
