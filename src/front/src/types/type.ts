export type RecordType = {
	id: string;
	date: Date;
	start: Date;
	end: Date;
	duration: number;
	title: string;
};

export type AddRecordType = {
	date: Date;
	start: Date;
	end: Date;
	duration: number;
};
