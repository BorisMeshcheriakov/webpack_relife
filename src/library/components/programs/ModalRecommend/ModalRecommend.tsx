/* eslint-disable eqeqeq */
import { FC, memo } from 'react';
import { ModalMiddle } from 'library/components/common';
import { useModalRecommend } from 'library/hooks/programs';
import { FormProvider } from 'react-hook-form';
import { icons } from 'resources/icons/program/index';
import { onChangeValidator } from 'library/helpers/programs';
import SVG from 'react-inlinesvg';

import cn from 'classnames';
import st from './ModalRecommend.module.scss';

interface Props {
	user?: string | number;
	close: () => void;
}

const ModalRecommend: FC<Props> = ({ close, user }) => {
	const { methods, getRecommendAction, step, setStep, isClients, showCloseBtn } = useModalRecommend(
		{
			close,
			user,
		}
	);

	return (
		<ModalMiddle isOpen close={close} onRequestClose={close} showClose={showCloseBtn}>
			<section className={st.head}>
				<h3>Рекомендация программы</h3>
			</section>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(getRecommendAction)} className={st.body}>
					<div className={st.step}>
						{step === 1 && (
							<>
								<div className={st.step__workspace}>
									<textarea
										placeholder="Ваш комментарий"
										{...methods.register('comment', {
											onChange: (e) => (e.target.value = onChangeValidator(e)),
										})}
									/>
									{methods.formState.errors.comment && <span>Укажите комментарий</span>}
								</div>
								<div className={st.step__buttons}>
									<button type="button" onClick={() => setStep(2)}>
										Далее
									</button>
								</div>
							</>
						)}

						{step === 2 && (
							<>
								<div className={st.step__workspace}>
									<h3 className={st.title}>
										{isClients
											? 'На какое кол-во дней рекомендовать видео программу?'
											: 'На какое кол-во дней отправить приглашение?'}
									</h3>
									<div className={st.radio__group}>
										<button
											className={cn(st.btn, methods.getValues('days_period') === 7 && st.active)}
											type="button"
											onClick={() => methods.setValue('days_period', 7, { shouldDirty: true })}
										>
											<span>7</span>
										</button>

										<button
											className={cn(st.btn, methods.getValues('days_period') === 14 && st.active)}
											type="button"
											onClick={() => methods.setValue('days_period', 14, { shouldDirty: true })}
										>
											<span>14</span>
										</button>

										<button
											className={cn(st.btn, methods.getValues('days_period') === 21 && st.active)}
											type="button"
											onClick={() => methods.setValue('days_period', 21, { shouldDirty: true })}
										>
											<span>21</span>
										</button>

										<button
											className={cn(st.btn, methods.getValues('days_period') === 28 && st.active)}
											type="button"
											onClick={() => methods.setValue('days_period', 28, { shouldDirty: true })}
										>
											<span>28</span>
										</button>
									</div>
								</div>

								<div className={st.btns}>
									<button type="button" onClick={() => setStep(1)} className={st.back}>
										<SVG src={icons.arrowBack} className={st.icon} />
										<p>Назад</p>
									</button>
									<button type="button" className={st.next} onClick={() => setStep(3)}>
										Далее
									</button>
								</div>
							</>
						)}

						{step === 3 && (
							<>
								<div className={st.step__workspace}>
									<h3 className={st.title}>
										{isClients
											? 'Рекомендовать видео программу вашему клиенту?'
											: 'Скопируйте и отправьте ссылку удобным для Вас способом.'}
									</h3>
								</div>
								<div className={st.step__buttons}>
									<button type="submit">
										{isClients ? 'Рекомендовать' : 'Скопировать ссылку'}
									</button>
								</div>
							</>
						)}
					</div>
				</form>
			</FormProvider>
		</ModalMiddle>
	);
};

export default memo(ModalRecommend);
