import React from 'react';
import { programsService } from 'library/api/programsService';
import { setProgram, selectProgram } from 'library/redux/programs';
import { useAppDispatch, useAppSelector } from '../common';
import { useUser } from '../user';
import { Program, ProgramDay } from 'library/models/programs';
import { ProgramVideo } from 'library/models/video';
import { getDaysLeft, getDuration } from 'library/helpers/programs';
import useRecommendation from './useRecommendation';
/**
 * @param id уникальный id программы
 * @param isAuthor является ли пользователь автором
 *
 * Данный хук контролирует загрузку программы.
 * Мы не всегда можем заранее проверить, является ли пользователь автором.
 * Там, где можем - используем параметр isAuthor.
 * Иначе сначала загружаем программу а затем проверям авторство и догружаем при необходимости остальное
 */

const useProgram = (id?: string, isAuthor?: boolean) => {
	const dispatch = useAppDispatch();
	const program = useAppSelector(selectProgram);
	const { user, isAuth } = useUser();

	const [day, setDay] = React.useState<number>(1);
	const [status, setStatus] = React.useState<'idle' | 'loading'>('idle');

	const { changeRecommendation } = useRecommendation();

	const getVideos = (program: Program | null, day: number) => {
		// для программы с периодичностью - фильтруем видеоролики по дням программы

		// TODO вынести в компонент списка упражнений

		if (!program || program.pk !== Number(id)) {
			return [] as ProgramVideo[];
		}

		let video: ProgramVideo[] = [];
		if (program.periodicity) {
			let selectedDay = day % 7 === 0 ? 7 : day % 7;
			let days = program.videos as ProgramDay[];
			days = days.filter((programDay) => programDay.day === selectedDay);
			let dayVideos = days.map((day) => day.exercises);
			video = video.concat(...dayVideos).filter((video) => video.visible);
		} else {
			video = program.videos ? ([...program.videos] as ProgramVideo[]) : [];
		}
		return video;
	};

	const isUserAuthor = React.useCallback(() => {
		return user?.user?.id === program?.author?.id;
	}, [program?.author?.id, user?.user?.id]);

	const resetSelectedDay = (program: Program | null) => {
		if (!program) return;
		if (program.periodicity && program.is_payed) {
			// для оплаченных программ с периодичностью - устанавливаем день

			let duration = getDuration(program);
			let left = getDaysLeft(program);
			let day = duration - left + 1;
			setDay(day <= 0 ? 1 : day);
		}
	};

	React.useEffect(() => {
		// dispatch(setProgram(null));
		const controller = new AbortController();

		const getProgram = async (id: string) => {
			/**
			 * Содержимое программы зависит от статуса ее оплаты и от статуса авторства пользователя
			 * Пользователь видит содержимое программы полностью если:
			 * - является автором
			 * - купил программу
			 * Не всегда есть возможность проверить авторство, поэтому приходится запрашивать разные апи для проверки
			 */

			try {
				setStatus('loading');
				// Делаем запрос программы, как клиент и проверяем авторство

				let response = await programsService.getProgram(id, { signal: controller.signal });

				dispatch(setProgram(response.data));

				if (
					response.data.individual &&
					response.data.individual.coach &&
					response.data.individual.id
				) {
					const { coach, recommendation_comment } = response.data.individual;
					changeRecommendation({
						coach: coach.user,
						comment: recommendation_comment ?? '',
						hashcode: '',
						programId: Number(id),
					});
				}

				if (response.data.periodicity) resetSelectedDay(response.data);

				setStatus('idle');
			} catch (error) {
				console.error(error);
				setStatus('idle');
			}
		};

		if (id && id !== 'new') {
			getProgram(id);
		}

		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, isAuthor, dispatch, user?.user?.id, isAuth]);

	const onDaySelect = (day: number) => {
		setDay(day);
	};

	return {
		program,
		videos: getVideos(program, day),
		day,
		onDaySelect,
		status,
		isAuthor: isUserAuthor(),
		resetSelectedDay: () => resetSelectedDay(program),
	};
};

export default useProgram;
