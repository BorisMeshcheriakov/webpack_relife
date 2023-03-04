import { FC } from 'react';
import cn from 'classnames';
import SVG from 'react-inlinesvg';

import { Program, ProgramList } from 'library/models/programs';

import { useProgramPublish } from 'library/hooks/programs';

import st from './ProgramModeration.module.scss';
import { icons } from 'resources/icons/events/EventModeration/index';

type Props = {
	program: Program | ProgramList;
};

const ProgramModeration: FC<Props> = ({ program }) => {
	const { moderation_status = { abbr_status: 'N' }, published } = program;
	const { abbr_status } = moderation_status;
	const { publishDialog, showStatus } = useProgramPublish();

	const settings: {
		[x: string]: {
			text: string;
			style: string;
			action: () => void;
			icon: string;
		};
	} = {
		N: {
			text: 'Модерация',
			style: cn(st.wrapper, st.moderation),
			action: () => showStatus(program),
			icon: icons.moderation,
		},
		D: {
			text: 'Модерация не пройдена',
			style: cn(st.wrapper, st.ban),
			action: () => showStatus(program),
			icon: icons.ban,
		},
		U: {
			text: 'Не опубликовано',
			style: cn(st.wrapper, st.publish),
			action: () => publishDialog(program),
			icon: icons.publish,
		},
	};

	return (
		<>
			{(abbr_status !== 'A' || !published) && (
				<div
					className={settings[published ? abbr_status : 'U'].style}
					onClick={settings[published ? abbr_status : 'U'].action}
				>
					<p>{settings[published ? abbr_status : 'U'].text}</p>
					<p className={st.unpublished}>Опубликовать</p>
					<div className={st.icon__wrapper}>
						<SVG src={settings[published ? abbr_status : 'U'].icon} className={st.icon} />
					</div>
				</div>
			)}
		</>
	);
};

export default ProgramModeration;
