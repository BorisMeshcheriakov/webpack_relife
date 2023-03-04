import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { ProgramVideo } from 'library/models/video';
import { selectProgram } from 'library/redux/programs';

import { useAppDispatch, useAppSelector } from '../common';
import { useUser } from '../user';
import { Program } from 'library/models/programs';
import { openAuthModal, openNotifyModal } from 'library/redux/modal';
import { Mode } from 'library/types/programs';
import useRecommendation from './useRecommendation';

const useVideoClick = () => {
	const dispatch = useAppDispatch();
	const program = useAppSelector(selectProgram);
	const { url } = useRouteMatch();
	const { push } = useHistory();
	const { user, isAuth } = useUser();

	const [mode, setMode] = React.useState<Mode>('video');
	const [source, setSource] = React.useState<'B' | 'Y'>('B');
	const [code, setCode] = React.useState('');
	const [id, setId] = React.useState(0);
	const [youtubeUrl, setYoutubeUrl] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [about, setAbout] = React.useState('О программе');
	const { recommendation } = useRecommendation();

	const changeMode = (mode: Mode) => {
		setMode(mode);
	};

	const onAboutClick = React.useCallback((program: Program) => {
		if (program.promo_video) {
			setCode(program.promo_video?.code);
			setId(program.promo_video.id);
		}
		changeMode('video');
		setSource('B');
		setYoutubeUrl('');
		setDescription(program?.description);
		setAbout('О программе');
	}, []);

	const onVideoClick = (video: ProgramVideo) => {
		if (!program) return;
		if (!isAuth) return dispatch(openAuthModal());

		const isAuthor = program?.author.id === user?.user.id;
		const { is_payed, transaction_status } = program;

		if (isAuthor || is_payed) {
			changeMode('video');
			if (video.video_type === 'B') {
				setSource('B');
				setCode(video.code as string);
				setYoutubeUrl('');
			} else if (video.video_type === 'Y') {
				setSource('Y');
				setYoutubeUrl(video.youtube_url as string);
				setCode('');
			}
			setId(video.id);
			setDescription(video.description);
			setAbout(video.title);
		}

		if (!isAuthor && (!transaction_status || transaction_status === 'f')) {
			return push(`${url}/buy/${program?.pk}`);
		}

		if (!isAuthor && transaction_status === 'n') {
			return dispatch(
				openNotifyModal({
					title: 'Ожидание оплаты',
					text: 'Программа будем доступна через несколько минут. Обновите, пожалуйста, страницу',
					confirmText: 'Ок',
				})
			);
		}
	};

	const onCommentClick = () => {
		changeMode('comment');
		if (recommendation) setDescription(recommendation?.comment);
	};

	React.useEffect(() => {
		if (program && program.promo_video) {
			onAboutClick(program);
		}
	}, [program, onAboutClick]);

	return {
		code,
		onVideoClick,
		onAboutClick,
		onCommentClick,
		mode,
		changeMode,
		source,
		youtubeUrl,
		description,
		about,
		selectedId: id,
	};
};

export default useVideoClick;
