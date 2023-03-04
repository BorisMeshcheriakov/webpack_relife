import React from 'react';
import cn from 'classnames';

import st from './CommonImage.module.scss';

type Props = {
	alt?: string;
	style?: any;
	[props: string]: any;
};

const CommonImage: React.FC<Props> = ({ alt, style, ...props }) => {
	const [showLoader, setShowLoader] = React.useState<boolean>(true);

	return (
		<div className={st.wrapper}>
			{showLoader && <div className={st.loader} />}
			<img
				className={cn(st.image, style)}
				alt={alt}
				onLoad={() => setShowLoader(false)}
				{...props}
			/>
		</div>
	);
};

export default CommonImage;
