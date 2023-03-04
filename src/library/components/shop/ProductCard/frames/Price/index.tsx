import cn from 'classnames';
import { numberWithSeparator } from 'library/helpers/common/strings';

import styles from './index.module.scss';

interface Props {
	price: number;
	partnerPrice: number | null;
}

const Price = ({ price, partnerPrice }: Props) => (
	<div className={styles.container}>
		<div className={cn(styles.price, partnerPrice && partnerPrice > 0 && styles.withPartner)}>
			{`${numberWithSeparator(price / 100)} ₽`}
			{partnerPrice && <span> - розничная цена</span>}
		</div>
		{partnerPrice && (
			<div className={styles.partnerPrice}>{`${numberWithSeparator(partnerPrice / 100)} ₽`} - партнерская цена</div>
		)}
	</div>
);

export default Price;
