import { useEffect, useCallback } from 'react';
import ModalLarge from 'library/components/common/modals/ModalLarge';

import st from './Acquiring.module.scss';

interface Props {
	isOpen: boolean;
	url: string;
	setIsOpen: (isOpen: boolean) => void;
	onSuccess: () => void;
	onClose?: () => void;
}

const Acquiring = ({ isOpen, url, setIsOpen, onSuccess, onClose }: Props) => {
	const onManualClose = () => {
		onClose ? onClose() : setIsOpen(false);
	};

	const handleSuccess = useCallback(() => {
		onSuccess();
	}, [onSuccess]);

	const handleMessage = useCallback(
		(event: MessageEvent) => {
			const { data } = event;
			// console.log(event);

			if (data.source === 'paymentModal' && data.payload.redirect) {
				handleSuccess();
			}
		},
		[handleSuccess]
	);

	useEffect(() => {
		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [handleMessage]);

	return (
		<ModalLarge
			isOpen={isOpen}
			close={onManualClose}
			// onRequestClose={() => setIsOpen(false)}
		>
			<div className={st.loader}>
				<div className={st.spinner} />
			</div>

			<iframe className={st.frame} title="payment" src={url} frameBorder="0" />
		</ModalLarge>
	);
};

export default Acquiring;
