import * as yup from 'yup';

const schema = yup.object().shape({
	address: yup.object().shape({
		city: yup.string().required('Укажите город').typeError('Укажите город'),
		street: yup.string().required('Укажите улицу').typeError('Укажите улицу'),
		house: yup.string().required('Укажите номер дома').typeError('Укажите номер дома'),
		apartment: yup
			.string()
			.required('Укажите номер квартиры/офиса')
			.typeError('Укажите номер квартиры/офиса'),
		phone: yup.string().required('Телефон не указан').min(6, 'Телефон слишком короткий').nullable(),
	}),
});

export default schema;
