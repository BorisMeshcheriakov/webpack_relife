import { useAppSelector } from 'library/hooks/common';
import { useModuleSettings } from 'library/hooks/module';
import { selectTab } from 'library/redux/clients';
import React from 'react';
import SVG from 'react-inlinesvg';
import { Link } from 'react-router-dom';

import { icons } from 'resources/icons/program';

import st from './LandingLink.module.scss';

type Props = {
	pk: number;
};

const LandingLink: React.FC<Props> = ({ pk }) => {
	const { locationRoot } = useModuleSettings();
	const clientTab = useAppSelector(selectTab);

	const landingLink = () => {
		if (locationRoot === 'clients') return `/${clientTab}/landing/${pk}`;

		return `/${locationRoot}/landing/${pk}`;
	};

	return (
		<Link className={st.link} to={landingLink()}>
			<span>Смотреть презентацию</span>
			<SVG src={icons.link} />
		</Link>
	);
};

export default LandingLink;
