import { useState, useRef } from 'react';
import cn from 'classnames';
import SVG from 'react-inlinesvg';
import { CDEKPickupPoint } from 'library/models/delivery';

import useOutsideClick from 'library/hooks/common/useOutsideClick';

import st from './PointSelect.module.scss';

import { icons } from 'resources/icons/cart';

interface Props {
	points: CDEKPickupPoint[];
	selected: CDEKPickupPoint;
	onChange: (point: CDEKPickupPoint) => void;
	error: any;
	savePoint: (point: CDEKPickupPoint) => void;
}

const PointSelect = ({ points, selected, onChange, error, savePoint }: Props) => {
	const [showList, setShowList] = useState<boolean>(false);

	const buttonRef = useRef(null);
	const listRef = useRef(null);

	const handleOusideClick = () => {
		setShowList(false);
	};

	useOutsideClick([buttonRef, listRef], handleOusideClick);

	const handleSelect = (point: CDEKPickupPoint) => {
		onChange(point);
		savePoint(point);
		setShowList(false);
	};

	return (
		<div className={cn(st.point, error && st.error)}>
			<label htmlFor="point" className={st.label}>
				Пункт выдачи
			</label>
			<SVG src={icons.arrow} className={st.icon} />
			<button
				id="point"
				type="button"
				className={st.button}
				onClick={() => setShowList(true)}
				ref={buttonRef}
			>
				{selected.id ? selected.address : 'Выберите пункт выдачи'}
			</button>
			<ul className={cn(st.list, !showList && st.hidden)} ref={listRef}>
				{points.map((point) => (
					<li key={point.id} onMouseDown={() => handleSelect(point)}>
						{point.address}
					</li>
				))}
			</ul>
		</div>
	);
};

export default PointSelect;
