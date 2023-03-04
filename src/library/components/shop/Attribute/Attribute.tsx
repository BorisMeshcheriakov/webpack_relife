import React from 'react';

import st from './Attribute.module.scss';

type Props = {
	attribute: any;
};

const Attribute: React.FC<Props> = ({ attribute }) => {
	return (
		<div className={st.root}>
			<span>{attribute.attribute.title}:</span>
			{attribute.attribute.type === 'color' ? (
				<div
					className={st.color}
					style={{
						borderColor: '#' + attribute.value.code,
						backgroundColor: '#' + attribute.value.code,
					}}
				/>
			) : (
				<span>{attribute.value.title}</span>
			)}
		</div>
	);
};

export default Attribute;
