import React from 'react';
import cn from 'classnames';

import { FieldError } from 'react-hook-form';

import { ArrowDownward, Close } from '@mui/icons-material';
import { ModalVideolink, ModalType } from './frames';

import st from './AddVideo.module.scss';

const sources = {
	Y: { title: 'YouTube', type: 'url' },
	B: { title: 'Компьютер', type: 'file' },
};

interface Props {
	videoType: ('Y' | 'B')[];
	value: {
		file: FileList | null;
		url: string;
		video_type: 'Y' | 'B';
	};
	onChange: (...event: any[]) => void;
	error?: FieldError;
	size: 'small' | 'large';
	placeholder?: string;
}

const AddVideo: React.FC<Props> = ({
	videoType,
	value,
	onChange,
	error,
	size,
	placeholder = '',
}) => {
	const fileRef = React.useRef<null | HTMLInputElement>(null);

	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
	const [isTypeModalOpen, setIsTypeModalOpen] = React.useState<boolean>(false);

	const isVideoSelected = () =>
		(value.video_type === 'Y' && value.url) || (value.video_type === 'B' && value.file);

	const onTypeSelect = (type: 'B' | 'Y') => {
		onChange({ ...value, video_type: type });
		if (sources[type].type === 'file' && fileRef.current) fileRef.current.click();

		if (sources[type].type === 'url') setIsModalOpen(true);
	};

	const openDialog = () => {
		if (videoType.length > 1) {
			setIsTypeModalOpen(true);
		} else {
			onTypeSelect(videoType[0]);
		}
	};

	const removeSelected = () => {
		// очищаем выбранные значения
		onChange({ ...value, url: '', file: null, video_type: 'B' });
		if (fileRef.current) fileRef.current.value = '';
	};

	const onUploadClick = () => (isVideoSelected() ? removeSelected() : openDialog());

	const onFileChange = (fileList: FileList | null) =>
		onChange({ ...value, file: fileList, url: '' });

	const onUrlChange = (url: string) => onChange({ ...value, url: url, file: null });

	const getTitle = (value: { video_type: 'Y' | 'B'; file: FileList | null; url: string }) => {
		// получаем название файла/url
		let title = '';

		switch (sources[value.video_type].type) {
			case 'url':
				title = value.url;
				break;
			case 'file':
				title = value.file && value.file.length > 0 ? value.file.item(0)?.name ?? '' : placeholder;
				break;
			default:
				break;
		}
		return title;
	};

	return (
		<>
			<div className={cn(st.video, error && st.error)} onClick={onUploadClick}>
				<div className={st.video__label}>
					<input
						ref={fileRef}
						onChange={(e) => onFileChange(e.target.files)}
						className={st.video__input}
						type="file"
						accept="video/*, .mp4"
					/>

					{isVideoSelected() && (
						<h3 className={cn(st.video__title, size === 'large' && st.large)}>
							Загружаемое видео:
						</h3>
					)}
					<h3 className={cn(st.video__title, size === 'large' && st.large)}>{getTitle(value)}</h3>
					<div className={cn(st.video__icon, size === 'large' && st.large)}>
						{isVideoSelected() ? <Close fontSize={size} /> : <ArrowDownward fontSize={size} />}
					</div>
				</div>
			</div>

			{/* Модальное окно вставки url */}
			<ModalVideolink
				isOpen={isModalOpen}
				close={() => setIsModalOpen(false)}
				videoSource={sources[value.video_type].title}
				saveUrl={onUrlChange}
			/>

			{/* Модальное окно выбора источника */}
			<ModalType
				isOpen={isTypeModalOpen}
				close={() => setIsTypeModalOpen(false)}
				videoType={videoType}
				onSelect={onTypeSelect}
				sources={sources}
			/>
		</>
	);
};

export default AddVideo;
