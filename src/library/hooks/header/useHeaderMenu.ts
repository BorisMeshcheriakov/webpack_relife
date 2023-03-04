import { useLayoutEffect, useState } from 'react';

const useHeaderMenu = () => {
	const [showMobile, setShowMobile] = useState<boolean>(false);

	useLayoutEffect(() => {
		const updateSize = () => {
			if (window.innerWidth <= 1024) {
				setShowMobile(true);
			} else {
				setShowMobile(false);
			}
		};
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, [showMobile]);
	return { showMobile };
};

export default useHeaderMenu;
