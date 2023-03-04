import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';

import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';
import { closeOutModal } from 'library/redux/modal';

import useLogin from 'library/hooks/auth/useLogin';
import { HeadModal, Button } from 'library/components/common';

import styles from './ModalOut.module.scss';

const ModalOut = () => {
	const dispatch = useAppDispatch();
	const { push } = useHistory();
	const { logout } = useLogin();

	const closeModal = () => {
		dispatch(closeOutModal());
	};

	const logOut = async () => {
		await logout();
		dispatch(closeOutModal());
		push('/');
	};

	return (
		<Modal
			isOpen
			ariaHideApp={false}
			className={styles.out}
			overlayClassName={styles.out__overlay}
			onRequestClose={closeModal}
		>
			<HeadModal title={'Выход'} />
			<div className={styles.out__text}>Выйти из аккаунта?</div>
			<div className={styles.out__group}>
				<button className={styles.button} onClick={closeModal}>
					Отмена
				</button>
				<Button children={'Выйти'} handler={() => logOut()} />
			</div>
		</Modal>
	);
};

export default ModalOut;
