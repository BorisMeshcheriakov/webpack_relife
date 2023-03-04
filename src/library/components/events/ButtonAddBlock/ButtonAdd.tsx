import React from 'react';

import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

import st from './ButtonAdd.module.scss';

type Props = any;

const ButtonAdd: React.FC<Props> = (props) => {
	return (
		<IconButton {...props} className={st.add}>
			<Add />
		</IconButton>
	);
};

export default ButtonAdd;
