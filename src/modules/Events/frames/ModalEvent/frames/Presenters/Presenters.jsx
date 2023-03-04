import React from 'react';
import Presenter from './frames/Presenter';

import styles from './Presenters.module.scss';

const Presenters = (props) => {
	return (
		<>
			<div className={styles.title}>{props.coach && props.coach.length > 0 && 'Ведущие'}</div>
			<div className={styles.list}>
				{props.coach &&
					props.coach.map((coach, index) => (
						<div className={styles.item} key={index}>
							<Presenter
								image={coach.photo}
								title={`${coach.first_name} ${coach.second_name} ${coach.last_name}`}
								description={coach.description}
							/>
						</div>
					))}
			</div>
		</>
	);
};

export default Presenters;
