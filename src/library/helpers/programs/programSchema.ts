import * as yup from 'yup';

const schema = yup.object().shape({
	title: yup
		.string()
		.required('Укажите название видеопрограммы')
		.min(3, 'Слишком короткое название'),
	// description: yup
	// 	.string()
	// 	.min(3, 'Слишком короткое описание'),
	cost: yup.number().required('Укажите стоимость видеопрограммы для покупателя'),
	// cost_coach: yup.number().required('Укажите стоимость видеопрограммы для продавца'),
	promo_image: yup.mixed().test({
		name: 'validate promo image',
		test: (value, ctx) => {
			if (
				!value ||
				(typeof value === 'string' && !value.length) ||
				(value instanceof FileList && !value.length)
			) {
				return ctx.createError({
					message: `Не добавлено изображение программы`,
					path: `promo_image`,
				});
			}
			return true;
		},
	}),
	promo_video: yup
		.mixed()
		.required('Добавьте промо-видео')
		.test({
			name: 'validate promo video',
			test: (value, ctx) => {
				if (!value && value instanceof FileList && !value.length) {
					return ctx.createError({
						message: `Не добавлено промо-видео`,
						path: `promo_video`,
					});
				}
				return true;
			},
		}),
	tags: yup.array().min(1, 'Нужно выбрать хотя бы один тег'),
});

export default schema;
