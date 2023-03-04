import React from 'react';
import { useAppSelector } from 'library/hooks/common/reduxTypedHooks';

import { selectIsCartOpen } from 'library/redux/cart';
import {
	selectOutOpen,
	selectAuthOpen,
	selectNotifyOpen,
	selectDialogOpen,
	selectSupportOpen,
	selectModerationOpen,
	selectIsPopupVisible,
	selectFrameModal,
} from 'library/redux/modal';

import { Authentication, SupportModal, Cart } from 'modules';
import {
	ModalOut,
	ModalDialog,
	ModalInfo,
	ModalModeration,
	Popup,
	ModalFrame,
} from 'library/components/common';
import { AuthProvider } from 'library/components/authentication';

const RootModal: React.FC = () => {
	const authOpen = useAppSelector(selectAuthOpen);
	const outOpen = useAppSelector(selectOutOpen);
	const notifyOpen = useAppSelector(selectNotifyOpen);
	const dialogOpen = useAppSelector(selectDialogOpen);
	const cartOpen = useAppSelector(selectIsCartOpen);
	const supportOpen = useAppSelector(selectSupportOpen);
	const moderationOpen = useAppSelector(selectModerationOpen);
	const popupVisible = useAppSelector(selectIsPopupVisible);
	const frameModal = useAppSelector(selectFrameModal);

	return (
		<>
			{authOpen && (
				<AuthProvider>
					<Authentication />
				</AuthProvider>
			)}
			{outOpen && (
				<AuthProvider>
					<ModalOut />
				</AuthProvider>
			)}
			{dialogOpen && <ModalDialog />}
			{notifyOpen && <ModalInfo />}
			{cartOpen && <Cart />}
			{supportOpen && <SupportModal />}
			{moderationOpen && <ModalModeration />}
			{popupVisible && <Popup />}

			{frameModal.isOpen && <ModalFrame />}
		</>
	);
};

export default RootModal;
