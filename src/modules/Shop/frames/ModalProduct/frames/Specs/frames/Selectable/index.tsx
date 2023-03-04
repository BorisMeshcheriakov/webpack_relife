import React, { useCallback, useMemo } from 'react';
import qs from 'query-string';
import cn from 'classnames';
import { useLocation, useHistory } from 'react-router-dom';

import { DetailAttribute, DetailStorageItem, SelectableOption } from 'library/models/shop';

import Option from './frames/Option';
import Color from './frames/Color';

import st from './index.module.scss';

type Props = {
	attribute: DetailAttribute;
	showSelectNote: boolean;
	storage: DetailStorageItem[];
	allAttributes: DetailAttribute[];
};

const Selectable = ({ attribute, showSelectNote, storage }: Props) => {
	const { search } = useLocation();
	const { push } = useHistory();
	const params = qs.parse(search);

	const attributes: SelectableOption[] = useMemo(
		() => [...attribute.storage_variations] as SelectableOption[],
		[attribute]
	);

	const onChange = (option: SelectableOption) => {
		let params = qs.parse(search);
		let paramArray = Object.keys(params);
		if (attribute.required) {
			// если атрибут required то при изменении сбрасываем остальные
			params = { [attribute.id]: option.id.toString() };
			push({ search: qs.stringify(params) });
			return;
		}

		// удаляем все последующие атрибуты
		const idx = paramArray.findIndex((param) => param === attribute.id.toString());
		if (idx < paramArray.length - 1 && idx > 0) {
			paramArray = paramArray.slice(idx + 1);
			for (const param of paramArray) {
				delete params[param];
			}
		}

		// если атрибут уже выбран и не совпадает с нажатым значением - изменяем значение
		if (params[attribute.id] && params[attribute.id] !== option.id.toString()) {
			params[attribute.id.toString()] = option.id.toString();

			// если выбран и совпадает - удаляем
		} else if (params[attribute.id] && params[attribute.id] === option.id.toString()) {
			delete params[attribute.id];
			push({ search: qs.stringify(params) });
			return;
		}

		// атрибут не основной и не выбран - добавляем
		if (!params[attribute.id]) {
			params = { ...params, [attribute.id]: option.id.toString() };
		}
		push({ search: qs.stringify(params) });
	};

	const isActive = (option: number) => {
		const params = qs.parse(search);
		return !!params[attribute.id] && params[attribute.id] === option.toString();
	};

	const isOptionDisabled = React.useCallback(
		(option: SelectableOption, storage: DetailStorageItem[], attribute: DetailAttribute) => {
			// выясняем, какие параметры уже выбраны
			let params = qs.parse(search);
			let paramArray = Object.keys(params);

			const idx = paramArray.findIndex((param) => param === attribute.id.toString());

			if (idx !== -1) {
				paramArray = paramArray.slice(idx);
				for (const param of paramArray) {
					delete params[param];
				}
			}

			// console.log(params);
			//  убираем искомое свойство и фильтруем хранилище на оставшиеся
			// delete params[attribute.id];

			// оставляем в хранилище только те товары, которые подходят под выбранные параметры
			let itemStorage = [...storage];
			for (const param in params) {
				itemStorage = itemStorage.filter(
					(item) =>
						item.attributevalue.findIndex(
							(value) =>
								value.attribute.id.toString() === param &&
								value.value.id.toString() === params[param]
						) !== -1
				);
			}

			// теперь проверяем, есть ли в оставшихся товарах искомая опция
			itemStorage = itemStorage.filter(
				(item) =>
					item.attributevalue.findIndex(
						(value) => value.attribute.id === attribute.id && value.value.id === option.id
					) !== -1
			);

			return itemStorage.length === 0;
		},
		[search]
	);

	const isDisabled = React.useCallback(
		(option: SelectableOption, attribute: DetailAttribute, storage: DetailStorageItem[]) => {
			if (attribute.required) {
				// основной атрибут всегда доступен для выбора и не может быть отключен
				return false;
			}

			if (!attribute.required) {
				return isOptionDisabled(option, storage, attribute);
			}

			return false;
		},
		[isOptionDisabled]
	);

	const isHighlighted = useCallback(() => {
		const params = qs.parse(search);
		return !params[attribute.id] && showSelectNote;
	}, [search, attribute.id, showSelectNote]);

	const getButtonType = (option: SelectableOption, type: string) => {
		if (type === 'color') {
			return (
				<Color
					isDisabled={isDisabled(option, attribute, storage)}
					isActive={isActive(option.id)}
					isHighlighted={isHighlighted()}
					option={option}
				/>
			);
		}

		if (type === 'size') {
			return (
				<Option
					isDisabled={isDisabled(option, attribute, storage)}
					isActive={isActive(option.id)}
					isHighlighted={isHighlighted()}
					option={option}
				/>
			);
		}

		return (
			<Option
				isDisabled={isDisabled(option, attribute, storage)}
				isActive={isActive(option.id)}
				isHighlighted={isHighlighted()}
				option={option}
			/>
		);
	};

	React.useEffect(() => {
		// autoselect
		if (attribute.required) {
			return;
		}

		if (params[attribute.id]) {
			return;
		} else if (!params[attribute.id]) {
			let allAttributes = [...attributes];
			let enabledAttributes = [];
			for (let i = 0; i < allAttributes.length; i++) {
				if (!isDisabled(allAttributes[i], attribute, storage)) {
					enabledAttributes.push(allAttributes[i]);
				}
			}
			if (enabledAttributes.length === 1) {
				let newParams = { ...params, [attribute.id]: enabledAttributes[0].id.toString() };
				push({ search: qs.stringify(newParams) });
			}
		}
	}, [params, attribute, attributes, isDisabled, push, storage]);

	return (
		<div className={cn(st.selectable, attribute.type === 'size' && st.withTable)}>
			<div className={st.selectable__title}>{attribute.title}</div>
			<div className={cn(st.selectable__options, attribute.type === 'size' && st.withTable)}>
				{attributes.map((option) => (
					<React.Fragment key={option.id}>
						<input
							type="radio"
							name={option.title}
							value={option.id}
							defaultChecked
							id={`${attribute.id}${option.id}`}
							// onChange={onChange}
						/>
						<label
							htmlFor={`${attribute.id}${option.id}`}
							onClick={() => onChange(option)}
							className={cn(st.label, isDisabled(option, attribute, storage) && st.disabled)}
						>
							{getButtonType(option, attribute.type)}
						</label>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default Selectable;
