import React from 'react';
import Modal from 'react-modal';
import cn from 'classnames';

import useWindowDimensions from 'library/hooks/common/useWindowDimensions';
import { useScroll } from './hooks';
import { ButtonCross } from 'library/components/common';

import st from './ModalLarge.module.scss';

interface Props {
	isOpen: boolean;
	children?: React.ReactNode;
	close?: () => void;
	onRequestClose?: () => void;
	info?: string;
	title?: string;
	disableHeader?: boolean;
}

const ModalLarge = ({
	isOpen,
	children,
	close,
	onRequestClose,
	info,
	title,
	disableHeader,
}: Props): JSX.Element => {
	const { width } = useWindowDimensions();

	useScroll();

	return (
		<Modal
			isOpen={isOpen}
			ariaHideApp={false}
			onRequestClose={onRequestClose}
			className={st.modal}
			overlayClassName={st.overlay}
		>
			{!disableHeader && (
				<section className={st.head}>
					<span className={st.head__info}>{info}</span>
					<h2 className={st.head__title}>{title}</h2>
					<div className={cn(st.head__close, onRequestClose && st.hidden)}>
						<ButtonCross theme={width > 1024 ? 'white' : 'grey'} handler={close} />
					</div>
				</section>
			)}

			{children}
		</Modal>
	);
};

export default ModalLarge;
