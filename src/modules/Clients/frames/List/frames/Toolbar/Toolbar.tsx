import React from 'react';

import { InputAdornment, TextField } from '@mui/material';
import { Search, Add, Close, ArrowForwardIos, ArrowBackIosNew } from '@mui/icons-material';
import { Card } from 'library/components/clients';

import st from './Toolbar.module.scss';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { changeClients, selectClients } from 'library/redux/clients';
import { IconButtonGrey } from 'library/components/programs';

interface Props {
	isOpen: boolean;
	handleOpen: (open: boolean) => void;
	handleCreateOpen: (open: boolean) => void;
}

const Toolbar: React.FC<Props> = ({ isOpen, handleOpen, handleCreateOpen }) => {
	const [showSearch, setShowSearch] = React.useState(false);
	const dispatch = useAppDispatch();
	const { search } = useAppSelector(selectClients);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		dispatch(
			changeClients({ search: e.target.value, hasNext: true, page: 1, list: [], status: 'idle' })
		);
	};

	const onCreate = () => {
		handleCreateOpen(true);

		if (window.innerWidth <= 1024) handleOpen(false);
	};

	return (
		<Card className={st.toolbar}>
			{showSearch ? (
				<div className={st.toolbar__search}>
					<TextField
						value={search}
						onChange={onSearch}
						size="small"
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search fontSize="small" />
								</InputAdornment>
							),
						}}
					/>
					<IconButtonGrey onClick={() => setShowSearch(false)}>
						<Close fontSize="small" />
					</IconButtonGrey>
				</div>
			) : (
				<div className={st.toolbar__actions}>
					{isOpen ? (
						<>
							<IconButtonGrey onClick={() => setShowSearch(true)}>
								<Search fontSize="small" />
							</IconButtonGrey>

							<div className={st.toolbar__actions_right}>
								<IconButtonGrey onClick={onCreate}>
									<Add fontSize="small" />
								</IconButtonGrey>

								{window.innerWidth <= 1024 && (
									<IconButtonGrey onClick={() => handleOpen(false)}>
										<ArrowBackIosNew fontSize="small" />
									</IconButtonGrey>
								)}
							</div>
						</>
					) : (
						<IconButtonGrey onClick={() => handleOpen(true)}>
							<ArrowForwardIos fontSize="small" />
						</IconButtonGrey>
					)}
				</div>
			)}
		</Card>
	);
};

export default Toolbar;
