import { createSlice } from '@reduxjs/toolkit';
import { ModalState } from 'library/types/modals';

import * as reducers from './reducers';

const initialState = {
	isAuthOpen: false,
	isNotifyOpen: false,
	notifyProps: {},
	isDialogOpen: false,
	dialogProps: {},
	isOutOpen: false,
	isSupportOpen: false,
	isPopupVisible: false,
	popupProps: {},
	isModerationOpen: false,
	moderationProps: {},
	modalFrame: {
		isOpen: false,
		url: '',
	},
} as ModalState;

export const modals = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		openAuthModal: reducers.openAuthModal,
		closeAuthModal: reducers.closeAuthModal,
		openNotifyModal: reducers.openNotifyModal,
		closeNotifyModal: reducers.closeNotifyModal,
		openOutModal: reducers.openOutModal,
		closeOutModal: reducers.closeOutModal,
		openDialogModal: reducers.openDialogModal,
		closeDialogModal: reducers.closeDialogModal,
		openSupportModal: reducers.openSupportModal,
		closeSupportModal: reducers.closeSupportModal,
		openModerationModal: reducers.openModerationModal,
		closeModerationModal: reducers.closeModerationModal,
		showPopup: reducers.showPopup,
		hidePopup: reducers.hidePopup,
		toggleFrameModal: reducers.toggleFrameModal,
	},
});

export const {
	openAuthModal,
	closeAuthModal,
	openNotifyModal,
	closeNotifyModal,
	openOutModal,
	closeOutModal,
	openDialogModal,
	closeDialogModal,
	openSupportModal,
	closeSupportModal,
	openModerationModal,
	closeModerationModal,
	showPopup,
	hidePopup,
	toggleFrameModal,
} = modals.actions;

export {
	selectAuthOpen,
	selectOutOpen,
	selectNotifyOpen,
	selectNotifyProps,
	selectDialogOpen,
	selectDialogProps,
	selectSupportOpen,
	selectModerationOpen,
	selectModerationProps,
	selectIsPopupVisible,
	selectPopupProps,
	selectFrameModal,
} from './selectors';

export default modals.reducer;
