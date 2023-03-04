import cn from 'classnames';
import SVG from 'react-inlinesvg';

import { literalDuration } from 'library/helpers/common/consultations';

import online from './resources/online.svg';
import offline from './resources/offline.svg';

import st from './index.module.scss';

const ButtonType = ({ type, isActive, handler, duration, price }) => {
	const getText = (type) => {
		switch (type) {
			case 'ON':
				return 'Онлайн';
			case 'OF':
				return 'Личный прием';
			default:
				break;
		}
	};

	const getIcon = (type) => {
		switch (type) {
			case 'ON':
				return online;
			case 'OF':
				return offline;
			default:
				break;
		}
	};

	const getDuration = (duration) => {
		let minutes = parseFloat(duration) * 30;
		return literalDuration(minutes);
	};

	const getPrice = (price) => {
		return `${price ? price / 100 : `----`} ₽`;
	};

	return (
		<button className={cn(st.button, isActive && st.active)} onClick={handler}>
			<div className={st.button__duration}>
				<div className={st.button__wrapper}>
					<SVG className={st.button__icon} alt="" src={getIcon(type)} />
				</div>
				<span className={st.button__time}>{getDuration(duration)}</span>
			</div>
			<span className={st.button__type}>{getText(type)}</span>
			<span className={st.button__price}>{getPrice(price)}</span>
		</button>
	);
};

export default ButtonType;
