import { FC, memo } from 'react';
import { List, Profile } from './frames';

import st from './Menu.module.scss';

const Menu: FC = () => {
	return (
		<div className={st.wrapper}>
			<Profile />
			<List />
		</div>
	);
};

export default memo(Menu);
