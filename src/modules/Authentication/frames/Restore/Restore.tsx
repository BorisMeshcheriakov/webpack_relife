import React from 'react';
import { useRestore } from 'library/hooks/auth';
import { AuthFrom, ButtonSubmit, CustomInput, Timer } from 'library/components/authentication';

import st from './Restore.module.scss';
import 'react-phone-number-input/style.css';

interface Props {
	openLogin: () => void;
	openRegister: () => void;
}

const Restore: React.FC<Props> = ({ openLogin, openRegister }) => {
	const restore = useRestore(
		() => openLogin(),
		() => openRegister()
	);

	return (
		<>
			{restore.step === 1 && (
				<AuthFrom onSubmit={restore.handleSubmit((data) => restore.restore(data))}>
					<CustomInput
						type="phonenumber"
						label="Телефон"
						name="phonenumber"
						control={restore.controlPhoneNumber}
						error={restore.phoneNumberErrors?.phonenumber}
						disabled={restore.isLoading}
					/>
					<div className={st.wrapper}>
						<ButtonSubmit type="submit" disabled={restore.isLoading}>
							Запросить код
						</ButtonSubmit>
					</div>
				</AuthFrom>
			)}

			{restore.step === 2 && (
				<AuthFrom onSubmit={restore.handleSubmitCode((data) => restore.confirmCode(data))}>
					<div className={st.passcode}>
						<p>{`На номер ${restore.phone} поступит смс с кодом`}</p>
						<p>Введите полученный код в ячейки</p>
						<p>Если смс не пришло, обратитесь</p>
						<p>в тех поддержку по телефону +79034066499</p>
					</div>
					<CustomInput
						type="passcode"
						name="passcode"
						control={restore.controlPassCode}
						error={restore.passcodeErrors?.passcode}
						disabled={restore.isLoading}
					/>

					<div className={st.wrapper__row}>
						<ButtonSubmit
							type="reset"
							disabled={restore.showTimer}
							handler={() => restore.restore({ phonenumber: restore.phone })}
						>
							Повторить отправку
						</ButtonSubmit>
						<ButtonSubmit type="submit" disabled={restore.isLoading}>
							Подтвердить код
						</ButtonSubmit>
					</div>
					{restore.showTimer && (
						<div className={st.timer}>
							<Timer timeout={60000} callback={() => restore.timerAction()} />
						</div>
					)}
				</AuthFrom>
			)}

			{restore.step === 3 && (
				<AuthFrom onSubmit={restore.handleSubmitPass((data) => restore.confirmRestore(data))}>
					<CustomInput
						type="password"
						label="Пароль"
						name="password"
						control={restore.passwordControl}
						error={restore.errorsPass?.password}
						disabled={restore.isLoading}
						showPassword={restore.showPassword}
						setValue={() => {
							restore.setShowPassword(!restore.showPassword);
						}}
					/>

					<CustomInput
						type="password"
						label="Повторите пароль"
						name="passwordRepeat"
						control={restore.passwordControl}
						error={restore.errorsPass?.passwordRepeat}
						disabled={restore.isLoading}
						showPassword={restore.showPassword}
						setValue={() => {
							restore.setShowPassword(!restore.showPassword);
						}}
					/>

					<div className={st.wrapper}>
						<ButtonSubmit type="submit" disabled={restore.isLoading}>
							Готово
						</ButtonSubmit>
					</div>
				</AuthFrom>
			)}
		</>
	);
};

export default Restore;
