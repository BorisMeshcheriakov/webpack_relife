import { formatDuration, intervalToDuration } from 'date-fns';
import ru from 'date-fns/locale/ru';

const verboseDuration = (duration: number = 0) => {
	return formatDuration(intervalToDuration({ start: 0, end: duration * 30 * 60 * 1000 }), {
		format: ['hours', 'minutes'],
		locale: ru,
	});
};

export default verboseDuration;
