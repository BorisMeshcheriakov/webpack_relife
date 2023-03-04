import SVG from 'react-inlinesvg';

import shareIcon from 'resources/icons/shop/share.svg';

import st from './index.module.scss';

const Presentation = ({ presentation }) => {
	return (
		<a className={st.container} href={presentation} target="_blank" rel="noreferrer">
			<div className={st.title}>Смотреть презентацию</div>
			<SVG src={shareIcon} className={st.icon} alt="" />
		</a>
	);
};

export default Presentation;
