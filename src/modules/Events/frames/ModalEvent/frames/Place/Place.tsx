import { FC } from 'react';
import { Button } from '@mui/material';
import { EventAddress } from 'library/models/events';
import { Address, Way } from './frames';
import { useEventAdress } from 'library/hooks/events';

import map from './resources/map.png';
import st from './Place.module.scss';

interface Props {
	address: EventAddress;
}

const Place: FC<Props> = ({ address }) => {
	const { validAddress } = useEventAdress(address);

	return (
		<div className={st.wrapper}>
			<div className={st.title}>Место проведения</div>
			<div className={st.content}>
				<section className={st.content__address}>
					<Address validAddress={validAddress} />
					<Way address={address} />
				</section>
				<section className={st.content__map}>
					<a
						href={`https://yandex.ru/maps/?text=${address.city}, ${address.street}, ${address.house}`}
						target="_blank"
					>
						<Button
							sx={{
								padding: `0 !important`,
								fontSize: '18px',
								lineHeight: '24px',
								marginBottom: '5px',
							}}
						>
							Посмотреть на карте
						</Button>
						<div className={st.img}>
							<img src={map} alt="link To Map" />
						</div>
					</a>
				</section>
			</div>
		</div>
	);
};

export default Place;
