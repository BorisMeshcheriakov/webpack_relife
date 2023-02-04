import { getMonth } from 'date-fns';
import React from 'react';

import st from './Footer.module.scss';

const Footer: React.FC = () => {
	const getCurrentMonth = () => {
		const date = new Date();
		return getMonth(date);
	};
	return (
		<footer role="footer" className={st.footer}>
			{getCurrentMonth()}
		</footer>
	);
};

export default Footer;
