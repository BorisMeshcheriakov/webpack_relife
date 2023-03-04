import { MenuBtn } from 'library/components/admin';
import { useMenuButtons } from 'library/hooks/admin';
import { FC, memo } from 'react';

import st from './List.module.scss';

const List: FC = () => {
	const { menuDynamicBtns, menuStaticBtns } = useMenuButtons();
	return (
		<div className={st.list}>
			<div className={st.scroll}>
				<div className={st.list__dynamic}>
					{menuDynamicBtns.map((item) => (
						<MenuBtn menuItem={item} key={item.title} />
					))}
				</div>
				<div className={st.list__static}>
					{menuStaticBtns.map((item) => (
						<MenuBtn menuItem={item} key={item.title} />
					))}
				</div>
			</div>
		</div>
	);
};

export default memo(List);
