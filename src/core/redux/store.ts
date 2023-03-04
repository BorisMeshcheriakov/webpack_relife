import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import common from 'library/redux/common';
// import users from 'library/redux/users';
// import shop from 'library/redux/shop';
// import modals from 'library/redux/modal';
// import cart from 'library/redux/cart';
// import events from 'library/redux/events';
// import programs from 'library/redux/programs';
// import schedules from 'library/redux/schedules';
// import specialists from 'library/redux/specialists';
// import notifications from 'library/redux/notifications';
// import statistics from 'library/redux/statistics';
// import clients from 'library/redux/clients';

export const store = configureStore({
	reducer: {
		common,
		// users,
		// shop,
		// modals,
		// cart,
		// events,
		// programs,
		// schedules,
		// specialists,
		// notifications,
		// statistics,
		// clients,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
