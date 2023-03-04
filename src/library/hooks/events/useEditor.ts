import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useParams } from 'react-router-dom';

import { eventService } from 'library/api/eventService';

import { useEvent, useTags } from 'library/hooks/events';
import { useEventVideo } from 'library/hooks/events';

import { FormEditor } from 'library/types/events';

import {
	schema,
	defaultEditorValues,
	resetEditor,
	normalizeEvent,
	normalizeTags,
} from 'library/helpers/events';
import { openDialogModal } from 'library/redux/modal';
import { useAppDispatch } from '../common';
import { addEventToList, changeEvent } from 'library/redux/events';
import { SimplePromoVideo } from 'library/models/video';
import usePublicate from './usePublicate';
import useWindowDimensions from '../common/useWindowDimensions';

const useEditor = () => {
	const { id } = useParams<{ id: string; tab: string }>();
	const { push } = useHistory();
	const dispatch = useAppDispatch();
	const event = useEvent();
	const video = useEventVideo();
	const { tags } = useTags();
	const { sendEvent } = usePublicate();
	const [editorStatus, setEditorStatus] = React.useState<string>('idle');
	const { width } = useWindowDimensions();
	const showCloseBtn = width <= 1024;

	const methods = useForm<FormEditor>({
		resolver: yupResolver(schema),
		defaultValues: { ...defaultEditorValues },
		reValidateMode: 'onBlur',
	});
	const mode = methods.watch('mode');

	const onClose = () => {
		push('/events');
	};

	const editFild = (index: number): boolean => {
		if (event.event?.timetable !== undefined && !!id) {
			return index < event.event?.timetable.length;
		} else return false;
	};

	const publish = (id: number) => {
		const published = true;
		sendEvent(id, published).then(() => {
			push(`/events/${id}`);
		});
	};

	const unpublish = (id: number) => {
		const published = false;
		sendEvent(id, published).then(() => {
			push(`/events/${id}`);
		});
	};

	const onSubmit = async (data: FormEditor) => {
		setEditorStatus('loading');
		let eventVideo: SimplePromoVideo | undefined;

		let videoFile = data.presentation_video as FileList;
		if (videoFile.item(0)) {
			const response = await video.createVideo(videoFile.item(0) as File);
			eventVideo = response?.data;
		}

		let event = await normalizeEvent(data);
		let eventTags = data.tag ? normalizeTags(tags, data.tag as number[]) : [];
		// console.log(event);
		event = { ...event, presentation_video: eventVideo?.id as number, tag: [...eventTags] };

		try {
			let response: Event | any;
			if (id) {
				response = await eventService.updateEvent(id, event);
				dispatch(changeEvent(response.data));
			} else {
				response = await eventService.createEvent(event);
				dispatch(addEventToList(response.data));
			}
			if (!response.data) {
				throw response;
			}

			dispatch(
				openDialogModal({
					title: 'Публикация',
					text: 'Мероприятие успешно сохранено. Опубликовать?',
					confirmText: 'Да',
					confirm: () => publish(id ? id : response.data.id),
					declineText: 'Нет',
					decline: () => unpublish(id ? id : response.data.id),
					link: {
						url: '',
						text: 'Подробнее о публикации',
					},
				})
			);
		} catch (error) {
			// console.log(error);
		}
		setEditorStatus('loaded');
	};

	React.useEffect(() => {
		if (id && event.status === 'loaded' && event.event) {
			methods.reset(resetEditor(event.event));
		}
	}, [id, event.status, methods, event.event]);

	return {
		methods,
		onSubmit,
		event,
		video,
		editorStatus,
		editFild,
		mode,
		showCloseBtn,
		onClose,
	};
};

export default useEditor;
