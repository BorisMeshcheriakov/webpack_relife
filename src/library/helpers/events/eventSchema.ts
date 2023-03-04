import { compareDesc, startOfDay } from 'date-fns';
import * as yup from 'yup';

const title = yup
	.string()
	.required('Укажите название мероприятия')
	.min(3, 'Слишком короткое название');

const description = yup
	.string()
	.required('Укажите описание мероприятия')
	.min(3, 'Слишком короткое описание');

const date = yup.object().shape({
	time_from: yup.date().required('Укажите время начала').typeError('Укажите время начала'),
	time_from_day: yup.date().required('Укажите время начала').typeError('Укажите время начала'),
	time_to: yup
		.date()
		.required('Укажите время окончания')
		.typeError('Укажите время окончания')
		.min(yup.ref('time_from'), 'Окончание раньше начала'),
});

const timetable = yup
	.array()
	.of(date)
	.test({
		name: 'validate day start',
		test: (value, ctx) => {
			if (value && value.length > 1) {
				const days = [...value];
				for (let i = 0; i < days.length; i++) {
					if (i > 0 && days[i].time_from && days[i - 1].time_to) {
						const startTime = days[i].time_from!;
						const prevEndTime = days[i - 1].time_to!;

						if (compareDesc(startTime, prevEndTime) !== -1) {
							return ctx.createError({
								message: `Время этапов не может пересекаться`,
								path: `timetable[${i}].time_from_day`, // Fieldname
							});
						}
					}
				}
			}

			return true;
		},
	});

const cost = yup
	.number()
	.required('Укажите стоимость мероприятия')
	.typeError('Укажите стоимость мероприятия')
	.min(1, 'Слишком низкая цена')
	.nullable(true);

const places = yup
	.number()
	.required('Укажите количество участников')
	.typeError('Укажите количество участников')
	.min(1, 'Слишком мало участников')
	.nullable(true);

const discount = yup.object().shape({
	discount_cost: yup
		.number()
		.required('Укажите сумму скидки')
		.typeError('Укажите сумму скидки')
		.min(1, 'Слишком маленькая сумма скидки')
		.nullable(true),
	discount_from: yup
		.date()
		.required('Укажите начало скидки')
		.typeError('Укажите начало скидки')
		.max(yup.ref('discount_to'), 'Окончание позже начала'),
	discount_to: yup
		.date()
		.required('Укажите окончание скидки')
		.typeError('Укажите окончание скидки')
		.min(yup.ref('discount_from'), 'Окончание позже начала'),
});

const discoutArray = yup
	.array()
	.of(discount)
	.test({
		name: 'validate discount cost',
		test: (value, ctx) => {
			if (value) {
				const cost = ctx.resolve(yup.ref<number>('cost'));
				const discounts = [...value];
				for (let i = 0; i < discounts.length; i++) {
					if (discounts[i].discount_cost && discounts[i].discount_cost! >= cost) {
						return ctx.createError({
							message: `Скидка не может быть выше стоимости`,
							path: `discount[${i}].discount_cost`, // Fieldname
						});
					}
				}
			}

			return true;
		},
	})
	.test({
		name: 'validate discount end',
		test: (value, ctx) => {
			if (value) {
				const start = ctx.resolve(yup.ref<Date>('timetable.0.time_from_day'));
				const discounts = [...value];

				for (let i = 0; i < discounts.length; i++) {
					if (discounts[i].discount_to && compareDesc(discounts[i].discount_to!, start) === -1) {
						return ctx.createError({
							message: `Скидка позже начала мероприятия`,
							path: `discount[${i}].discount_to`, // Fieldname
						});
					}
				}
			}

			return true;
		},
	})
	.test({
		name: 'validate discount dates between each other',
		test: (value, ctx) => {
			if (value && value.length > 1) {
				const discounts = [...value];
				for (let i = 0; i < discounts.length; i++) {
					if (
						i > 0 &&
						discounts[i] &&
						discounts[i].discount_from &&
						discounts[i - 1] &&
						discounts[i - 1]?.discount_to
					) {
						const start = startOfDay(discounts[i].discount_from!);
						const prevEnd = startOfDay(discounts[i - 1].discount_to!);
						if (compareDesc(start, prevEnd) !== -1) {
							return ctx.createError({
								message: `Даты скидок не могут пересекаться`,
								path: `discount[${i}].discount_from`, // Fieldname
							});
						}
					}
				}
			}
			return true;
		},
	});

const coach = yup.object().shape({
	first_name: yup.string().required('Укажите имя ведущего'),
	last_name: yup.string().required('Укажите фамилию ведущего'),
	description: yup.string().required('Заполните описание'),
});

const coachArray = yup.array().of(coach);

const block = yup.object().shape({
	title: yup.string().required('Укажите название блока'),
});

const blockArray = yup.array().of(block);

const address = yup
	.object()
	.when('mode', {
		is: 'O',
		then: yup.object().shape({
			country: yup.string().required('Укажите страну').typeError('Укажите страну'),
			city: yup.string().required('Укажите город').typeError('Укажите город'),
			street: yup.string().required('Укажите улицу').typeError('Укажите улицу'),
			house: yup.string().required('Укажите номер дома').typeError('Укажите номер дома'),
		}),
	})
	.nullable(true);

const phone = yup
	.string()
	.required('Телефон не указан')
	.min(6, 'Телефон слишком короткий')
	.nullable();

const prepayment_cost = yup
	.number()
	.transform((value) => (isNaN(value) || value === null || value === undefined ? 0 : value))
	.nullable(true)
	.max(yup.ref('cost'), 'Предоплата не может быть выше стоимости')
	.typeError('Укажите предоплату');

const event_type = yup
	.string()
	.required('Укажите тип мероприятия')
	.typeError('Укажите тип мероприятия');

const mode = yup
	.string()
	.required('Укажите режим мероприятия')
	.typeError('Укажите режим мероприятия');

const schema = yup.object().shape({
	title: title,
	description: description,
	timetable: timetable,
	cost: cost,
	places: places,
	discount: discoutArray,
	event_coach: coachArray,
	event_block: blockArray,
	address: address,
	phone: phone,
	prepayment_cost: prepayment_cost,
	event_type: event_type,
	mode: mode,
});

export default schema;
