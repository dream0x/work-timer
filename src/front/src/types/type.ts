export type Record = {
	id: string;
	date: Date;
	start: Date;
	end: Date;
	duration: number;
	title: string;
};

export type AddRecord = {
	date: Date;
	start: Date;
	end: Date;
	duration: number;
};
