import { FC, memo } from 'react';
import { currentDiscount } from 'library/helpers/events/discount';
import { Discount } from 'library/models/events';
import { useFormContext } from 'react-hook-form';

import st from './Summary.module.scss';

type Props = {
	tickets: number;
	cost: number;
	prepayment: number;
	discounts: Discount[];
};

const Summary: FC<Props> = ({ cost, discounts, prepayment }) => {
	const { getValues } = useFormContext();
	const newTicket = getValues('ticket');
	const discount = currentDiscount(discounts);

	const getFinalyCost = () => {
		if (prepayment > 0) {
			return prepayment;
		}
		if (discount) {
			return discount?.discount_cost;
		} else return cost;
	};

	return (
		<div className={st.summary}>
			<div className={st.row}>
				<span>Билеты:</span>
				<span>{`${newTicket.length} шт.`}</span>
			</div>

			{/* Логика отображение итоговой Стоимости 1 билета :
      Если есть предоплата, то сумма предоплаты, не важно есть ли скидки и тд,
      если есть скидка, то сумма скидки. Когда дата скидки пройдёт, тогда полная стоимость */}

			{prepayment > 0 ? (
				<>
					<div className={st.row}>
						<span>Предоплата:</span>
						<span>{`${prepayment} ₽`}</span>
					</div>
				</>
			) : (
				<>
					<div className={st.row}>
						<span>Стоимость:</span>
						<span>{`${cost} ₽`}</span>
					</div>

					{discount && (
						<>
							<div className={st.row}>
								<span>Скидка:</span>
								<span>{`${cost - discount?.discount_cost} ₽`}</span>
							</div>
						</>
					)}
				</>
			)}

			<div className={st.row}>
				<span>Итого:</span>
				<span>{`${getFinalyCost() * newTicket.length} ₽`}</span>
			</div>
		</div>
	);
};

export default memo(Summary);
