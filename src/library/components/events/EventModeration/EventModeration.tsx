import { FC } from 'react';
import { icons } from 'resources/icons/events/EventModeration/index';

import SVG from 'react-inlinesvg';

import cn from 'classnames';
import st from './EventModeration.module.scss';

interface Props {
	status: string;
	published: boolean;
	publicate: () => void;
	showModerationStatus: () => void;
	showModerationText: () => void;
}

const EventModeration: FC<Props> = ({
	status,
	published,
	publicate,
	showModerationStatus,
	showModerationText,
}) => {
	return (
		<>
			{!published && (
				<div className={cn(st.wrapper, st.publish)} onClick={publicate}>
					<p>Не опубликовано</p>
					<p className={st.unpublished}>Опубликовать</p>
					<div className={st.icon__wrapper}>
						<SVG src={icons.publish} className={st.icon} />
					</div>
				</div>
			)}

			{published && status == 'N' && (
				<div className={cn(st.wrapper, st.moderation)} onClick={showModerationStatus}>
					<p>Модерация</p>
					<div className={st.icon__wrapper}>
						<SVG src={icons.moderation} className={st.icon} />
					</div>
				</div>
			)}
			{published && status === 'D' && (
				<div className={cn(st.wrapper, st.ban)} onClick={showModerationText}>
					<p>Модерация не пройдена</p>
					<div className={st.icon__wrapper}>
						<SVG src={icons.ban} className={st.icon} />
					</div>
				</div>
			)}
		</>
	);
};

export default EventModeration;
