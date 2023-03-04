const tabs: {
	[tab: string]: {
		code: string;
		title: string;
		params: {
			[param: string]: string;
		};
	};
} = {
	all: {
		code: 'all',
		title: 'Все',
		params: {
			bytime: 'future',
			moderation_status: 'A',
		},
	},
	rental: {
		code: 'rental',
		title: 'Участвую',
		params: {
			// bytime: 'future',
			buyedticket: '1',
		},
	},
	my: {
		code: 'my',
		title: 'Организую',
		params: {
			iamauthor: '1',
		},
	},
};

export default tabs;
