import React from 'react';
import { Program } from 'library/models/programs';

import { Description, AuthorCard } from './frames';

import st from './ProgramLanding.module.scss';

type Props = {
	program: Program | null;
};

const ProgramLanding: React.FC<Props> = ({ program }) => {
	return (
		<div className={st.landing}>
			{program && (
				<>
					<h1>{program?.title}</h1>

					<section className={st.description}>
						{/* <div className={st.description__image}>
							<DescriptionImage image={program?.promo_image} />
						</div> */}
						{/* <div className={st.description__text}> */}
						<Description description={program?.description} image={program?.promo_image} />
						{/* </div> */}
					</section>

					{/* {program.promo_video && <Video video={program.promo_video} />} */}

					<section className={st.author}>
						<h2>Автор</h2>
						<AuthorCard author={program.author} />
					</section>
				</>
			)}
		</div>
	);
};

export default ProgramLanding;
