import React, { useState } from 'react';
import Modal from 'react-modal';

import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';
import { closeAuthModal } from 'library/redux/modal';

import { IconButton, Container, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useAuth } from 'library/components/authentication';
import { Login, Register, Restore } from './frames';

import st from './Authentication.module.scss';

const Authentication: React.FC = () => {
	// const [tab, setTab] = useState<string | boolean>('login');
	const authContext = useAuth();
	const [showRestore, setShowRestore] = useState(false);
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));

	const openTab = (tab: string) => {
		authContext.dispatch({ type: 'tab', payload: tab });
		setShowRestore(false);
	};

	const openRestore = () => {
		authContext.dispatch({ type: 'tab', payload: false });
		authContext.dispatch({ type: 'head', payload: 'Восстановление пароля' });
		setShowRestore(true);
	};

	const openRegister = () => {
		authContext.dispatch({ type: 'head', payload: '' });
		openTab('register');
	};

	return (
		<Modal isOpen ariaHideApp={false} className={st.modal} overlayClassName={st.overlay}>
			<Container
				disableGutters
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderBottom: '1px solid #cdcdcd',
				}}
			>
				{authContext.state.head ? (
					<div className={st.head}>{authContext.state.head}</div>
				) : (
					<Tabs
						value={authContext.state.tab}
						onChange={(event: React.SyntheticEvent, newValue: string) => openTab(newValue)}
					>
						<Tab label="Вход" value="login" sx={{ height: '60px' }} />
						<Tab label="Регистрация" value="register" sx={{ height: '60px' }} />
					</Tabs>
				)}
				<IconButton
					onClick={() => dispatch(closeAuthModal())}
					sx={{
						position: 'absolute',
						right: !matches ? '10px' : '-40px',
						top: !matches ? '10px' : '-10px',
						backgroundColor: 'transparent',
						color: matches ? '#FFF' : '#616f82',
						':hover': {
							backgroundColor: !matches ? '#f1f2f4' : 'transparent',
							color: matches ? '#FFF' : '#616f82',
						},
					}}
				>
					<CloseIcon />
				</IconButton>
			</Container>
			<Container disableGutters>
				{authContext.state.tab === 'login' && <Login openRestore={openRestore} />}
				{authContext.state.tab === 'register' && <Register openRestore={openRestore} />}
				{showRestore && <Restore openLogin={() => openTab('login')} openRegister={openRegister} />}
			</Container>
		</Modal>
	);
};

export default Authentication;
