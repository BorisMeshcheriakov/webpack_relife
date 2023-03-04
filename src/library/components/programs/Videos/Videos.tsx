import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { useVideoList, useVideoSelect } from 'library/hooks/programs';

import { Video, ModalVideo, ModalVideoEditor } from 'library/components/programs';

import st from './Videos.module.scss';
import { Blank, Loader } from 'library/components/common';

interface Props {
	mode?: 'view' | 'select';
}

const Videos: React.FC<Props> = ({ mode }) => {
	const { url, path } = useRouteMatch();
	const { push } = useHistory();
	const { videos, hasMore, getVideos, tags, search } = useVideoList();
	const { onSelect, isSelected } = useVideoSelect();

	const handlePlay = (id: number) => {
		push(`${url}/video/${id}`);
	};

	return (
		<div className={st.videos}>
			<InfiniteScroll
				className={st.scroller}
				pageStart={0}
				hasMore={hasMore}
				loadMore={getVideos}
				useWindow={false}
				loader={!videos.length ? <Loader key={0} /> : <React.Fragment key={0} />}
			>
				{videos.map((video) => (
					<Video
						key={video.id}
						video={video}
						onPlay={handlePlay}
						onSelect={onSelect}
						selected={isSelected(video)}
						mode={mode}
						videoType="video"
					/>
				))}

				{!hasMore && !videos.length && (
					<Blank
						text={
							search || tags.length
								? 'По вашему запросу ничего не найдено'
								: 'В этом списке нет видео'
						}
					/>
				)}
			</InfiniteScroll>

			<Switch>
				<Route
					exact
					path={`${path}/:videoType/:videoId`}
					render={() => <ModalVideo close={() => push(url)} showMenu={mode === 'view'} />}
				/>
				<Route
					path={`${path}/:videoType/:videoId/edit`}
					render={() => (
						<ModalVideoEditor
							close={() => push(`${url}`)}
							// showResult={(id: number) => push(`${url}/video/${id}`)}
						/>
					)}
				/>
			</Switch>
		</div>
	);
};

export default Videos;
