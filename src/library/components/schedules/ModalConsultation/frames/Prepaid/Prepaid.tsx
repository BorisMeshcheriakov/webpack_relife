import React from 'react';

// import { useAppSelector } from 'library/hooks/common';
import { useUser } from 'library/hooks/user';
// import { selectActiveConsultation } from 'library/redux/schedules';

import { ModalPrepaid } from './frames';

import st from './Prepaid.module.scss';

const Prepaid: React.FC = () => {
	const { user } = useUser();
	// const consultation = useAppSelector(selectActiveConsultation);

	const [isPrepaidOpen, setIsPrepaidOpen] = React.useState(false);

	const toggleModalPrepaid = () => setIsPrepaidOpen((p) => !p);

	return (
		<>
			{user?.is_coach && (
				<div className={st.row}>
					<div className={st.row__label}>Внесено</div>
					<div className={st.row__value}>200 Р.</div>
					<button className={st.row__add} onClick={toggleModalPrepaid}>
						Внести
					</button>
				</div>
			)}

			{isPrepaidOpen && <ModalPrepaid toggle={toggleModalPrepaid} />}
		</>
	);
};

export default Prepaid;
