import React from 'react';
import { Box } from '@mui/material';

type Props = {
	children: React.ReactNode | React.ReactNodeArray;
	title: string;
};

const Property: React.FC<Props> = ({ children, title }) => {
	return (
		<Box sx={{ maxWidth: '270px', display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '110px', minWidth: '110px' }}>{title}</Box>
			<Box sx={{ maxWidth: '160px' }}>{children}</Box>
		</Box>
	);
};

export default Property;
