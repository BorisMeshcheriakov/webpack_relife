import { useState, useRef } from 'react';
import cn from 'classnames';
import { CdekCity } from 'library/models/delivery';

import useDebounce from 'library/hooks/common/useDebounce';

import st from './CitySelect.module.scss';

interface Props {
	citySearch: string;
	onSearchChange: (e: string) => void;
	cities: CdekCity[];
	selected: CdekCity;
	onChange: (city: CdekCity) => void;
	error: any;
	setCity: (city: CdekCity) => void;
}

const CitySelect = ({
	citySearch,
	onSearchChange,
	cities,
	selected,
	onChange,
	error,
	setCity,
}: Props) => {
	const [showSearch, setShowSearch] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const debouncedInput = useDebounce((value) => onSearchChange(value), citySearch);

	const handleSelect = (city: CdekCity) => {
		onChange(city);
		setShowSearch(false);
		setCity(city);
	};

	const handleShowSearch = () => {
		setShowSearch(true);
		setTimeout(() => {
			inputRef.current?.focus();
		}, 200);
	};

	return (
		<div className={cn(st.search, error && st.error)}>
			<label htmlFor="city" className={st.label}>
				Город
			</label>
			{/* <SVG src={icons.arrow} className={st.icon} /> */}

			{showSearch ? (
				<>
					<input
						className={st.input}
						type="text"
						id="city"
						placeholder="Выберите город получателя"
						value={debouncedInput.value}
						onChange={(e) => debouncedInput.handleChange(e.target.value)}
						onBlur={() => setShowSearch(false)}
						autoComplete="new-password"
						ref={inputRef}
					/>
				</>
			) : (
				<button className={st.button} type="button" onClick={() => handleShowSearch()}>
					{selected.id ? selected.title : 'Выберите город получателя'}
				</button>
			)}

			<ul className={cn(st.list, !showSearch && st.hidden)}>
				{cities.map((city) => (
					<li key={city.id} onMouseDown={() => handleSelect(city)}>
						{city.title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CitySelect;
