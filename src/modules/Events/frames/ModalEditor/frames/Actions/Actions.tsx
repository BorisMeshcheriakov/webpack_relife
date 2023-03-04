import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useDelete } from 'library/hooks/events';
import { icons } from 'resources/icons/events/EventEditor/index';
import SVG from 'react-inlinesvg';

import st from './Actions.module.scss';

const Actions: FC = () => {
	const { id } = useParams<{ id: string }>();
	const { deleteEvent } = useDelete(id);

	return (
		<>
			{id && (
				<fieldset className={st.wrapper}>
					<SVG src={icons.deleteBtn} />
					<button className={st.btn} type="button" onClick={() => deleteEvent(id)}>
						Удалить мероприятие
					</button>
				</fieldset>
			)}
		</>
	);
};

export default Actions;
