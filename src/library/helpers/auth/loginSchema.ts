import * as yup from 'yup';

const loginSchema = yup
	.object({
		phonenumber: yup
			.string()
			.required('Телефон не указан')
			.min(6, 'Телефон слишком короткий')
			.nullable(),
		password: yup.string().required('Пароль не указан').min(6, 'Пароль слишком короткий'),
	})
	.required();

export default loginSchema;
