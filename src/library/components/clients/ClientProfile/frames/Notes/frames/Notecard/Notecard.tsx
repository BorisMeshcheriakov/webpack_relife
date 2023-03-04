import React from 'react';
import { format } from 'date-fns';

import st from './Notecard.module.scss';

const Notecard: React.FC = () => {
	return (
		<div className={st.card}>
			<section className={st.card__date}>
				<p>{format(new Date(), 'dd.MM.yyyy')}</p>
			</section>
			<section className={st.card__text}>
				<p>
					Aenean cursus in felis ultrices tristique. Integer feugiat, tellus at ultricies malesuada,
					enim diam interdum ligula, vel elementum erat sapien a nisl. Sed imperdiet magna ut
					euismod faucibus. Duis sit amet interdum augue. Fusce a tortor aliquam, suscipit purus a,
					posuere tortor. Fusce luctus, sapien non bibendum finibus, mauris nibh pellentesque nulla,
					id pellentesque odio lacus et velit. Phasellus bibendum gravida quam ac ultricies.
					Vestibulum gravida cursus nisi a rhoncus. Nulla convallis augue sed augue pellentesque
					viverra. Curabitur tincidunt neque efficitur nunc dictum dapibus.
				</p>
			</section>
			<section className={st.card__menu}></section>
		</div>
	);
};

export default Notecard;
