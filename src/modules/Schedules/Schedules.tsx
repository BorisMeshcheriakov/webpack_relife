import React from 'react';

import { useModulePermissions } from 'library/hooks/module';

import { Calendar, SessionList } from './frames';

const Schedules: React.FC = () => {
	const { can_sell } = useModulePermissions();

	return can_sell ? <Calendar /> : <SessionList />;
};

export default Schedules;
