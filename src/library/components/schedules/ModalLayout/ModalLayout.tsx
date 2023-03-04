import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ModalLarge } from 'library/components/common';

import React from 'react';

import st from './ModalLayout.module.scss';

type Props = {
	title: string;
	onSubmit: () => void;
	close: () => void;
	submitTitle: string;
	showSubmit: boolean;
	children: React.ReactNode;
};

const ModalLayout: React.FC<Props> = ({
	title,
	onSubmit,
	close,
	submitTitle,
	showSubmit,
	children,
}) => {
	return (
		<ModalLarge disableHeader isOpen>
			<div className={st.modal}>
				<section className={st.modal__head}>
					<h2 className={st.modal__title}>{title}</h2>
					{showSubmit && (
						<button className={st.modal__submit} onClick={onSubmit}>
							{submitTitle}
						</button>
					)}

					<div className={st.modal__close}>
						<IconButton onClick={close}>
							<Close />
						</IconButton>
					</div>
				</section>
				<section className={st.modal__body}>{children}</section>
			</div>
		</ModalLarge>
	);
};

export default ModalLayout;
