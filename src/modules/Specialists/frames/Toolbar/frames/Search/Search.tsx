import React from 'react';

import { useAppDispatch, useAppSelector, useMenu } from 'library/hooks/common';

import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import { IconButtonGrey } from 'library/components/programs';

import { Search as SearchIcon } from '@mui/icons-material';
import { selectSpecialistsSearch, setList, setSearch } from 'library/redux/specialists';

type Props = {};

const Search = (props: Props) => {
	const dispatch = useAppDispatch();
	const search = useAppSelector(selectSpecialistsSearch);
	const { anchorEl, open, handleClick, handleClose } = useMenu();

	const onSearch = (target: EventTarget & (HTMLInputElement | HTMLTextAreaElement)) => {
		dispatch(setSearch(target.value));
		dispatch(
			setList({
				list: [],
				page: 1,
				hasMore: true,
				status: 'idle',
			})
		);
	};

	return (
		<>
			<Badge badgeContent={search ? 1 : null} color="primary" sx={{ zIndex: 0 }}>
				<Tooltip title="Поиск">
					<IconButtonGrey onClick={handleClick} id="specialists-search-button">
						<SearchIcon />
					</IconButtonGrey>
				</Tooltip>
			</Badge>
			<Menu
				anchorEl={anchorEl}
				id="specialists-search-menu"
				open={open}
				onClose={handleClose}
				// onClick={handleClose}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<TextField
					sx={{ margin: '10px' }}
					size="small"
					placeholder="Поиск..."
					value={search}
					onChange={(e) => onSearch(e.target)}
				/>
			</Menu>
		</>
	);
};

export default Search;
