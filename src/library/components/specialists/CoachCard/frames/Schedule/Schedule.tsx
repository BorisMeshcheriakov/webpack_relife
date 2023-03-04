import React from 'react';
import { CoachAvailablePeriods } from 'library/models/schedules';

import { useSchedule } from './hooks';

import Sessions from './frames/Sessions';
import Preloader from './frames/Preloader';

import { ButtonCalendar, CalendarToolbar, Datepicker } from './frames';

import st from './Schedule.module.scss';

type Props = {
	coach: any;
	mode: any;
	onScheduleClick: any;
};

const Schedule: React.FC<Props> = ({ coach, mode, onScheduleClick }) => {
	const { isLoading, start, setStart, selected, setSelected, cardRef, sessions, now } = useSchedule(
		{
			id: coach.id,
		}
	);

	const [showCalendar, setShowCalendar] = React.useState(true);

	const onSessionClick = (session: CoachAvailablePeriods) => onScheduleClick(session);

	return (
		<div className={st.schedule} ref={cardRef}>
			<section className={st.buttons}>
				<CalendarToolbar
					start={start}
					selected={selected}
					setStart={setStart}
					setSelected={setSelected}
					showCalendar={showCalendar}
				/>

				<ButtonCalendar handler={() => setShowCalendar(!showCalendar)} isActive={!showCalendar} />
			</section>
			{!isLoading ? (
				<section className={st.workspace}>
					{showCalendar ? (
						<Datepicker
							start={start}
							setStart={setStart}
							setSelected={setSelected}
							setShowCalendar={setShowCalendar}
							sessions={sessions}
							mode={mode}
							now={now}
						/>
					) : (
						<>
							<Sessions
								sessions={sessions}
								selected={selected}
								mode={mode}
								onSessionClick={onSessionClick}
							/>
						</>
					)}
				</section>
			) : (
				<Preloader />
			)}
		</div>
	);
};

export default Schedule;
