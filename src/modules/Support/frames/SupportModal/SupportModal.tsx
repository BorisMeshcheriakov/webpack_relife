import React from 'react';
import SVG from 'react-inlinesvg';
import ModalLarge from 'library/components/common/modals/ModalLarge';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';
import { openNotifyModal, closeSupportModal } from 'library/redux/modal';

import { feedbacksService } from 'library/api/feedbacksService';

import { Button } from 'library/components/common';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './SupportModal.module.scss';

import phoneIcon from 'resources/icons/phone.svg';

type Props = {};

interface Form {
	subject: string;
	comment: string;
}

const schema = yup
	.object({
		subject: yup
			.string()
			.required('Это поле необходимо заполнить')
			.min(3, 'Сообщение слишком короткое'),
		comment: yup
			.string()
			.required('Это поле необходимо заполнить')
			.min(3, 'Сообщение слишком короткое'),
	})
	.required();

const SupportModal: React.FC<Props> = (props) => {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Form>({ resolver: yupResolver(schema) });

	const onSubmit = async (data: Form) => {
		try {
			const response = await feedbacksService.sendFeedback({
				subject: data.subject,
				comment: data.comment,
			});
			if (!response.data) {
				throw response;
			}
			reset();
			dispatch(
				openNotifyModal({
					title: '',
					text: 'Спасибо за Ваше обращение, мы свяжемся с Вами в ближайшее время',
					confirmText: 'Ок',
				})
			);
			dispatch(closeSupportModal());
		} catch (error) {
			dispatch(
				openNotifyModal({
					title: 'Ошибка',
					text: 'Не удалось отправить сообщение',
					confirmText: 'Ок',
				})
			);
		}
	};

	return (
		<ModalLarge isOpen title="Техническая поддержка" close={() => dispatch(closeSupportModal())}>
			<div className={styles.safety}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
					По любым вопросам, связанными с работой сервиса, Вы можете позвонить нам или написать
					сообщение
					<div className={styles.group}>
						<div className={styles.box}>
							<SVG src={phoneIcon} />
						</div>
						+ 7 (903) 406 - 64 - 99
					</div>
					<div className={cn(styles.parent, errors.subject && styles.error)}>
						<label htmlFor="subject">Контактный номер телефона или e-mail для обратной связи</label>
						<input className={styles.input} type="text" id="subject" {...register('subject')} />
						<span>{errors.subject?.message}</span>
					</div>
					<div className={cn(styles.parent, errors.comment && styles.error)}>
						<label htmlFor="comment">Текст сообщения</label>
						<textarea
							className={cn(styles.input, styles.area)}
							id="comment"
							{...register('comment')}
						/>
						<span>{errors.comment?.message}</span>
					</div>
					<div className={styles.forButton}>
						<Button type="submit" style={{ width: '150px', height: '40px' }}>
							Отправить
						</Button>
					</div>
				</form>
			</div>
		</ModalLarge>
	);
};

export default SupportModal;
