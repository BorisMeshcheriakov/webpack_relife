import { TextField, IconButton } from '@mui/material';
import { useSettings } from 'library/hooks/schedules';
import React from 'react';
import Modal from 'react-modal';

import { Add, Close, Remove } from '@mui/icons-material';

import st from './ModalSettings.module.scss';

type Props = {
	close: () => void;
};

const ModalSettings: React.FC<Props> = ({ close }) => {
	const { register, handleSubmit, onSubmit, onDurationChange, title, isLoading, duration } =
		useSettings();

	const onFormSubmit = async (data: any) => {
		await onSubmit(data);
		close();
	};

	return (
		<Modal className={st.modal} overlayClassName={st.overlay} isOpen ariaHideApp={false}>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<section className={st.head}>
					<h3>{title}</h3>
					<button className={st.head__ready} type="submit">
						Готово
					</button>
					<div className={st.head__close}>
						<IconButton onClick={close}>
							<Close />
						</IconButton>
					</div>
				</section>
				<section className={st.body}>
					<TextField
						size="small"
						label="Время"
						disabled
						value={duration}
						InputProps={{
							endAdornment: (
								<>
									<IconButton
										disabled={isLoading}
										type="button"
										onClick={() => onDurationChange('decrement')}
									>
										<Remove />
									</IconButton>
									<IconButton
										disabled={isLoading}
										type="button"
										onClick={() => onDurationChange('increment')}
									>
										<Add />
									</IconButton>
								</>
							),
						}}
					/>

					<TextField disabled={isLoading} label="Стоимость" size="small" {...register('cost')} />

					<TextField
						disabled={isLoading}
						label="Предоплата"
						size="small"
						{...register('prepayment')}
						type="text"
					/>
				</section>
			</form>
		</Modal>
	);
};

export default ModalSettings;
