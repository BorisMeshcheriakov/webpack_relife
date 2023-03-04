import st from './Loader.module.scss';

interface Props {
	text?: string;
}

const Loader = ({ text }: Props) => {
	return (
		<div className={st.loader}>
			<div className={st.spinner} />
			<h3>{text}</h3>
		</div>
	);
};

export default Loader;
