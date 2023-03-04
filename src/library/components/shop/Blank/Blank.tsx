import st from './Blank.module.scss';

import thinking from 'resources/icons/shop/thinking.svg';

interface Props {
	text: string;
}

const Blank = ({ text }: Props) => {
	return (
		<div className={st.blank}>
			<img alt="" src={thinking} className={st.blank__icon} />
			<span className={st.blank__text}>{text}</span>
		</div>
	);
};

export default Blank;
