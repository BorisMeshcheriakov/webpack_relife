import { AxiosResponse } from 'axios';
import { statisticsService } from 'library/api/statisticsService';
import { Statistics } from 'library/models/statistics';
import {
	resetStatisticsModal,
	selectStatisticsMemo,
	setStatisticsListModal,
	setStatusStatisticsModal,
} from 'library/redux/statistics';
import { Mode } from 'library/types/statistics';
import { isEqual } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../common';

const useStatisticsModal = () => {
	const dispatch = useAppDispatch();
	const { statistics } = useAppSelector(selectStatisticsMemo, isEqual);
	const tabQuery = useParams<{ tab: any }>();
	const { push } = useHistory();

	const handleClose = useCallback(() => push('/statistics'), [push]);

	// Вспомогательный контролер для запросов в модалке
	const statisticsLoader = async (
		tabQuery: any,
		tab: Mode,
		date: string
	): Promise<AxiosResponse<Statistics[]> | any> => {
		try {
			switch (tabQuery) {
				case 'programs':
					return tab === 'year'
						? await statisticsService.getProgramsYearStatistics(date).then((data) => data)
						: await statisticsService.getProgramsMounthStatistics(date).then((data) => data);
				case 'events':
					return tab === 'year'
						? await statisticsService.getEventsYearStatistics(date).then((data) => data)
						: await statisticsService.getEventsMounthStatistics(date).then((data) => data);
				case 'consultations':
					return tab === 'year'
						? await statisticsService.getConsultationsYearStatistics(date).then((data) => data)
						: await statisticsService.getConsultationsMounthStatistics(date).then((data) => data);
				case 'tickets':
					return tab === 'year'
						? await statisticsService.getTicketYearStatistics(date).then((data) => data)
						: await statisticsService.getTicketMounthStatistics(date).then((data) => data);

				case 'orders':
					return tab === 'year'
						? await statisticsService.getStoreYearStatistics(date).then((data) => data)
						: await statisticsService.getStoreMounthStatistics(date).then((data) => data);
			}
		} catch (err) {
			throw err;
		}
	};

	const loadStatistics = useCallback(async () => {
		if (!tabQuery.tab) return;
		dispatch(setStatusStatisticsModal('loading'));
		try {
			const response = await statisticsLoader(tabQuery.tab, statistics.tab.code, statistics.date);
			if (!response.data) {
				throw response;
			}
			dispatch(setStatisticsListModal(response.data));
		} catch (e) {
			console.error(e);
		} finally {
			dispatch(setStatusStatisticsModal('idle'));
		}
	}, [dispatch, tabQuery.tab, statistics.date, statistics.tab]);

	useEffect(() => {
		// загрузка статистики при инициализации или изменении даты и табов
		loadStatistics();
	}, [dispatch, loadStatistics]);

	useEffect(() => {
		return () => {
			// ресет статистики в модальном окне и приравнивание данных к главной страницы ( tab ,date ,graphicsType)
			dispatch(resetStatisticsModal());
		};
	}, [dispatch]);

	return {
		handleClose,
		status: statistics.list.status,
	};
};

export default useStatisticsModal;
