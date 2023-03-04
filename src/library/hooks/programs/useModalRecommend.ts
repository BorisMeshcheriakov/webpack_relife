import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'library/hooks/common';
import { useModuleSettings } from 'library/hooks/module';
import { programsService } from 'library/api/programsService';
import { showPopup } from 'library/redux/modal';
import copy from 'copy-to-clipboard';

import useWindowDimensions from '../common/useWindowDimensions';

interface FormValues {
	comment: string;
	days_period: number;
}

type Props = {
	user?: string | number;
	close: () => void;
};

const useModalRecommend = ({ user, close }: Props) => {
	const dispatch = useAppDispatch();
	const { locationRoot } = useModuleSettings();
	const { recommendId } = useParams<{ [x: string]: string }>();
	const [step, setStep] = useState<number>(1);
	const { width } = useWindowDimensions();
	const isClients = locationRoot === 'clients';
	const showCloseBtn = width <= 600;

	const methods = useForm<FormValues>({ defaultValues: { days_period: 7 } });
	methods.watch('days_period');

	const invite = async (data: FormValues) => {
		let invite = {
			days: data.days_period ?? 28,
			recommendation_comment: data.comment?.length > 0 ? data.comment : undefined,
		};

		try {
			/**
			 * Для копирования ссылки в буфер обмена используем конструктор new ClipboardItem,
			 * иначе safari вернет NotAllowedError
			 */
			const makeHashPromise = async () => {
				const response = await programsService.inviteToProgram(recommendId, invite);
				return await `${window.location.origin}/${locationRoot}/subscribe/${recommendId}/${response.data.hashcode}`;
			};

			const link = await makeHashPromise();
			copy(link);
			dispatch(showPopup({ type: 'message', text: 'Скопировано в буфер обмена' }));
			close();
		} catch (error) {
			console.error(error);
			dispatch(showPopup({ type: 'error', text: 'Не удалось сгенерировать ссылку' }));
		}
	};

	const recommend = async (data: FormValues) => {
		if (!user) {
			return;
		}

		const recommendation = {
			days_period: data.days_period ?? 28,
			recommendation_comment: data.comment?.length > 0 ? data.comment : undefined,
			program: recommendId,
			user: user,
		};

		try {
			await programsService.recommend(recommendation);
			close();
			dispatch(showPopup({ type: 'success', text: 'Программа рекомендована Вашему клиенту' }));
		} catch (error) {
			console.error(error);
		}
	};

	const getRecommendAction = (data: FormValues) => {
		if (isClients) {
			recommend(data);
		} else {
			invite(data);
		}
	};

	return {
		getRecommendAction,
		locationRoot,
		step,
		setStep,
		isClients,
		methods,
		showCloseBtn,
	};
};

export default useModalRecommend;
