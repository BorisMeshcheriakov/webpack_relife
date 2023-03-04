import React from 'react';
import SVG from 'react-inlinesvg';
import Address from '../Address';
import Button from '../Button';
import { Menu, MenuItem } from '@mui/material';

import { useAppDispatch, useAppSelector, useMenu } from 'library/hooks/common';
import { changeAddress, selectSortAddress } from 'library/redux/schedules';

import { icons } from 'resources/icons/schedules';
import { Settings } from '@mui/icons-material';

import st from './Menu.module.scss';

type Props = {
	onSetup: () => void;
};

const MenuAddress: React.FC<Props> = ({ onSetup }) => {
	const dispatch = useAppDispatch();
	const { anchorEl, open, handleClick, handleClose, onItemClick } = useMenu();

	const addresses = useAppSelector(selectSortAddress);

	const items = [
		{
			title: 'Настроить',
			action: () => onSetup(),
		},
	];

	return (
		<>
			<Button
				id="address-button"
				aria-controls={open ? 'address-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<Address />
			</Button>
			<Menu
				id="address-menu"
				anchorEl={anchorEl}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'address-button',
				}}
			>
				{addresses.map((address, index) => (
					<MenuItem
						key={address.id}
						onClick={() => onItemClick(() => dispatch(changeAddress(address)))}
					>
						<div className={st.item}>
							<SVG src={icons['home']} />
							<span>{index + 1}</span>
							<div
								className={st.item__text}
							>{`${address.city}, ${address.street}, ${address.house}`}</div>
						</div>
					</MenuItem>
				))}
				{items.map((item) => (
					<MenuItem key={item.title} onClick={() => onItemClick(item.action)}>
						<div className={st.item}>
							<Settings />
							<div className={st.item__text}>{item.title}</div>
						</div>
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default MenuAddress;
