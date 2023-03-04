import * as yup from 'yup';

const schema = yup
	.object({
		last_name: yup.string().required('Фамилия не заполнена'),
		first_name: yup.string().required('Имя не заполнено'),
		middle_name: yup.string().required('Отчество не заполнено'),
		phone: yup.string().required('Телефон не указан'),
		email: yup
			.string()
			.required('E-mail не указан')
			.matches(/\S+@\S+\.\S+/, 'E-mail указан неверно'),
		city: yup.object({
			code: yup.string().required('Город не указан'),
		}),
		pickup_point: yup.object({
			id: yup.number().required('Точка выдачи не указана'),
		}),
	})
	.required();

export default schema;
