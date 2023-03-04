import { ChangeEvent, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import useDebounce from 'library/hooks/common/useDebounce';

import st from './Quantity.module.scss';

import minus from 'resources/icons/shop/minus.svg';
import plus from 'resources/icons/shop/plus.svg';

interface Props {
	value: string;
	setValue: (value: string) => void;
	maxQuantity: number;
}

const Quantity: React.FC<Props> = ({ value, setValue, maxQuantity }) => {
	const debouncedInput = useDebounce((value) => setValue(value), value);

	const handleBlur = () => {
		(!debouncedInput.value || debouncedInput.value === '0') && debouncedInput.handleChange('1');
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const quantityValue = e.target.value;
		debouncedInput.handleChange(quantityValue);
	};

	const onIncrement = () => {
		let quantityValue: number = parseInt(debouncedInput.value);
		if (quantityValue < maxQuantity) {
			debouncedInput.handleChange((quantityValue + 1).toString());
		}
	};

	const onDecrement = () => {
		let quantityValue: number = parseInt(debouncedInput.value);
		if (quantityValue && quantityValue > 0) {
			debouncedInput.handleChange((quantityValue - 1).toString());
		}
	};

	useEffect(() => {
		if (maxQuantity && maxQuantity < Infinity && parseInt(value) > maxQuantity)
			debouncedInput.handleChange(maxQuantity.toString());
	}, [maxQuantity, debouncedInput, value]);

	return (
		<div className={st.quantity}>
			<div className={st.quantity__text}>Количество</div>
			<div className={st.quantity__wrapper} onBlur={handleBlur}>
				<button className={st.quantity__button} onClick={onDecrement}>
					<SVG src={minus} />
				</button>
				<input
					className={st.quantity__input}
					type="number"
					value={debouncedInput.value}
					onChange={handleChange}
				/>
				<button className={st.quantity__button} onClick={onIncrement}>
					<SVG src={plus} />
				</button>
			</div>
		</div>
	);
};

export default Quantity;
