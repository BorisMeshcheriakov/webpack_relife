import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Program } from 'library/models/programs';
import { ProgramEditorValues } from 'library/types/programs';

import { programSchema, programUpdateSchema } from 'library/helpers/programs';

type Props = {
	program: Program | null;
};

const useProgramForm = ({ program }: Props) => {
	const defaultPromo = '/events/emptyImage.png';
	const methods = useForm<ProgramEditorValues>({
		resolver: yupResolver(program ? programUpdateSchema : programSchema),
		defaultValues: {
			periodicity: false,
			promo_image: defaultPromo,
			promo_video: null,
			tags: [],
			description: '',
		},
	});

	React.useEffect(() => {
		if (program) {
			methods.reset({
				title: program.title,
				description: program.description ?? '',
				cost: program.cost / 100,
				cost_coach: program.cost_coach / 100,
				periodicity: program.periodicity,
				promo_image: program.promo_image ? program.promo_image : '',
				promo_video: program.promo_video ? program.promo_video : null,
				// tags: program.tag.map((tag) => tag.pk),
				tags: program.common_tag.map((tag) => tag.id),
			});
		}
	}, [program, methods]);

	// const values = methods.watch();
	// console.log(values);
	// console.log(methods.formState.errors);

	return {
		methods,
	};
};

export default useProgramForm;
