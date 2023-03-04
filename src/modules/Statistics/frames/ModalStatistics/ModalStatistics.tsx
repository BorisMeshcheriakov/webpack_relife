import { Loader, ModalLarge } from 'library/components/common';
import { Graphics, Head, List } from './frames';
import { useStatisticsModal } from 'library/hooks/statistics';
import { FC, memo } from 'react';

import st from './ModalStatistics.module.scss';

const ModalStatistics: FC = () => {
	const { handleClose, status } = useStatisticsModal();
	return (
		<>
			<ModalLarge isOpen title={'Статистика'} close={handleClose}>
				<div className={st.wrapper}>
					<Head />
					{status === 'loading' ? (
						<Loader />
					) : (
						<>
							<Graphics />
							<List />
						</>
					)}
				</div>
			</ModalLarge>
		</>
	);
};

export default memo(ModalStatistics);
