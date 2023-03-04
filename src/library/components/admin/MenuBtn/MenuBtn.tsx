import { menuBtn } from 'library/types/admin';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { default as SVG } from 'react-inlinesvg/esm';

import cn from 'classnames';
import st from './MenuBtn.module.scss';

interface Props {
	menuItem: menuBtn;
}

const MenuBtn: FC<Props> = ({ menuItem }) => {
	return (
		<Link
			to={!menuItem.disabled ? `${menuItem.link}` : '#'}
			key={menuItem.title}
			className={cn(st.btn, menuItem.disabled && st.disabled)}
		>
			<div className={st.btn__img}>
				<SVG src={menuItem.icon ?? ''} />
			</div>
			<div className={st.btn__title}>{menuItem.title}</div>
		</Link>
	);
};

export default memo(MenuBtn);
