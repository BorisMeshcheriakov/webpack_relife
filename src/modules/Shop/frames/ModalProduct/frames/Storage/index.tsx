import st from './index.module.scss';

interface Props {
	quantity: number;
	attributesSelected: boolean;
}

const Storage = ({ quantity, attributesSelected }: Props) => {
	const isQuantityVisible = () => {
		return quantity > 0 && attributesSelected;
	};

	const getQuantityString = () => {
		return `Доступно ${quantity} ед.`;
	};

	return (
		<div className={st.storage}>
			{isQuantityVisible() && <span style={{ color: '#616f82' }}>{getQuantityString()}</span>}
		</div>
	);
};

export default Storage;
