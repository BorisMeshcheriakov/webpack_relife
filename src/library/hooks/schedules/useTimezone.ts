import { utcToZonedTime } from 'date-fns-tz';
import {
	selectTimezone,
	changeTimezone,
	selectDate,
	changeDate,
	getConsultations,
	selectTab,
} from 'library/redux/schedules';
import { Calendar } from 'library/types/schedules';
import { useAppDispatch, useAppSelector } from '../common';
import { useUser } from '../user';

type Props = {
	calendar: Calendar;
};

const useTimezone = ({ calendar }: Props) => {
	const dispatch = useAppDispatch();
	const timezone = useAppSelector((state) => selectTimezone(state, calendar));
	const date = useAppSelector((state) => selectDate(state, calendar));
	const tab = useAppSelector(selectTab);
	const { user } = useUser();

	const setTimezone = (tz: string) => {
		dispatch(changeTimezone({ timezone: tz, calendar: calendar }));
		dispatch(changeDate({ date: utcToZonedTime(date, tz), calendar: calendar }));

		if (user?.is_coach) {
			dispatch(
				getConsultations({
					date: utcToZonedTime(date, tz),
					tab: tab,
					id: user?.user?.id!,
					calendar: calendar,
					tz,
				})
			);
		}
	};

	const list = [
		{
			tz: 'Europe/Kaliningrad',
			city: 'Калининград',
			utcOffset: '+2',
		},
		{
			tz: 'Europe/Moscow',
			city: 'Москва',
			utcOffset: '+3',
		},
		{
			tz: 'Europe/Samara',
			city: 'Самара',
			utcOffset: '+4',
		},
		{
			tz: 'Asia/Yekaterinburg',
			city: 'Екатеринбург',
			utcOffset: '+5',
		},
		{
			tz: 'Asia/Omsk',
			city: 'Омск',
			utcOffset: '+6',
		},
		{
			tz: 'Asia/Krasnoyarsk',
			city: 'Красноярск',
			utcOffset: '+7',
		},
		{
			tz: 'Asia/Irkutsk',
			city: 'Иркутск',
			utcOffset: '+8',
		},
		{
			tz: 'Asia/Yakutsk',
			city: 'Якутск',
			utcOffset: '+9',
		},
		{
			tz: 'Asia/Vladivostok',
			city: 'Владивосток',
			utcOffset: '+10',
		},
		{
			tz: 'Asia/Magadan',
			city: 'Магадан',
			utcOffset: '+11',
		},
		{
			tz: 'Asia/Kamchatka',
			city: 'Магадан',
			utcOffset: '+12',
		},
		{
			tz: 'America/New_York',
			city: 'Нью-Йорк',
			utcOffset: '-5',
		},
	];

	const buttonText = (timezone: string) => {
		const tz = list.find((item) => item.tz === timezone);
		return `GMT ${tz?.utcOffset} ${tz?.city}`;
	};

	return {
		timezone,
		setTimezone,
		list,
		buttonText: buttonText(timezone),
	};
};

export default useTimezone;
