import React from 'react';
import Modal from 'react-modal';
import cn from 'classnames';

import { useWebSettings } from 'library/hooks/common';

import st from './ModalSmall.module.scss';

interface Props {
	isOpen: boolean;
	title?: string;
	close?: () => void;
	onRequestClose?: () => void;
	children: React.ReactNode;
	darkOverlay?: boolean;
	className?: string;
	overlayClassName?: string;
}

const ModalSmall = ({
	isOpen,
	title,
	close,
	onRequestClose,
	children,
	darkOverlay,
	className,
	overlayClassName,
}: Props) => {
	const { logo, resource_name } = useWebSettings();

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			ariaHideApp={false}
			className={cn(st.modal, className)}
			overlayClassName={cn(st.overlay, darkOverlay && st.dark, overlayClassName)}
		>
			<div className={st.head}>
				{logo && <img className={st.head__icon} src={logo} alt={resource_name ?? ''} />}
				<span className={st.head__title}>{title}</span>
			</div>
			{children}
		</Modal>
	);
};

export default ModalSmall;
