import React, { useState } from 'react';
import Modal from 'react-modal';
// import QrScanner from 'react-webcam-qr-scanner';

import st from './Scanner.module.scss';

const Scanner = (props) => {
	return (
		<Modal
			className={st.modal}
			overlayClassName={st.overlay}
			isOpen={props.open}
			onRequestClose={props.close}
		>
			{/* <QrScanner
				onDecode={props.handleScan}
				constraints={{
					audio: false,
					video: {
						facingMode: 'environment',
					},
				}}
			/> */}
		</Modal>
	);
};

export default Scanner;
