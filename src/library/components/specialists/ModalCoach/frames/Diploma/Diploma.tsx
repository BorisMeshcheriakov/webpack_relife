import React from 'react';

import { useDiploma } from './hooks';

import { DiplomaViewer } from './frames';

import { ZoomIn } from '@mui/icons-material';

import st from './Diploma.module.scss';

type Diplom = {
	coach: number;
	id: number;
	image: string;
};

type Props = {
	diplom?: Diplom[];
};

const Diploma: React.FC<Props> = ({ diplom }) => {
	const { selected, setDiplomaUrl } = useDiploma();

	return (
		<>
			{!!diplom?.length && (
				<section className={st.diplomas}>
					<h2 className={st.diplomas__title}>Дипломы и сертификаты</h2>
					<div className={st.diplomas__wrapper}>
						{diplom &&
							diplom.map((diploma: Diplom) => (
								<div className={st.diplomas__diplom} onClick={() => setDiplomaUrl(diploma.image)}>
									<div className={st.diplomas__icon}>
										<ZoomIn />
									</div>
									<img key={diploma.id} src={diploma.image} alt="" className={st.diplomas__image} />
								</div>
							))}
					</div>

					{!!selected && <DiplomaViewer url={selected} close={() => setDiplomaUrl('')} />}
				</section>
			)}
		</>
	);
};

export default Diploma;
