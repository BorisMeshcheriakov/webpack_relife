import React from 'react';

import { ModalSmall } from 'library/components/common';
import { TextField } from '@mui/material';

type Props = {
	toggle: () => void;
};

const ModalPrepaid: React.FC<Props> = ({ toggle }) => {
	const onPay = () => {
		// TODO Логика внесения предоплаты

		toggle();
	};

	return (
		<ModalSmall isOpen onRequestClose={toggle} title="Укажите сумму">
			<div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: '20px' }}>
				<TextField fullWidth size="small" label="Укажите сумму" />
				<button
					style={{
						backgroundColor: '#4198c5',
						color: '#fff',
						flex: '0 0 100px',
						height: '40px',
						borderRadius: '4px',
						marginLeft: '10px',
					}}
					onClick={onPay}
				>
					Внести
				</button>
			</div>
		</ModalSmall>
	);
};

export default ModalPrepaid;
