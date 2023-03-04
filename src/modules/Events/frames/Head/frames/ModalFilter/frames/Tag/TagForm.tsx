import { FC } from 'react';
import { Tag } from 'library/models/programs';

import st from './TagForm.module.scss';
import cn from 'classnames';

interface Props {
	item: Tag;
	handler: (tag: Tag) => void;
	selected: boolean;
}

const TagForm: FC<Props> = ({ item, handler, selected }) => {
	return (
		<div className={st.main__tag}>
			<div className={st.checkBox__wrapper}>
				<input
					type="checkBox"
					className={st.checkBox}
					onChange={() => handler(item)}
					checked={selected}
				/>
			</div>
			<p className={cn(st.title, selected && st.active)} onClick={() => handler(item)}>
				{item.title}
			</p>
		</div>
	);
};

export default TagForm;
