import React from 'react';

import st from './index.module.scss';

/**
 * Кнопка - синий текст
 */

interface Props {
	handler?: () => void;
	text: string;
	disabled?: boolean;
}

const ButtonText: React.FC<Props> = ({ handler, text, disabled }) => {
	return (
		<button className={st.button} onClick={handler} disabled={disabled}>
			{text}
		</button>
	);
};

export default ButtonText;
