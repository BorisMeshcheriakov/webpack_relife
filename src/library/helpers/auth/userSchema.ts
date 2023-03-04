import * as yup from 'yup';

const schema = yup
	.object({
		last_name: yup.string().required('Фамилия не заполнена').nullable(),
		first_name: yup.string().required('Имя не заполнено').nullable(),
		// phonenumber: yup.string().required('Телефон не указан').nullable(),
		gender: yup.string().nullable(),
		birth_date: yup.string().nullable().required('Укажите дату рождения'),
		// email: yup
		// 	.string()
		// 	.required('E-mail не указан')
		// 	.matches(/\S+@\S+\.\S+/, 'E-mail указан неверно')
		// 	.nullable(),
	})
	.required();

export default schema;
