import { FormEditor } from 'library/types/events';

const defaultEditorValues: FormEditor = {
	title: '',
	description: '',
	event_image: '',
	tag: [],
	cost: null,
	prepayment_cost: null,
	places: 0,
	mode: '',
	event_coach: [
		{
			first_name: '',
			last_name: '',
			middle_name: '',
			photo: '',
			description: '',
		},
	],
	event_block: [
		{
			description: '',
			image: '',
			subtitle: '',
			title: '',
		},
	],
	discount: [],
	event_type: '',
	time_from: null,
	time_to: null,
	timetable: [
		{
			time_from_day: new Date(),
			time_from: new Date(),
			time_to: new Date(),
		},
	],
	address: {
		country: '',
		city: '',
		street: '',
		house: '',
		office: '',
		unit: '',
		description: '',
	},
	phone: '',
	email: '',
};

export default defaultEditorValues;
