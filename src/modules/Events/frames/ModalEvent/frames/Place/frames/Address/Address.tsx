import { FC } from 'react';

import st from './Address.module.scss';

import photo1 from './resources/1.png';
import photo2 from './resources/2.png';
import photo3 from './resources/3.png';

interface Props {
	validAddress: string;
}

const Address: FC<Props> = ({ validAddress }) => {
	return (
		<div className={st.wrapper}>
			<div className={st.title}>{validAddress}</div>
			{/* <div className={styles.photos}>
				{props.address && props.address.image1 && (
					<div className={styles.photo}>
						<img src={props.address.image1} alt="" />
					</div>
				)}
				{props.address && props.address.image2 && (
					<div className={styles.photo}>
						<img src={props.address.image2} alt="" />
					</div>
				)}
				{props.address && props.address.image3 && (
					<div className={styles.photo}>
						<img src={props.address.image3} alt="" />
					</div>
				)}
			</div> */}
		</div>
	);
};

export default Address;
