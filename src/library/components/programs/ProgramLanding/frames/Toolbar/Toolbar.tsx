import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useModuleSettings } from 'library/hooks/module';

import { Card } from 'library/components/ui';
import { IconButtonGrey, ProgramMenu, ProgramModeration } from 'library/components/programs';

import { ArrowBackIosNew } from '@mui/icons-material';

import st from './Toolbar.module.scss';
import { Program } from 'library/models/programs';
import { useProgramMenu } from 'library/hooks/programs';
import { useCommonSettings } from 'library/hooks/common';

type Props = {
	program: Program;
};

const Toolbar: React.FC<Props> = ({ program }) => {
	const { locationRoot } = useModuleSettings();
	const { id } = useParams<{ id: string }>();
	const { push } = useHistory();
	const { isAuthor } = useProgramMenu(program);
	const { moderation } = useCommonSettings();

	return (
		<Card className={st.toolbar}>
			<div className={st.toolbar__left}>
				<IconButtonGrey onClick={() => push(`/${locationRoot}/program/${id}`)}>
					<ArrowBackIosNew fontSize="small" sx={{ transform: 'scale(0.8)' }} />
				</IconButtonGrey>
			</div>

			<div className={st.toolbar__right}>
				{isAuthor() && moderation && <ProgramModeration program={program} />}

				<div className={st.toolbar__buttons}>
					<ProgramMenu program={program} />
				</div>
			</div>
		</Card>
	);
};

export default Toolbar;
