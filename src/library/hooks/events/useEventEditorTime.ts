/* eslint-disable no-template-curly-in-string */
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { format, isValid, parse } from 'date-fns';
import { mask } from 'library/helpers/events/timePicker';
import { conformToMask } from 'react-text-mask';
import { useFormContext } from 'react-hook-form';

const useEventEditorTime = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [visible, setVisible] = useState<boolean>(false);
	const [checked, setChecked] = useState({
		hours: '',
		minutes: '00',
	});
	const { setValue, getValues } = useFormContext();

	const matches = useMediaQuery('(min-width:600px)');
	const idAnchor = visible && !!anchorEl ? 'transition-popper' : undefined;

	const handleInputBtnClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setVisible((previousOpen) => !previousOpen);
	};
	const handlePopUpClose = () => setVisible(false);

	const timeFromName = (index: number) =>
		`timetable.${index}.time_from` as '`${string}.${number}.${string}`';

	const timeFromDayName = (index: number) =>
		`timetable.${index}.time_from_day` as '`${string}.${number}.${string}`';

	const timeToName = (index: number) => `timetable.${index}.time_to` as '`${string}.${number}`';

	const setDates = (index: number, newValue: Date) => {
		if (isValid(newValue)) {
			let start: Date | string = getValues(timeFromName(index));
			let end: Date | string = getValues(timeToName(index));
			let startDate;
			let endDate;
			typeof start !== 'string'
				? (startDate = `${format(newValue, 'dd.MM.yyyy')} ${format(start, 'HH:mm')}`)
				: (startDate = `${format(newValue, 'dd.MM.yyyy')} ${format(new Date(), 'HH:mm')}`);
			typeof end !== 'string'
				? (endDate = `${format(newValue, 'dd.MM.yyyy')} ${format(end, 'HH:mm')}`)
				: (endDate = `${format(newValue, 'dd.MM.yyyy')} ${format(new Date(), 'HH:mm')}`);

			setValue(timeFromName(index), parse(startDate, 'dd.MM.yyyy HH:mm', new Date()));
			setValue(timeToName(index), parse(endDate, 'dd.MM.yyyy HH:mm', new Date()));
		}
	};

	const getDate = (value: string, index: number): Date => {
		let startDate: Date = getValues(timeFromDayName(index)) ?? new Date();
		let strDate = `${format(startDate, 'dd.MM.yyyy')} ${normalizeTime(value)}`;
		return isValid(parse(strDate, 'dd.MM.yyyy HH:mm', new Date()))
			? parse(strDate, 'dd.MM.yyyy HH:mm', new Date())
			: new Date();
	};

	const normalizeValue = (value: string) => {
		return checked.hours
			? `${checked.hours}:${checked.minutes}`
			: conformToMask(normalizeTime(value), mask).conformedValue;
	};

	const normalizeTime = (value: Date | string) => {
		return typeof value === 'string'
			? value
			: isValid(value)
			? format(value, 'HH:mm')
			: format(new Date(), 'HH:mm');
	};

	return {
		setDates,
		timeFromName,
		timeFromDayName,
		timeToName,
		visible,
		setVisible,
		checked,
		setChecked,
		getDate,
		matches,
		anchorEl,
		setAnchorEl,
		handleInputBtnClick,
		handlePopUpClose,
		idAnchor,
		normalizeValue,
		normalizeTime,
	};
};

export default useEventEditorTime;
