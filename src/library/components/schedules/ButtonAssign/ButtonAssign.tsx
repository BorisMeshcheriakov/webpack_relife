import React from 'react';
import { Add } from '@mui/icons-material';

import { Link } from 'react-router-dom';

import st from './ButtonAssign.module.scss';

const ButtonAssign: React.FC = () => {
	return (
		<Link to="/specialists" className={st.assign}>
			<div className={st.assign__text}>Записаться на консультацию</div>
			<div className={st.assign__icon}>
				<Add />
			</div>
		</Link>
	);
};

export default ButtonAssign;
