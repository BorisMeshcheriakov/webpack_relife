import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { ProgramEditorValues } from 'library/types/programs';

import { useModuleSettings } from 'library/hooks/module';

import { ButtonIcon } from '..';

import { icons } from 'resources/icons/program';
import st from './Nav.module.scss';

const Nav: React.FC = () => {
	const { url } = useRouteMatch();
	const { push } = useHistory();
	const { control } = useFormContext<ProgramEditorValues>();
	const { moduleSettings } = useModuleSettings();

	const onVideoAdd = () => {
		push(`${url}/videos/select`);
	};

	return (
		<section className={st.nav}>
			<div className={st.nav__tabs}>
				<h2 className={st.title}>Видео</h2>
			</div>

			<div className={st.nav__add}>
				{moduleSettings?.library && (
					<Controller
						name="periodicity"
						control={control}
						render={(props) => (
							<ButtonIcon
								type="button"
								text="7-дневная периодичность"
								icon={props.field.value ? icons.check : ''}
								onClick={() => props.field.onChange(!props.field.value)}
							/>
						)}
					/>
				)}

				{moduleSettings?.library ? (
					<ButtonIcon text="Добавить видео" type="button" icon={icons.add} onClick={onVideoAdd} />
				) : (
					<Link to={`${url}/video/new/edit`}>
						<ButtonIcon type="button" text="Добавить видео" icon={icons.add} />
					</Link>
				)}
			</div>
		</section>
	);
};

export default Nav;
