import { numberWithSeparator } from 'library/helpers/common/strings';
import { FC, memo } from 'react';

import st from './StatisticsAmount.module.scss';
import cn from 'classnames';

interface Props {
	amount: number;
	size: 'large' | 'medium' | 'small';
}

const StatisticsAmount: FC<Props> = ({ amount, size }) => {
	return (
		<div className={cn(st.amount, st[size], amount > 0 ? st.green : st.gray)}>
			{amount > 0 ? `+${numberWithSeparator(amount, ' ')} ₽` : '0 ₽'}
		</div>
	);
};

export default memo(StatisticsAmount);
