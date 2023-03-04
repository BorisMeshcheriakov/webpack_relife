import React from 'react';

import styles from './Button.module.scss';

interface Props {
	children: React.ReactNode;
	handler?: () => void;
	style?: any;
	disabled?: boolean;
	className?: any;
	cancel?: any;
	dataTestId?: any;
	type?: string;
}

const Button = ({
	children,
	handler,
	style,
	disabled,
	className,
	cancel,
	dataTestId,
}: Props): JSX.Element => (
	<button
		className={styles.button + ' ' + (cancel ? styles.button__cancel : null) + ' ' + className}
		onClick={handler}
		style={style}
		data-test-id={dataTestId}
		disabled={disabled}
	>
		{children}
	</button>
);

export default Button;
