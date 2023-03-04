import React from 'react';
// import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

import st from './Zoom.module.scss';

// interface generateSignatureProps {
// 	apiKey: string;
// 	apiSecret: string;
// 	meetingNumber: string;
// 	role: string | number;
// 	success?: Function;
// 	error?: Function;
// }

const Zoom: React.FC = () => {
	// const crypto = require('crypto');
	// // const rootElement = document.getElementById('meetingSDKElement');
	// const rootElement = React.useRef<HTMLDivElement>(null);

	// const apiKey = 'TpX7j5PVRmmGs6Oi7ZY11w';
	// const apiSecret = 'VQg36kDuBU9mjVPSzkJafjvA9Ay5lWmYIzaz';
	// const meetingNumber = '71019536316';
	// const role = '0';
	// const userName = 'test';
	// const password = 'bi4Yq0';

	// const client = ZoomMtgEmbedded.createClient();

	// const generateSignature = function (props: any) {
	// 	const apiKey = props.apiKey;
	// 	const apiSecret = props.apiSecret;
	// 	const meetingNumber = props.meetingNumber;
	// 	const role = props.role;
	// 	// Prevent time sync issue between client signature generation and zoom
	// 	const timestamp = new Date().getTime() - 30000;
	// 	const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
	// 	const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64');
	// 	const signature = Buffer.from(
	// 		`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
	// 	).toString('base64');
	// 	if ('success' in props && props.success) {
	// 		props.success(signature);
	// 	}

	// 	return signature;
	// };

	// 	function generateSignature(props: generateSignatureProps) {
	// 		let signature = '';
	// 		const { apiKey, apiSecret, meetingNumber, role } = props;
	// 		try {
	// 			const timestamp = new Date().getTime() - 30000;
	// 			const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
	// 			const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64');
	// 			signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString(
	// 				'base64'
	// 			);

	// 			if (props?.success) {
	// 				props.success(signature);
	// 			}
	// 		} catch (e) {
	// 			console.error(e);
	// 		}
	// 		return signature;
	// 	}

	// 	const signature = generateSignature({
	// 		apiKey: apiKey,
	// 		apiSecret: apiSecret,
	// 		meetingNumber: meetingNumber,
	// 		role: role,
	// 	});

	// 	const join = () => {
	// 		client
	// 			.join({
	// 				sdkKey: apiKey,
	// 				signature: signature, // role in SDK Signature needs to be 0
	// 				meetingNumber: meetingNumber,
	// 				password: password,
	// 				userName: userName,
	// 			})
	// 			.then((e: any) => {
	// 				console.log('join success', e);
	// 			})
	// 			.catch((e: any) => {
	// 				console.log('join error', e);
	// 			});
	// 	};

	// 	React.useEffect(() => {
	// 		console.log(rootElement.current);
	// 		if (rootElement.current) {
	// 			client
	// 				.init({
	// 					debug: true,
	// 					zoomAppRoot: rootElement.current as HTMLElement,
	// 					language: 'en-US',
	// 					customize: {
	// 						video: {
	// 							popper: {
	// 								disableDraggable: true,
	// 							},
	// 						},
	// 					},
	// 				})
	// 				.then((e: any) => {
	// 					console.log('init success', e);
	// 				})
	// 				.catch((e: any) => {
	// 					console.log('init error', e);
	// 				});
	// 		}
	// 	}, [rootElement.current]);

	return (
		<div className={st.zoom}>
			{/* <h1>Zoom Встреча</h1>
			<button onClick={join}>Присоединиться</button>
			<div ref={rootElement} className={st.wrapper} id="zoomRoot"></div> */}
		</div>
	);
};

export default Zoom;
