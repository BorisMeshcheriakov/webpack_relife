import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'core/redux/store';

export const selectUserData = (state: RootState) => state.users;

export const selectUser = (state: RootState) => state.users.user;

export const selectConsultationSettings = createSelector(
	(state: RootState) => state.users.user,
	(items) => {
		if (items) {
			const consultationCost = items.consultation_cost ?? 0;
			const consultationDuration = items.consultation_duration
				? parseFloat(items.consultation_duration)
				: 0;
			const consultationOfflineCost = items.consultation_offline_cost ?? 0;
			const consultationOfflineDuration = items.consultation_offline_duration
				? parseFloat(items.consultation_offline_duration)
				: 0;
			const consultationOfflinePrepayment = items.consultation_offline_prepayment ?? 0;
			const consultationPrepayment = items.consultation_prepayment ?? 0;

			return {
				ON: {
					cost: consultationCost,
					duration: isNaN(consultationDuration) ? 0 : consultationDuration,
					prepayment: consultationPrepayment,
				},
				OF: {
					cost: consultationOfflineCost,
					duration: isNaN(consultationOfflineDuration) ? 0 : consultationOfflineDuration,
					prepayment: consultationOfflinePrepayment,
				},
			};
		}
	}
);
