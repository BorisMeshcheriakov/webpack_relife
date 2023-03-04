import React from 'react';
import qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';

const ProgramPayment: React.FC = () => {
	const { search } = useLocation();
	const { push } = useHistory();

	React.useEffect(() => {
		const { program } = qs.parse(search);
		const section = localStorage.getItem('section');

		if (section && program) {
			push(`/${section}/program/${program}`);
		}
		return () => {};
	}, [search, push]);

	return <></>;
};

export default ProgramPayment;
