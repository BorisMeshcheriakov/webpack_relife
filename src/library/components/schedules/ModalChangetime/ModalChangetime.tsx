import React from 'react';
import cn from 'classnames';

import { useMoveSpecialist } from 'library/hooks/schedules';

import { ModalLarge } from 'library/components/common';
import Week from '../Week';
import { Date, Navigation } from 'library/components/schedules';
import { Nav, Head, Summary, Coach } from './frames';

import st from './ModalChangetime.module.scss';
import { useModulePermissions } from 'library/hooks/module';

type Props = {
	close: () => void;
};

const ModalChangetime: React.FC<Props> = ({ close }) => {
	const { can_sell } = useModulePermissions();
	const { step, schedule, consultation, chooseSchedule, moveConsultation } = useMoveSpecialist();

	return (
		<ModalLarge isOpen disableHeader>
			<Head move={moveConsultation} close={close} step={step} />
			<div className={st.wrap}>
				{step === 0 &&
					(can_sell ? (
						<>
							<Nav />
							<section className={st.toolbar}>
								<div className={st.toolbar__item}>
									<Date calendar="consultations" />
								</div>
								<div className={cn(st.toolbar__item, st.content_center)}></div>
								<div className={cn(st.toolbar__item, st.content_end)}>
									<Navigation calendar="consultations" />
								</div>
							</section>
							<Week calendar="consultations" onClick={chooseSchedule} />
						</>
					) : (
						<Coach onClick={chooseSchedule} />
					))}

				{step === 1 && <Summary schedule={schedule} consultation={consultation} close={close} />}
			</div>
		</ModalLarge>
	);
};

export default ModalChangetime;
