import type { RootState } from 'core/redux/store';

export const selectAuthOpen = (state: RootState) => state.modals.isAuthOpen;
export const selectOutOpen = (state: RootState) => state.modals.isOutOpen;
export const selectNotifyOpen = (state: RootState) => state.modals.isNotifyOpen;
export const selectNotifyProps = (state: RootState) => state.modals.notifyProps;
export const selectDialogOpen = (state: RootState) => state.modals.isDialogOpen;
export const selectDialogProps = (state: RootState) => state.modals.dialogProps;
export const selectSupportOpen = (state: RootState) => state.modals.isSupportOpen;
export const selectModerationOpen = (state: RootState) => state.modals.isModerationOpen;
export const selectModerationProps = (state: RootState) => state.modals.moderationProps;
export const selectIsPopupVisible = (state: RootState) => state.modals.isPopupVisible;
export const selectPopupProps = (state: RootState) => state.modals.popupProps;
export const selectFrameModal = (state: RootState) => state.modals.modalFrame;
