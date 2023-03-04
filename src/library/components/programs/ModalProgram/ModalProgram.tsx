import React from 'react';

import { useParams } from 'react-router-dom';

import { useProgram } from 'library/hooks/programs';
import { useAppDispatch, useCommonSettings } from 'library/hooks/common';

import { Program } from 'library/models/programs';

import { setProgram } from 'library/redux/programs';

import { Loader, ModalLarge } from 'library/components/common';
import { ProgramModeration, VideoProgram } from 'library/components/programs';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import st from './ModalProgram.module.scss';

type Props = {
	close: () => void;
};

const ModalProgram: React.FC<Props> = ({ close }) => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	const { moderation } = useCommonSettings();

	const program = useProgram(id);

	const onClose = () => {
		dispatch(setProgram(null));
		close();
	};

	const showContent = () => {
		if (program.program) {
			return program.status === 'idle' && program.program.pk === parseInt(id);
		}

		return false;
	};

	return (
		<ModalLarge onRequestClose={onClose} title="Программа" disableHeader isOpen>
			{showContent() && (
				<div className={st.program}>
					<section className={st.head}>
						<h2 className={st.head__title}>Видеопрограмма</h2>
						<div className={st.head__moderation}>
							{program && program.isAuthor && moderation ? (
								<ProgramModeration program={program.program as Program} />
							) : (
								// program?.program?.is_payed && <RentalStatus program={program.program} />
								<></>
							)}
						</div>
						<div className={st.head__close}>
							<IconButton onClick={onClose}>
								<Close />
							</IconButton>
						</div>
					</section>

					<section className={st.program__content}>
						{program.program && (
							<VideoProgram
								program={program.program}
								selectedDay={program.day}
								onDaySelect={program.onDaySelect}
								programVideos={program.videos}
								resetSelectedDay={program.resetSelectedDay}
								onClose={onClose}
							/>
						)}
					</section>
				</div>
			)}

			{program.status === 'loading' && <Loader />}
		</ModalLarge>
	);
};

export default ModalProgram;
