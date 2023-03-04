import cn from 'classnames';

import st from './index.module.scss';

interface Props {
	active: boolean;
	onClick: () => void;
}

const BurgerButton = ({ active, onClick }: Props) => {
	return (
		<button className={cn(st.burgerBtn, active ? st.burgerBtn_active : '')} onClick={onClick}>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};

export default BurgerButton;
