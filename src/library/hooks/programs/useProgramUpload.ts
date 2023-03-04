import React from 'react';
import { programsService } from 'library/api/programsService';
import { ProgramEditorValues } from 'library/types/programs';

import { useAppSelector } from 'library/hooks/common';

import { selectProgramVideos, selectExcludedVideos } from 'library/redux/programs';

const useProgramUpload = (id: string) => {
	const exercises = useAppSelector(selectProgramVideos);
	const excluded = useAppSelector(selectExcludedVideos);

	const [progress, setProgress] = React.useState<number>(0);
	const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'loading'>('idle');

	const config = {
		onUploadProgress: (progressEvent: any) => {
			let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			setProgress(percentCompleted);
		},
	};

	const createFormData = (data: ProgramEditorValues, module?: string) => {
		const program = new FormData();
		program.append('title', data.title);
		program.append('description', data.description);
		program.append('cost', (data.cost * 100).toString());
		program.append('cost_coach', (data.cost_coach * 100).toString());
		program.append('periodicity', JSON.stringify(data.periodicity));
		data.tags.forEach((tag) => program.append('common_tag', JSON.stringify(tag)));

		if (data.promo_image instanceof FileList && data.promo_image?.item(0)) {
			program.append('promo_image', data.promo_image.item(0)!);
		}

		if (data.promo_video) {
			program.append('promo_video', String(data.promo_video.id));
		}

		if (data.periodicity) {
			program.append('excluded_videos_period', JSON.stringify(excluded));
		}
		exercises.map((exercise) => program.append('videos', JSON.stringify(exercise.id)));
		return program;
	};

	const createProgram = async (data: ProgramEditorValues, module?: string) => {
		setUploadStatus('loading');
		const program = createFormData(data, module);
		const response = await programsService.createProgram(program, config);
		setUploadStatus('idle');
		return response;
	};

	const updateProgram = async (data: ProgramEditorValues) => {
		setUploadStatus('loading');
		const program = createFormData(data);
		const response = await programsService.updateProgram(id, program, config);
		setUploadStatus('idle');
		return response;
	};

	return {
		createProgram,
		updateProgram,
		uploadStatus,
		progress,
	};
};

export default useProgramUpload;
