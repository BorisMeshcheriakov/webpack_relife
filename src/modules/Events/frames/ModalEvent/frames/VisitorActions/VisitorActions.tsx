import { FC } from 'react';
import { useMyTickets } from 'library/hooks/events';
import { ButtonEventEnd, ButtonTickets } from './frames';
import { ButtonBuy } from 'library/components/events';
import { checkEventEnd } from 'library/helpers/events/dateSets';

type Props = {
	availablePlaces: number;
	timeEnd: string;
};

const VisitorActions: FC<Props> = ({ availablePlaces, timeEnd }) => {
	const tickets = useMyTickets();
	return (
		<>
			{!checkEventEnd(timeEnd) ? (
				<>
					<ButtonBuy
						places={availablePlaces}
						totalTickets={tickets.tickets.length}
						handler={tickets.onBuy}
					/>
					{tickets.isAuth && <ButtonTickets quantity={tickets.tickets.length} />}
				</>
			) : (
				<ButtonEventEnd />
			)}
		</>
	);
};

export default VisitorActions;
