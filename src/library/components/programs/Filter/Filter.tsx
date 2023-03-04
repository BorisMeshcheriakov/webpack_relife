import React from 'react';

import { CommonTag } from 'library/models/common';

import {
	MenuItem,
	Select,
	Input,
	Checkbox,
	ListItemText,
	SelectChangeEvent,
	TextField,
	Divider,
	Tooltip,
} from '@mui/material';

import { icons } from 'resources/icons/events';
import SVG from 'react-inlinesvg';

import st from './Filter.module.scss';
import cn from 'classnames';

interface Props {
	tags: CommonTag[];
	selected: number[];
	search: string;
	onChange: (e: SelectChangeEvent<number[]>) => void;
	onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
	id?: string;
}

const Filter: React.FC<Props> = ({ tags, selected, search, onChange, onSearch, id }) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const getBadgeNumber = (): number => {
		let number = selected.length;
		if (search.length > 0) number += 1;
		return number;
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleChange = (e: SelectChangeEvent<number[]>) => {
		e.stopPropagation();
		onChange(e);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		onSearch(e);
	};

	return (
		<div className={st.wrapper}>
			<Tooltip title="Фильтр">
				<div
					id={id ?? 'openFilter'}
					className={cn(st.filter, isOpen && st.open, getBadgeNumber() > 0 && st.badgeNumber)}
					onClick={() => setIsOpen(!isOpen)}
				>
					<SVG src={icons.filterFix} />
					{getBadgeNumber() > 0 && <p className={st.badge}>{getBadgeNumber()}</p>}
				</div>
			</Tooltip>
			<Select
				multiple
				value={selected}
				open={isOpen}
				input={<Input id="select-multiple-checkbox" />}
				style={{ display: 'none' }}
				onClose={handleClose}
				onChange={handleChange}
				MenuProps={{
					anchorEl: document.getElementById(id ?? 'openFilter'),
				}}
			>
				<div>
					<TextField
						placeholder="Поиск..."
						size="small"
						value={search}
						onChange={handleSearch}
						onKeyDown={(e) => e.stopPropagation()}
						sx={{ margin: '10px' }}
					/>
				</div>
				<Divider />

				{tags.map((tag) => (
					<MenuItem key={tag.id} value={tag.id}>
						<Checkbox checked={selected.indexOf(tag.id) > -1} />
						<ListItemText primary={tag.title} />
					</MenuItem>
				))}
			</Select>
		</div>
	);
};

export default Filter;
