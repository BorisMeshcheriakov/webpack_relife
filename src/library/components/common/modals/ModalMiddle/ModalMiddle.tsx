import { FC } from 'react';
import cn from 'classnames';
import useWindowDimensions from 'library/hooks/common/useWindowDimensions';
import Modal from 'react-modal';
import { ButtonCross } from '../../buttons';

import st from './ModalMiddle.module.scss';

interface Props {
	isOpen: boolean;
	children?: React.ReactNode;
	close?: () => void;
	onRequestClose?: () => void;
	info?: string;
	title?: string;
	className?: string;
	showClose?: boolean;
}

const ModalMiddle: FC<Props> = ({
	isOpen,
	children,
	close,
	onRequestClose,
	className,
	showClose = true,
}) => {
	const { width, height } = useWindowDimensions();
	return (
		<Modal
			isOpen={isOpen}
			ariaHideApp={false}
			onRequestClose={onRequestClose}
			className={cn(st.modal, className)}
			overlayClassName={st.overlay}
		>
			{showClose && (
				<div className={st.close}>
					<ButtonCross theme={width > 600 && height > 600 ? 'white' : 'grey'} handler={close} />
				</div>
			)}

			{children}
		</Modal>
	);
};

export default ModalMiddle;
