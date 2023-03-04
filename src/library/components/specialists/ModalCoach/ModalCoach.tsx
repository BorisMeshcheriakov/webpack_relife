import React from 'react';
import { useParams } from 'react-router-dom';

import { useLoadSpecialist, useSpecialistSession } from 'library/hooks/specialists';

import { Loader, ModalLarge } from 'library/components/common';
import CoachCard from '../CoachCard';

import { Description, Diploma } from './frames';

import st from './ModalCoach.module.scss';

type Props = {
	close: () => void;
};

const ModalCoach: React.FC<Props> = ({ close }) => {
	let { id } = useParams<{ id: string }>();

	const { specialist } = useLoadSpecialist({ id });
	const { schedule, onScheduleClick } = useSpecialistSession();

	return (
		<ModalLarge isOpen={true} title="Специалист" close={close}>
			{specialist ? (
				<section className={st.content}>
					{specialist && (
						<CoachCard
							coach={specialist}
							onScheduleClick={onScheduleClick}
							schedule={schedule}
							inModal
						/>
					)}

					<Description description={specialist?.description} />

					<Diploma diplom={specialist?.diplom} />
				</section>
			) : (
				<Loader />
			)}
		</ModalLarge>
	);
};

export default ModalCoach;
