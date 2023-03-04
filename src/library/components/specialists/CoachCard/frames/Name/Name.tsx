import cn from 'classnames';
import { useHistory } from 'react-router-dom';

import st from './Name.module.scss';

type Props = {
	last: string;
	first: string;
	middle: string;
	id: number;
	inModal?: boolean;
};

const Name: React.FC<Props> = ({ last = '', first = '', middle = '', id, inModal }) => {
	const { push } = useHistory();

	const handleNameClick = () => {
		push(`/specialists/specialist/${id}`);
	};

	return (
		<span className={cn(st.name, !inModal && st.active)} onClick={() => handleNameClick()}>
			{`${last} `}
			{`${first} `}
			{`${middle}`}
		</span>
	);
};

export default Name;
