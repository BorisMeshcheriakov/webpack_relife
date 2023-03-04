import cn from 'classnames';

import { useAppDispatch, useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { selectSupportOpen, openSupportModal } from 'library/redux/modal';

import st from './index.module.scss';
import { Phone } from 'shared/assets';

type Props = {};

const ButtonSupport = (props: Props) => {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector(selectSupportOpen);
	return (
		<button
			className={cn(st.support, isOpen && st.active)}
			onClick={() => dispatch(openSupportModal())}
		>
			<Phone />
		</button>
	);
};

export default ButtonSupport;
