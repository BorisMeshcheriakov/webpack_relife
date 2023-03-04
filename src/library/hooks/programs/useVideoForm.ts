import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { VideoEditorValues } from 'library/types/programs';
import { ProgramVideo, SimplePromoVideo } from 'library/models/video';

import {
	videoSchema,
	videoUpdateSchema,
	videoSchemaNoLibrary,
	videoUpdateSchemaNoLibrary,
	promoSchema,
} from 'library/helpers/programs';
import { useModuleSettings } from '../module';

type Props = {
	video: ProgramVideo | SimplePromoVideo | null;
	videoType: string;
};

const useVideoForm = ({ video, videoType }: Props) => {
	const defaultPromo = '/events/emptyImage.png';
	const { moduleSettings } = useModuleSettings();

	const getSchema = () => {
		let schema: any = videoSchema;
		if (videoType === 'video') {
			if (moduleSettings?.library) {
				if (video) {
					schema = videoUpdateSchema;
				}
			} else {
				if (video) {
					schema = videoUpdateSchemaNoLibrary;
				} else {
					schema = videoSchemaNoLibrary;
				}
			}
		}

		if (videoType === 'promo') {
			schema = promoSchema;
		}

		return schema;
	};
	const methods = useForm<VideoEditorValues>({
		resolver: yupResolver(getSchema()),
		defaultValues: {
			title: '',
			description: '',
			screenshot_url: defaultPromo,
			tags: [],
			video: {
				video_type: 'B',
			},
		},
		reValidateMode: 'onBlur',
	});

	// const values = methods.watch();
	// console.log(values);
	// methods.formState.errors && console.log(methods.formState.errors);

	React.useEffect(() => {
		if (video) {
			methods.reset({
				title: video.title,
				description: 'description' in video ? video.description : '',
				tags: video.common_tag,
				screenshot_url: video.screenshot_url ? video.screenshot_url : ({} as FileList),
				video: {
					video_type: video.video_type,
					url: String(video.youtube_url),
					code: video.code,
				},
			});
		}
	}, [video, methods]);

	return {
		methods,
	};
};

export default useVideoForm;
