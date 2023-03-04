import { PayloadAction } from '@reduxjs/toolkit';
import { ModalState, NotifyModal, DialogModal, ModerationModal, Popup } from 'library/types/modals';

export const openAuthModal = (state: ModalState) => {
	state.isAuthOpen = true;
};

export const closeAuthModal = (state: ModalState) => {
	state.isAuthOpen = false;
};

export const openNotifyModal = (state: ModalState, action: PayloadAction<NotifyModal>) => {
	state.isNotifyOpen = true;
	state.notifyProps = action.payload;
};

export const closeNotifyModal = (state: ModalState) => {
	state.isNotifyOpen = false;
	state.notifyProps = {} as NotifyModal;
};

export const openOutModal = (state: ModalState) => {
	state.isOutOpen = true;
};

export const closeOutModal = (state: ModalState) => {
	state.isOutOpen = false;
};

export const openDialogModal = (state: ModalState, action: PayloadAction<DialogModal>) => {
	state.isDialogOpen = true;
	state.dialogProps = action.payload;
};

export const closeDialogModal = (state: ModalState) => {
	state.isDialogOpen = false;
	state.dialogProps = {} as DialogModal;
};

export const openSupportModal = (state: ModalState) => {
	state.isSupportOpen = true;
};

export const closeSupportModal = (state: ModalState) => {
	state.isSupportOpen = false;
};

export const openModerationModal = (state: ModalState, action: PayloadAction<ModerationModal>) => {
	state.isModerationOpen = true;
	state.moderationProps = action.payload;
};

export const closeModerationModal = (state: ModalState) => {
	state.isModerationOpen = false;
};

export const showPopup = (state: ModalState, action: PayloadAction<Popup>) => {
	state.isPopupVisible = true;
	state.popupProps = action.payload;
};

export const hidePopup = (state: ModalState) => {
	state.isPopupVisible = false;
	state.popupProps = {} as Popup;
};

export const toggleFrameModal = (
	state: ModalState,
	action: PayloadAction<{ isOpen: boolean; url: string }>
) => {
	state.modalFrame = action.payload;
};
