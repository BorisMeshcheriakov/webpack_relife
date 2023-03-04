import React from 'react';
import { Menu, MenuItem } from '@mui/material';

import { useTimezone } from 'library/hooks/schedules';
import { useMenu } from 'library/hooks/common';
import { Calendar } from 'library/types/schedules';

import { Clock } from './frames';

import st from './Timezone.module.scss';

type Props = {
	calendar: Calendar;
};

const Timezone: React.FC<Props> = ({ calendar }) => {
	const { anchorEl, open, handleClick, handleClose } = useMenu();
	const { list, setTimezone, buttonText } = useTimezone({ calendar: calendar });

	return (
		<>
			<button className={st.btn} id="tz-button" onClick={handleClick}>
				<Clock />
				<div>{buttonText}</div>
			</button>
			<Menu
				id={'tz-menu'}
				anchorEl={anchorEl}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'tz-button',
				}}
			>
				{list.map((item) => (
					<MenuItem
						key={item.tz}
						onClick={() => {
							handleClose();
							setTimezone(item.tz);
						}}
						className={st.menuItem}
					>
						<Clock />
						<div>{`GMT ${item.utcOffset} ${item.city}`}</div>
					</MenuItem>
				))}
				<MenuItem className={st.menuItem}>
					<a href="http://www.gmt.su/" target="_blank" rel="noreferrer">
						Как узнать свой часовой пояс
					</a>
				</MenuItem>
			</Menu>
		</>
	);
};

export default Timezone;
