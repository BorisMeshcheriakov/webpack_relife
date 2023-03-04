import { createTheme } from '@mui/material';
import { Fonts } from 'resources/branding/fonts/SFPro';

const theme = createTheme({
	palette: {
		primary: {
			main: '#4198c5',
		},
		secondary: {
			main: '#f50057',
		},
		background: {
			default: '#fff',
		},
		divider: 'rgba(0,0,0,0.12)',
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 1024,
			lg: 1200,
			xl: 1536,
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'@font-face': {
					fontFamily: 'SFPro-Regular',
					src: `url(${Fonts.SFProRegular}) format("truetype")`,
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
				dense: {
					height: 50,
					minHeight: 50,
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& label.Mui-focused': {
						color: '#4198C5',
					},
					'& .MuiInput-underline:after': {
						borderBottomColor: '#4198C5',
					},
					'& .MuiOutlinedInput-root': {
						'&:hover fieldset': {
							borderColor: '#4198C5',
							borderWidth: '1px',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#4198C5',
							borderWidth: '1px',
							outline: 'none',
						},
					},
					'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
						display: 'none',
					},
					'& input[type=number]': {
						MozAppearance: 'textfield',
					},
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				},
			},
		},
	},
	typography: {
		fontFamily: 'SFPro-Regular',
		button: {
			textTransform: 'none',
		},
	},
});

export default theme;
