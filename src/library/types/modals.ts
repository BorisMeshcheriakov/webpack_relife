export interface ModalState {
	isAuthOpen: boolean;
	isNotifyOpen: boolean;
	notifyProps: NotifyModal;
	isDialogOpen: boolean;
	dialogProps: DialogModal;
	isOutOpen: boolean;
	isSupportOpen: boolean;
	isModerationOpen: boolean;
	isPopupVisible: boolean;
	popupProps: Popup;
	moderationProps: ModerationModal;
	modalFrame: {
		isOpen: boolean;
		url: string;
	};
}

export interface Popup {
	type: 'message' | 'error' | 'success';
	text: string;
}

export interface NotifyModal {
	title: string;
	text: string;
	confirmText: string;
	confirm?: () => void;
}

export interface DialogModal {
	title: string;
	text: string;
	confirmText: string;
	confirm?: () => void;
	declineText: string;
	decline?: () => void;
	link?: {
		url: string;
		text: string;
	};
}

export interface ModerationModal {
	title: string;
	text: string;
	statusText?: string;
	confirmText: string;
	declineText: string;
	confirm?: () => void;
	decline?: () => void;
}
