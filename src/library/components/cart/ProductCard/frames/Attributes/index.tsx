import React from 'react';
import { Attribute } from 'library/types/cart';

import st from './index.module.scss';

interface Props {
	attributes: Attribute[];
}

const Attributes: React.FC<Props> = ({ attributes }) => {
	return (
		<>
			{attributes.map((attribute) => {
				if (attribute.type === 'color') {
					return (
						<div className={st.attribute} key={attribute.id}>
							<div className={st.attribute__title}>{attribute.title}:</div>
							<div className={st.color} style={{ border: `1px solid #${attribute.value}` }}>
								<div
									className={st.color__background}
									style={{ backgroundColor: `#${attribute.value}` }}
								></div>
							</div>
						</div>
					);
				}

				if (attribute.type === 'size') {
					return (
						<div className={st.attribute} key={attribute.id}>
							<div className={st.attribute__title}>{attribute.title}:</div>
							<div className={st.attribute__value}>{attribute.value}</div>
						</div>
					);
				}

				return (
					<div className={st.attribute} key={attribute.id}>
						<div className={st.attribute__title}>{attribute.title}:</div>
						<div className={st.attribute__value}>{attribute.value}</div>
					</div>
				);
			})}
		</>
	);
};

export default Attributes;
