import { FC } from 'react';
import { icons } from 'resources/icons/events/EventBuyBtn/index';

import SVG from 'react-inlinesvg';

import cn from 'classnames';
import st from './ButtonBuy.module.scss';

interface Props {
	places: number;
	totalTickets?: number;
	handler?: () => void;
}

const ButtonBuy: FC<Props> = ({ places, totalTickets, handler }) => {
	return (
		<>
			{places <= 0 ? (
				<button className={cn(st.button, st.disabled)} disabled={true}>
					<SVG src={icons.disabled} className={st.icon} />
					<span>Места распроданы</span>
				</button>
			) : (
				<>
					{totalTickets ? (
						<button className={cn(st.button, st.active)} onClick={handler}>
							<SVG src={icons.buy} className={st.icon} />
							<span>Купить еще</span>
						</button>
					) : (
						<></>
					)}

					{!totalTickets ? (
						<button className={cn(st.button, st.active)} onClick={handler}>
							<SVG src={icons.buy} className={st.icon} />
							<span>Купить билет</span>
						</button>
					) : (
						<></>
					)}
				</>
			)}
		</>
	);
};

export default ButtonBuy;
