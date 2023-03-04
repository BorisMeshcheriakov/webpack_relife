import React from 'react';
import { Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { ModalLarge, Phone } from 'library/components/common';
import { ImageUploader, InputText, DatePicker, GenderPicker } from 'library/components/profile';

import useProfileEdit from 'library/hooks/user/useProfileEdit';

import st from './Editor.module.scss';

import { icons } from 'resources/icons/profile';

const Editor: React.FC = () => {
	const history = useHistory();
	const edit = useProfileEdit();

	return (
		<ModalLarge isOpen close={() => history.push('/personal')} title="Редактирование профиля">
			<form className={st.editor} onSubmit={edit.handleSubmit(edit.onSubmit)}>
				<div className={st.main}>
					<div className={st.main__image}>
						<ImageUploader
							empty={icons.avatar}
							url={edit.user?.user?.photo}
							register={{ ...edit.register('image', { onChange: (e) => edit.onFileChange(e) }) }}
							preview={edit.preview}
						/>
					</div>
					<div className={st.main__info}>
						<InputText
							id="last_name"
							label="Фамилия"
							register={{ ...edit.register('last_name') }}
							error={edit.errors['last_name']}
							autoComplete="new-password"
						/>
						<InputText
							id="first_name"
							label="Имя"
							register={{ ...edit.register('first_name') }}
							error={edit.errors['first_name']}
							autoComplete="new-password"
						/>
						<InputText
							id="middle_name"
							label="Отчество"
							register={{ ...edit.register('middle_name') }}
							error={edit.errors['middle_name']}
							autoComplete="new-password"
						/>
						<InputText
							id="email"
							label="E-mail"
							register={{ ...edit.register('email') }}
							error={edit.errors['email']}
							autoComplete="new-password"
						/>
						<Controller
							name="phonenumber"
							control={edit.control}
							render={({ field }) => {
								return (
									<div className={st.wrapper}>
										<Phone
											name="phonenumber"
											label="Номер телефона"
											value={field.value}
											onChange={field.onChange}
											ref={field.ref}
											error={edit.errors['phonenumber']}
											disabled
										/>
										<span>{edit.errors.phonenumber?.message}</span>
									</div>
								);
							}}
						/>
						<div />
						<Controller
							name="birth_date"
							control={edit.control}
							render={({ field }) => {
								return (
									<div className={st.wrapper}>
										<DatePicker
											onChange={field.onChange}
											date={new Date(field.value)}
											error={edit.errors['birth_date']}
										/>
										<span>{edit.errors.birth_date?.message}</span>
									</div>
								);
							}}
						/>
						<GenderPicker register={{ ...edit.register('gender') }} />
					</div>
				</div>
				<div className={st.buttonWrapper}>
					<button type="submit" className={st.submit} disabled={edit.isLoading}>
						Сохранить
					</button>
				</div>
			</form>
		</ModalLarge>
	);
};

export default Editor;
