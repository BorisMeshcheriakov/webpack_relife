import { BntType } from 'library/types/statistics';
import { FC, memo } from 'react';
import { default as icons } from 'resources/icons/statistics/icons';

import SVG from 'react-inlinesvg';
import st from './StatisticsButtons.module.scss';

interface Props {
	disableBtn: (type: BntType, distance?: number) => boolean;
	handlerButton: (type: BntType) => void;
}

const StatisticsButtons: FC<Props> = ({ disableBtn, handlerButton }) => {
	return (
		<div className={st.buttons}>
			<button disabled={!disableBtn('rem')} onClick={() => handlerButton('rem')} className={st.btn}>
				<SVG src={icons.left} />
			</button>

			<button disabled={disableBtn('add')} onClick={() => handlerButton('add')} className={st.btn}>
				<SVG src={icons.right} />
			</button>
		</div>
	);
};

export default memo(StatisticsButtons);
