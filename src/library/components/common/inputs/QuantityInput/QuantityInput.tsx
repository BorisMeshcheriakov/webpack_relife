import React, { Reducer } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';

import { Add, Remove } from '@mui/icons-material';

import st from './QuantityInput.module.scss';

type Props = {
	value: string;
	setValue: (value: string) => void;
	maxQuantity?: number;
	defaultValue?: string;
};

enum Action {
	PLUS = 'PLUS',
	MINUS = 'MINUS',
	INPUT = 'INPUT',
}

interface CountAction {
	type: Action;
	payload?: string;
}

type State = {
	count: string | undefined;
};

const QuantityInput: React.FC<Props> = ({
	maxQuantity = Infinity,
	value = '0',
	setValue,
	defaultValue = '1',
}) => {
	const reducer: Reducer<State, CountAction> = (state, action) => {
		let count = state.count ? parseInt(state.count) : 0;

		if (count >= maxQuantity) {
			count = maxQuantity - 1;
		}

		switch (action.type) {
			case Action.PLUS:
				return {
					...state,
					count: (count + 1).toString(),
				};
			case Action.MINUS:
				return {
					...state,
					count: count > 0 ? (count - 1).toString() : '0',
				};
			case Action.INPUT:
				return {
					...state,
					count: action.payload,
				};
			default: {
				return state;
			}
		}
	};

	const [state, dispatch] = React.useReducer(reducer, {
		count: value,
	});

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		let quantity = e.target.value ? parseInt(e.target.value) : '0';
		if (quantity > maxQuantity) {
			quantity = maxQuantity;
		}
		dispatch({ type: Action.INPUT, payload: quantity.toString() });
	};

	React.useEffect(() => {
		state.count && setValue(state.count);
	}, [state.count, setValue]);

	React.useEffect(() => {
		value === defaultValue && dispatch({ type: Action.INPUT, payload: defaultValue });
	}, [value, defaultValue]);

	return (
		<TextField
			size="small"
			value={state.count}
			onChange={handleChange}
			type="number"
			InputProps={{
				inputProps: { min: 0, max: maxQuantity, className: st.input },
				startAdornment: (
					<InputAdornment position="start">
						<IconButton onClick={() => dispatch({ type: Action.MINUS })}>
							<Remove />
						</IconButton>
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={() => dispatch({ type: Action.PLUS })}>
							<Add />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default QuantityInput;
