import * as yup from 'yup';

const schema = yup.object().shape({
	title: yup
		.string()
		.required('Укажите название видеопрограммы')
		.min(3, 'Слишком короткое название'),
	// description: yup
	// 	.string()
	// 	.required('Укажите описание видеопрограммы')
	// 	.min(3, 'Слишком короткое описание'),
	cost: yup.number().required('Укажите стоимость видеопрограммы для покупателя'),
	cost_coach: yup.number().required('Укажите стоимость видеопрограммы для продавца'),
	tags: yup.array().min(1, 'Нужно выбрать хотя бы один тег'),
});

export default schema;
