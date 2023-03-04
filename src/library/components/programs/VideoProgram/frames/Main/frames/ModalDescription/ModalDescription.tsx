import React from 'react';
import { ModalLarge } from 'library/components/common';
import { Mode } from 'library/types/programs';
import { Card } from 'library/components/ui';

type Props = {
	description: string;
	close: () => void;
	mode: Mode;
};

const ModalDescription: React.FC<Props> = ({ description, close, mode }) => {
	const getTitle = (mode: Mode) => {
		let title = 'Комментарий специалиста';
		switch (mode) {
			case 'video':
				title = 'Описание видео';
				break;
			default:
				break;
		}
		return title;
	};

	return (
		<ModalLarge title={getTitle(mode)} isOpen onRequestClose={close} close={close}>
			<div style={{ display: 'flex', padding: '0 20px 20px 20px', overflow: 'auto', flexGrow: 1 }}>
				<Card>{description}</Card>
			</div>
		</ModalLarge>
	);
};

export default ModalDescription;
