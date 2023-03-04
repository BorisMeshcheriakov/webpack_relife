import { programsService } from 'library/api/programsService';
import { openNotifyModal } from 'library/redux/modal';
import React from 'react';
import { deleteCookie, getCookie } from '../../../setupCookie';
import { useAppDispatch } from '../common';
import useRecommendation from './useRecommendation';

const useUpdateRecommendation = ({ id }: { id: number }) => {
	const hashcode = getCookie('subscribe_hash');

	const dispatch = useAppDispatch();

	const [status, setStatus] = React.useState('idle');
	const { changeRecommendation } = useRecommendation();

	React.useEffect(() => {
		const subscribe = async (hashcode: string | undefined) => {
			if (status !== 'idle' || !hashcode) return;

			const subscribe = JSON.parse(hashcode);

			if (id !== Number(subscribe.program)) return;
			try {
				setStatus('loading');
				const response = await programsService.subscribe(subscribe.hashcode);
				if (response.data.invite) {
					changeRecommendation({
						coach: response.data.invite.coach.user,
						comment: response.data.invite.recommendation_comment ?? '',
						hashcode: hashcode,
						programId: response.data.invite.program.id,
					});
				}

				if (!response.data.status) {
					deleteCookie('subscribe_hash');

					if (response.data.invite) {
						dispatch(
							openNotifyModal({
								title: '',
								text: `Вам рекомендована программа "${response.data.invite.program.title}"`,
								confirmText: 'Ок',
							})
						);
					}
				}

				if (response.data.individualprogram_id) {
					deleteCookie('subscribe_hash');
					dispatch(
						openNotifyModal({
							title: 'Рекомендация',
							text: 'Программа уже рекомендована',
							confirmText: 'Ок',
						})
					);
				}

				if (!response.data || response.data.message) {
					throw response;
				}
			} catch (error) {
				console.error(error);
			}
			setStatus('loaded');
		};

		subscribe(hashcode);
	}, [changeRecommendation, dispatch, hashcode, status, id]);

	return {};
};

export default useUpdateRecommendation;
