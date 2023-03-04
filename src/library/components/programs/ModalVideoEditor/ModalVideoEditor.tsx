import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Controller, FormProvider } from 'react-hook-form';

import { useVideoEditor } from 'library/hooks/programs';

import { Blank, Loader, ModalLarge } from 'library/components/common';
import { Card } from 'library/components/ui';
import { UploadProgress, AddVideo } from 'library/components/programs';
import { TextField } from '@mui/material';
import { Header, Head, Player } from './frames';

import { VideoEditorValues } from 'library/types/programs';
import { useAppDispatch } from 'library/hooks/common';
import { openDialogModal } from 'library/redux/modal';

import st from './ModalVideoEditor.module.scss';

type Props = {
	close: (videoType: string) => void;
	showResult?: (id: number) => void;
};

const ModalVideoEditor: React.FC<Props> = ({ close, showResult }) => {
	const dispatch = useAppDispatch();
	const { videoId, videoType } = useParams<{ videoId: string; videoType: string }>();
	const { onSubmit, videoStatus, videoProgress, uploadStatus, handleClose, methods } =
		useVideoEditor(videoId, videoType, close, showResult);

	const [tab, setTab] = React.useState<'add' | 'description' | 'video'>(
		videoId !== 'new' ? 'video' : 'add'
	);

	const sources: ('B' | 'Y')[] = ['B', 'Y'];

	const onVideoSubmit = (data: VideoEditorValues) => {
		if (!data.description && videoType === 'video') {
			dispatch(
				openDialogModal({
					title: 'Описание',
					text: 'У видео нет описания. Сохранить без него?',
					confirmText: 'Сохранить',
					declineText: 'Добавить описание',
					confirm: () => onSubmit(data),
					decline: () => setTab('description'),
				})
			);
		} else {
			onSubmit(data);
		}
	};

	const onError = (data: any) => {
		if (data?.description) {
			setTab('description');
		}

		if (data?.video) {
			setTab('add');
		}
	};

	return (
		<ModalLarge onRequestClose={handleClose} isOpen disableHeader>
			{videoStatus === 'idle' && uploadStatus === 'idle' && (
				<FormProvider {...methods}>
					<form className={st.video} onSubmit={methods.handleSubmit(onVideoSubmit, onError)}>
						<Header id={videoId} handleClose={handleClose} />

						<Head videoType={videoType} />

						<div className={st.tabs}>
							{videoId !== 'new' && (
								<button
									className={cn(st.tabs__tab, tab === 'video' && st.active)}
									type="button"
									onClick={() => setTab('video')}
								>
									Видео
								</button>
							)}

							<button
								className={cn(st.tabs__tab, tab === 'add' && st.active)}
								type="button"
								onClick={() => setTab('add')}
							>
								Загрузить
							</button>

							{videoType === 'video' && (
								<button
									className={cn(st.tabs__tab, tab === 'description' && st.active)}
									type="button"
									onClick={() => setTab('description')}
								>
									Описание
								</button>
							)}
						</div>

						{tab === 'video' && (
							<Card className={cn(st.tabPanel, st.player)}>
								<Player />
							</Card>
						)}

						{tab === 'add' && (
							<Card className={cn(st.tabPanel, st.video)}>
								<Controller
									name="video"
									control={methods.control}
									render={({ field: { onChange, value }, fieldState: { error } }) => (
										<AddVideo
											videoType={sources}
											value={value}
											onChange={onChange}
											error={error}
											size="large"
											placeholder="Выберите видео"
										/>
									)}
								/>
							</Card>
						)}

						{tab === 'description' && (
							<Card className={st.tabPanel}>
								<div className={st.areaWrapper}>
									<TextField
										{...methods.register('description')}
										variant="standard"
										multiline
										rows={23}
										fullWidth
										error={!!methods.formState.errors?.description}
										helperText={methods.formState.errors.description?.message ?? ' '}
										InputProps={{
											disableUnderline: true,
										}}
										sx={{ overflow: 'auto' }}
									/>
								</div>
							</Card>
						)}
					</form>
				</FormProvider>
			)}
			{videoStatus === 'loading' && <Loader />}
			{videoStatus === 'error' && <Blank text="Видео обрабатывается. Вы можете закрыть окно." />}
			{uploadStatus === 'loading' && (
				<UploadProgress progress={videoProgress} title="Загружаем видео..." />
			)}
		</ModalLarge>
	);
};

export default ModalVideoEditor;
