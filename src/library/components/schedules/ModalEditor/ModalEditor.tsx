import React from 'react';
import cn from 'classnames';

import { useEditor } from 'library/hooks/schedules';

import { ModalLarge } from 'library/components/common';
import { Week } from 'library/components/schedules';
import { Nav, Duration } from './frames';
import { Date, Timezone } from 'library/components/schedules';

import st from './ModalEditor.module.scss';

interface Props {
	close: () => void;
}

const ModalEditor: React.FC<Props> = ({ close }) => {
	const { onClick } = useEditor();

	return (
		<ModalLarge isOpen title="Настройка графика" close={close}>
			<div className={st.wrap}>
				<Nav />

				<section className={st.toolbar}>
					<div className={st.toolbar__item}>
						<Duration />
					</div>
					<div className={cn(st.toolbar__item, st.content_center)}>
						<Date calendar="editor" />
					</div>
					<div className={cn(st.toolbar__item, st.content_end)}>
						<Timezone calendar="editor" />
						{/* <Navigation calendar="editor" /> */}
					</div>
				</section>

				<Week calendar="editor" onClick={onClick} />
			</div>
		</ModalLarge>
	);
};

export default ModalEditor;
