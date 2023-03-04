const profileComplete = (profile: any): boolean => {
	const requiredFields = [
		'last_name',
		'first_name',
		// 'phonenumber',
		'birth_date',
		'gender',
		// 'email',
	];

	let status: boolean = true;

	if (profile) {
		const userProfile = profile.user ?? profile;

		if (userProfile) {
			for (const field of requiredFields) {
				if (!userProfile[field] || userProfile[field] === '') {
					status = false;
					break;
				}
			}
		}
	}
	return status;
};

export default profileComplete;
