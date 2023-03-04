import React from 'react';
import Block from './frames/Block';

import placeholderImg1 from './resources/1.jpeg';
import placeholderImg2 from './resources/2.jpeg';

import styles from './CustomBlocks.module.scss';

const CustomBlocks = (props) => {
	return (
		<div className={styles.wrapper}>
			{props.custom &&
				props.custom.map((block, index) => (
					<div className={styles.block} key={index}>
						<Block
							title={block.title}
							description={block.subtitle}
							text={block.description}
							image={block.image}
							isReversed={!index === 0 || index % 2}
						/>
					</div>
				))}
		</div>
	);
};

export default CustomBlocks;
