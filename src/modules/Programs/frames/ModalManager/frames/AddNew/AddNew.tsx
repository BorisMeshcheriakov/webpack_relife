import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Add } from '@mui/icons-material';
import { IconButtonGrey } from 'library/components/programs';
import { Tooltip } from '@mui/material';
import { useAppDispatch } from 'library/hooks/common';
import { setProgram } from 'library/redux/programs';

const AddNew: React.FC<{ tab: string; onTabChange: (tab: string) => void }> = ({
	tab,
	onTabChange,
}) => {
	const { url } = useRouteMatch();
	const { push } = useHistory();
	const dispatch = useAppDispatch();

	const getLink = (code: string) => {
		let link = '';
		switch (code) {
			case 'programs':
				link = 'program';
				break;

			case 'video':
				link = 'video';
				break;

			default:
				link = 'program';
				break;
		}
		return link;
	};

	const getTooltip = (tab: string): string => {
		let tooltip = '';
		switch (tab) {
			case 'programs':
				tooltip = 'Новая видеопрограмма';
				break;

			case 'video':
				tooltip = 'Новое видео';
				break;

			default:
				tooltip = 'Новая видеопрограмма';
				break;
		}
		return tooltip;
	};

	const onAdd = () => {
		dispatch(setProgram(null));
		push(`${url}/${getLink(tab)}/new/edit`);
		onTabChange('video');
	};

	return (
		<Tooltip title={getTooltip(tab)}>
			<div>
				<IconButtonGrey onClick={onAdd}>
					<Add fontSize="small" />
				</IconButtonGrey>
			</div>
		</Tooltip>
	);
};

export default AddNew;
