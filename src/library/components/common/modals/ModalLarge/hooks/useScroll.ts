import React from 'react';

const useScroll = () => {
	React.useEffect(() => {
		// Lock body scroll on modal mount
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);
	return {};
};

export default useScroll;
