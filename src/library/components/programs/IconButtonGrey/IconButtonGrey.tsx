import React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const IconButtonGrey = styled(IconButton)<IconButtonProps>(({ theme }) => ({
	width: 34,
	height: 34,
	backgroundColor: '#f1f2f4 !important',
	padding: 0,
	'&:hover': {
		backgroundColor: `${theme.palette.primary.main} !important`,
		color: '#fff !important',
	},
}));

export default function StyledCustomization(props: IconButtonProps) {
	return <IconButtonGrey {...props} />;
}
