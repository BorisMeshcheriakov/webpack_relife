import * as yup from 'yup';

const schema = yup.object().shape({
	title: yup.string().required('Укажите название видеоролика').min(3, 'Слишком короткое название'),
	// description: yup
	// 	.string()
	// 	.required('Укажите описание видеоролика')
	// 	.min(3, 'Слишком короткое описание'),
	tags: yup.array().min(1, 'Нужно выбрать хотя бы один тег'),
});

export default schema;
