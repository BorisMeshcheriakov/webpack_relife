import React from 'react';

type Props = {
	duration: number;
	daysLeft: number;
};

const CircularProgress: React.FC<Props> = ({ duration, daysLeft }) => {
	return (
		<div>
			<span>Остаток дней </span>
			<span>{daysLeft}</span>
		</div>
	);
};

export default CircularProgress;
