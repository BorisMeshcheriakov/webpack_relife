import { FC } from 'react';
import { Tooltip } from '@mui/material';

import SVG from 'react-inlinesvg';
import searchIcon from 'resources/icons/shop/search.svg';
import cross from 'resources/icons/shop/cross.svg';

import cn from 'classnames';
import st from './Search.module.scss';

interface Props {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	setValue: (inputValue: any) => void;
	value: string;
	placeholder?: string;
	// onSearch?: DebouncedFunc<(query: any) => void>; // тестовый поиск
	searchTag?: string; // тестовый поиск
}

const Search: FC<Props> = ({ isOpen, open, close, placeholder = '', value, setValue }) => {
	return (
		<Tooltip
			classes={{
				popper: cn(st.popper, isOpen && st.openP),
				tooltip: cn(st.tooltip, isOpen && st.openT),
			}}
			title="Поиск"
			placement="bottom-end"
		>
			<div className={cn(st.search, isOpen && st.open)} onClick={open}>
				<SVG className={st.icon} src={searchIcon} />
				<input
					ref={(input) => isOpen && input && input.focus()} // авто-фокус при открытие
					className={cn(st.input, isOpen && st.open)}
					type="text"
					name="search"
					placeholder={placeholder}
					value={value}
					spellCheck={false}
					onChange={setValue}
				/>

				{isOpen && (
					<button className={st.close} onClick={close}>
						<SVG src={cross} />
					</button>
				)}
			</div>
		</Tooltip>
	);
};

export default Search;
