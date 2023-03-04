import { ModalVideo, ModalVideoEditor } from 'library/components/programs';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { useModuleSettings } from 'library/hooks/module';
import { ExerciseVideoDetail } from 'library/models/video';
import { selectProgramVideos, setProgramVideoList } from 'library/redux/programs';
import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import ModalVideoSelect from '../ModalVideoSelect';
import { useFormContext } from 'react-hook-form';

const Routes: React.FC = () => {
	const dispatch = useAppDispatch();
	const videos = useAppSelector(selectProgramVideos);
	const { setValue } = useFormContext();

	const { url, path } = useRouteMatch();
	const { push } = useHistory();
	const { moduleSettings } = useModuleSettings();

	const onVideoEditorClose = (videoType: string, video?: ExerciseVideoDetail) => {
		if (moduleSettings?.library) {
			push(url);
		} else {
			if (video && videoType === 'video') {
				let newVideo = {
					id: video?.pk,
					screenshot_url: video?.screenshot_url,
					title: video?.title,
				};
				let programVideos = [...videos];
				let idx = programVideos.findIndex((video) => video.id === newVideo.id);
				if (idx === -1) {
					programVideos.push(newVideo as any);
				} else {
					let updatedVideo = { ...programVideos[idx], ...newVideo };
					programVideos[idx] = { ...updatedVideo };
				}

				dispatch(setProgramVideoList(programVideos));
			}
		}

		if (video && videoType === 'promo') {
			setValue('promo_video', video);
		}
		push(url);
	};

	return (
		<Switch>
			<Route path={`${path}/videos/:mode`}>
				<ModalVideoSelect close={() => push(url)} />
			</Route>

			<Route exact path={`${path}/:videoType/:videoId`}>
				<ModalVideo close={() => push(url)} showMenu={!moduleSettings?.library} />
			</Route>
			<Route path={`${path}/:videoType/:videoId/edit`}>
				<ModalVideoEditor close={onVideoEditorClose} />
			</Route>
		</Switch>
	);
};

export default Routes;
