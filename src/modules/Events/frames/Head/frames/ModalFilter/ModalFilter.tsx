import { FC } from 'react';
import { ModalMiddle } from 'library/components/common';
import { useTags } from 'library/hooks/events';
import { Tag } from './frames';

import st from './ModalFilter.module.scss';

interface Props {
	close: () => void;
}

const ModalFilter: FC<Props> = ({ close }) => {
	const tags = useTags();

	return (
		<ModalMiddle isOpen close={close} onRequestClose={close}>
			<div className={st.header}>
				<p className={st.header__title}>Теги</p>
				<button className={st.header__btn} onClick={close}>
					Готово
				</button>
			</div>
			<div className={st.main}>
				{tags.tags.map((item) => (
					<Tag item={item} key={item.pk} handler={tags.onSelect} selected={tags.isSelected(item)} />
				))}
			</div>
		</ModalMiddle>
	);
};

export default ModalFilter;
