import React from 'react';
import { useParams } from 'react-router-dom';

import { Author, Program } from 'library/models/programs';

import { useProgram, useProgramBuy } from 'library/hooks/programs';
import { useUser } from 'library/hooks/user';

// import { getInitial } from 'library/helpers/user';

import { Loader, ModalMiddle } from 'library/components/common';

import st from './ModalBuy.module.scss';

type Props = {
	close?: () => void;
};

const ModalBuy: React.FC<Props> = ({ close }) => {
	const { id } = useParams<{ id: string }>();
	const { program, status } = useProgram(id);
	const { user } = useUser();
	const { buyProgram, isProcessing } = useProgramBuy();

	const getName = (author?: Author) => {
		let name = '';
		if (author) {
			const { last_name, first_name, middle_name } = author;
			// name = getInitial(first_name, middle_name, last_name);
			name = `${last_name} ${first_name} ${middle_name ?? ''}`;
		}
		return name;
	};

	const onBuy = async () => {
		if (id) {
			buyProgram(id);
		}
	};

	const getProgramRentalDuration = (program: Program) => {
		let days = 0;
		let dayWord = 'дней';

		if (program.individual?.duration_days) {
			days = program.individual.duration_days;
		} else {
			days = program.duration;
		}

		dayWord = days === 21 ? 'день' : 'дней';

		return `${days} ${dayWord}`;
	};

	return (
		<ModalMiddle isOpen close={close} onRequestClose={close} className={st.modal}>
			<section className={st.head}>
				<h3>Прокат видео</h3>
			</section>

			{status === 'loading' && (
				<div className={st.wrapper}>
					<Loader />
				</div>
			)}
			{status === 'idle' && program && (
				<>
					<section className={st.data}>
						<div className={st.data__row}>
							<div className={st.data__title}>Программа</div>
							<div className={st.data__field}>{program?.title}</div>
						</div>
						<div className={st.data__row}>
							<div className={st.data__title}>Автор</div>
							<div className={st.data__field}>{getName(program?.author)}</div>
						</div>
						<div className={st.data__row}>
							<div className={st.data__title}>Прокат на</div>
							<div className={st.data__field}>{getProgramRentalDuration(program)}</div>
						</div>
						<div className={st.data__row}>
							<div className={st.data__title}>Стоимость</div>
							<div className={st.data__field}>
								{(user?.is_coach ? program?.cost_coach : program?.cost) / 100} ₽
							</div>
						</div>
					</section>
					<section className={st.submit}>
						<button
							disabled={isProcessing}
							type="button"
							className={st.submit__button}
							onClick={onBuy}
						>
							Взять в прокат
						</button>
					</section>
				</>
			)}
		</ModalMiddle>
	);
};

export default ModalBuy;
