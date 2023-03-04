import React from 'react';
import { Box } from '@mui/material';

type Props = {
	type: string;
	value?: string;
};

const Attribute: React.FC<Props> = ({ type, value }) => {
	return (
		<Box
			sx={{
				minWidth: '34px',
				width: '34px',
				height: '34px',
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: type === 'color' ? `#${value}` : '#cdcdcd',
				borderRadius: '4px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{type !== 'color' && value}
			{type === 'color' && (
				<Box
					sx={{
						width: '30px',
						height: '30px',
						borderRadius: '4px',
						backgroundColor: `#${value}`,
					}}
				/>
			)}
		</Box>
	);
};

export default Attribute;
