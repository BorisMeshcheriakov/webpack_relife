import React from 'react';
import { usersService } from 'library/api/usersService';
import { IAm } from 'library/models/users';
import { selectMode } from 'library/redux/schedules';
import { setUserData } from 'library/redux/users';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../common';
import { useUser } from '../user';
import { modes, verboseDuration } from 'library/helpers/schedules';
import { selectConsultationSettings } from 'library/redux/users/selectors';

const useSettings = () => {
	const dispatch = useAppDispatch();
	const { user } = useUser();
	const mode = useAppSelector(selectMode);
	const settings = useAppSelector(selectConsultationSettings);
	const [isLoading, setIsLoading] = React.useState(false);

	const { register, handleSubmit, getValues, setValue, watch } = useForm({
		defaultValues: {
			duration: settings![mode].duration * 30,
			cost: settings![mode].cost === 0 ? '' : settings![mode].cost / 100,
			prepayment: settings![mode].prepayment === 0 ? '' : settings![mode].prepayment / 100,
		},
	});

	const onSubmit = async (data: any) => {
		setIsLoading(true);
		// console.log(data);
		const newSettings = {
			[modes[mode].coachPriceKey]: data.cost * 100,
			[modes[mode].coachDurationKey]: JSON.stringify(data.duration / 30),
			[modes[mode].coachPrepaymentKey]: data.prepayment * 100,
		};

		const backup = {
			[modes[mode].coachPriceKey]: settings![mode].cost,
			[modes[mode].coachDurationKey]: settings![mode].duration,
			[modes[mode].coachPrepaymentKey]: settings![mode].prepayment,
		};

		const userData = { ...user } as IAm;
		try {
			const response = await usersService.editCoach(user?.id!, newSettings);

			if (!response.data) {
				throw response;
			}

			dispatch(setUserData({ ...userData, ...newSettings }));
		} catch (error) {
			console.error(error);
			dispatch(setUserData({ ...userData, ...backup }));
		} finally {
			setIsLoading(false);
		}
	};

	const onDurationChange = (type: 'increment' | 'decrement') => {
		let duration = getValues('duration');
		switch (type) {
			case 'increment':
				duration = duration >= 720 ? 720 : duration + 30;
				break;
			case 'decrement':
				duration = duration <= 30 ? 30 : duration - 30;
				break;
			default:
				break;
		}
		setValue('duration', duration);
	};

	return {
		register,
		handleSubmit,
		onSubmit,
		onDurationChange,
		title: modes[mode].settingsTitle,
		isLoading,
		duration: verboseDuration(watch('duration') / 30),
	};
};

export default useSettings;
