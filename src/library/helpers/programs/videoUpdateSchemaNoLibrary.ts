import * as yup from 'yup';

const schema = yup.object().shape({
	title: yup.string().required('Укажите название видеоролика').min(3, 'Слишком короткое название'),
});

export default schema;
