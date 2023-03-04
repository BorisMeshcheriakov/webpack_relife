import SVG from 'react-inlinesvg';
import { Dispatch, SetStateAction, useEffect, useCallback } from 'react';
import cn from 'classnames';
import { useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { selectCartStatus } from 'library/redux/cart';

import CartIcon from './resources/icons/cart.svg';

import { DetailStorageItem } from 'library/models/shop';

import styles from './index.module.scss';

interface Props {
	onClick: () => void;
	storage: DetailStorageItem[];
	setShowSelectNote: Dispatch<SetStateAction<boolean>>;
	showSelectNote: boolean;
	attributesSelected: boolean;
}

const AddToCart = ({
	onClick,
	storage,
	showSelectNote,
	setShowSelectNote,
	attributesSelected,
}: Props) => {
	const cartStatus = useAppSelector(selectCartStatus);

	const isDisabled = useCallback(() => {
		return (storage.length > 0 && !attributesSelected) || cartStatus === 'loading';
	}, [cartStatus, storage, attributesSelected]);

	const onWrapperClick = () => {
		isDisabled() && setShowSelectNote(true);
	};

	useEffect(() => {
		!isDisabled() && setShowSelectNote(false);
	}, [isDisabled, setShowSelectNote]);

	return (
		<div className={styles.wrapper} onMouseDown={onWrapperClick}>
			<button onClick={onClick} disabled={isDisabled()} className={styles.container}>
				<div className={styles.icon}>
					<SVG src={CartIcon} />
				</div>
				<div className={styles.title}>В корзину</div>
			</button>
			<div className={cn(styles.note, showSelectNote && styles.visible)}>
				<div className={styles.note__arrow} />
				<div className={styles.note__text}>Выберите параметры товара</div>
			</div>
		</div>
	);
};

export default AddToCart;
