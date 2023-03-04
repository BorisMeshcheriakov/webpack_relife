import React from 'react';
import cn from 'classnames';
import SVG from 'react-inlinesvg';
import { Table as TableType } from 'library/models/shop';

import useOutsideClick from 'library/hooks/common/useOutsideClick';

import st from './Table.module.scss';

import triangle from 'resources/icons/shop/triangleDropdown.svg';

type Props = {
	tables: TableType[];
};

const Table: React.FC<Props> = ({ tables }) => {
	const [showList, setShowList] = React.useState<boolean>(false);
	const buttonRef = React.useRef(null);
	const listRef = React.useRef(null);

	const onOutsideClick = () => {
		setShowList(false);
	};

	const onListButtonClick = () => {
		setShowList((showList) => !showList);
	};

	useOutsideClick([buttonRef, listRef], onOutsideClick);
	// debugger;

	return (
		<div className={st.tables}>
			<button className={st.button} ref={buttonRef} onClick={onListButtonClick}>
				<span>Таблица соответствий</span>
				<SVG src={triangle} className={cn(st.icon, showList && st.active)} />
			</button>
			<div className={cn(st.list, showList && st.active)} ref={listRef}>
				{tables.map((table) => (
					<div className={st.table} key={table.id}>
						<h4 className={st.table__title}>{table.title}</h4>
						<table cellSpacing={0} cellPadding={0} className={st.table__table}>
							<tbody>
								{table.table.map((row, index) => (
									<tr
										key={index}
										style={{ fontFamily: `${index === 0 ? 'SFPro-Semibold' : 'SFPro-Regular'}` }}
									>
										{row.map((cell, index) => (
											<td key={index}>{cell}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				))}
			</div>
		</div>
	);
};

export default Table;
