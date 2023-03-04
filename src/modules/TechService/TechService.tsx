import React from 'react';

import { Button } from 'library/components/common';
import st from './TechService.module.scss';

const TechService: React.FC = () => {
	return (
		<div className={st.root}>
			<p>На сайте идут технические работы</p>
			<p>Попробуйте перезагрузить страницу через несколько минут</p>

			<Button handler={() => (window.location.href = '/')}>На главную</Button>
		</div>
	);
};

export default TechService;
