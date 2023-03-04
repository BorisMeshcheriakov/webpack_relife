import { useState, useCallback } from 'react';
import cn from 'classnames';

import st from './Avatar.module.scss';

type Props = {
	image: string | null;
};

const Avatar: React.FC<Props> = ({ image }) => {
	const [loading, setLoading] = useState(true);

	const onLoad = useCallback(() => setLoading(false), []);

	const hasImage = (image: string | null) => image && image !== null;

	return (
		<>
			{hasImage(image) && loading && <div className={st.loader} />}
			{image ? (
				<img
					alt=""
					className={cn(st.avatar, loading && st.hidden)}
					src={image ?? ''}
					onLoad={onLoad}
				/>
			) : (
				<div className={st.blank} />
			)}
		</>
	);
};

export default Avatar;
