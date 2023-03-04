import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

import { Card } from 'library/components/ui';
import { Program } from 'library/models/programs';
import { Mode, SourceType } from 'library/types/programs';

import { YoutubePlayer, BoomstreamPlayer } from 'library/components/programs';

import { ChooseDay, Comment, Text, ModalDescription } from './frames';

import st from './Main.module.scss';

type Props = {
	mode: Mode;
	source: SourceType;
	code: string;
	youtubeUrl: string;
	program: Program;
	selectedDay: number;
	onDaySelect: (day: number) => void;
	description: string;
	about: string;
};

const Main: React.FC<Props> = ({
	mode,
	source,
	code,
	youtubeUrl,
	program,
	selectedDay,
	onDaySelect,
	description,
	about,
}) => {
	const periodicityDescription =
		'Для данной программы включена 7-ми дневная периодичность. В разные дни вам предложено выполнять разные упражнения. Если вы по какой-либо причине пропустили день, вы можете вернуться к нему и выполнить упражнения назначенные на прошедший день. ';

	const { url, path } = useRouteMatch();
	const { push } = useHistory();

	return (
		<div className={st.main}>
			<div className={st.main__player} id="video-anchor">
				<Card className={st.main__wrapper}>
					{mode === 'video' && source === 'B' && <BoomstreamPlayer code={code} />}
					{mode === 'video' && source === 'Y' && <YoutubePlayer url={youtubeUrl} />}
					{mode === 'days' && <ChooseDay selectedDay={selectedDay} onSelect={onDaySelect} />}
					{mode === 'comment' && <Comment />}
				</Card>
			</div>
			<div className={st.main__description}>
				<div className={st.main__head}>
					{mode === 'comment' && <h2>Комментарий специалиста</h2>}

					{mode === 'video' && <h2>{about}</h2>}

					{mode === 'days' && <h2>Выбор дня занятий</h2>}
				</div>

				{mode !== 'days' && <Text desсription={description} />}

				{mode === 'days' && <section className={st.main__text}>{periodicityDescription}</section>}
			</div>
			<Route
				path={`${path}/description`}
				render={() => (
					<ModalDescription mode={mode} description={description} close={() => push(`${url}`)} />
				)}
			/>
		</div>
	);
};

export default Main;
