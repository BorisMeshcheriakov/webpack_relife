import React from 'react';
import { useRegister } from 'library/hooks/auth';
import {
	ButtonSubmit,
	Timer,
	AuthFrom,
	CustomInput,
	ButtonLink,
} from 'library/components/authentication';

import st from './Register.module.scss';
import { useCommonSettings } from 'library/hooks/common';
import { Checkbox } from '@mui/material';
import { Controller } from 'react-hook-form';

interface Props {
	openRestore: () => void;
}

const Register: React.FC<Props> = ({ openRestore }) => {
	const register = useRegister(openRestore);
	const settings = useCommonSettings();

	return (
		<>
			{register.step === 1 && (
				<AuthFrom
					onSubmit={register.handleSubmit((data) => register.registerPhone(data.phonenumber))}
				>
					<CustomInput
						type="phonenumber"
						label="Телефон"
						name="phonenumber"
						control={register.controlPhoneNumber}
						error={register.phoneNumberErrors?.phonenumber}
						disabled={register.isLoading}
					/>

					<div className={st.agreement}>
						<Controller
							name="acceptAgreement"
							control={register.controlPhoneNumber}
							render={({ field }) => (
								<Checkbox
									disableRipple
									sx={{ paddingLeft: 0 }}
									{...field}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
							)}
						/>

						<span>
							Я прочитал и принимаю следующие{' '}
							<span className={st.agreement__link} onClick={register.openAgreement}>
								условия использования
							</span>
						</span>
						<p>{register.phoneNumberErrors?.acceptAgreement?.message}</p>
					</div>

					<div className={st.wrapper}>
						<ButtonSubmit type="submit" disabled={register.isLoading}>
							Зарегистрироваться
						</ButtonSubmit>
					</div>

					{settings.allow_coach_register && (
						<ButtonLink disabled={register.isLoading}>
							<a
								href={`${window.location.origin}/base/coach_form/`}
								target="_blank"
								rel="noopener noreferrer"
							>
								Зарегистрироваться, как специалист
							</a>
						</ButtonLink>
					)}
				</AuthFrom>
			)}

			{register.step === 2 && (
				<AuthFrom onSubmit={register.submitCode((data) => register.checkCode(data))}>
					<div className={st.passcode}>
						<p>{`На номер +${register.phonenumber} поступит смс с кодом`}</p>
						<p>Введите полученный код в ячейки</p>
						<p>Если смс не пришло, обратитесь</p>
						<p>в тех поддержку по телефону +79034066499</p>
					</div>
					<CustomInput
						type="passcode"
						name="passcode"
						control={register.controlPassCode}
						error={register.passcodeErrors?.passcode}
						disabled={register.isLoading}
					/>
					<div className={st.wrapper__row}>
						<ButtonSubmit
							type="reset"
							disabled={register.showTimer}
							handler={() => register.registerPhone(register.phonenumber)}
						>
							Повторить отправку
						</ButtonSubmit>
						<ButtonSubmit type="submit" disabled={register.isLoading}>
							Подтвердить код
						</ButtonSubmit>
					</div>
					{register.showTimer && (
						<div className={st.timer}>
							<Timer timeout={60000} callback={() => register.timerAction()} />
						</div>
					)}
				</AuthFrom>
			)}

			{register.step === 3 && (
				<AuthFrom onSubmit={register.submitRegister((data) => register.confirmRegister(data))}>
					<CustomInput
						type="password"
						label="Пароль"
						name="password"
						control={register.passwordControl}
						error={register.passwordErrors?.password}
						disabled={register.isLoading}
						showPassword={register.showPassword}
						setValue={() => {
							register.setShowPassword(!register.showPassword);
						}}
					/>

					<CustomInput
						type="password"
						label="Повторите пароль"
						name="passwordRepeat"
						control={register.passwordControl}
						error={register.passwordErrors?.passwordRepeat}
						disabled={register.isLoading}
						showPassword={register.showPassword}
						setValue={() => {
							register.setShowPassword(!register.showPassword);
						}}
					/>

					<div className={st.wrapper}>
						<ButtonSubmit type="submit" disabled={register.isLoading}>
							Готово
						</ButtonSubmit>
					</div>
				</AuthFrom>
			)}
		</>
	);
};

export default Register;
