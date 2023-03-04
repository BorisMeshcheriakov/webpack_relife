import { useEffect } from 'react';

const useOutsideClick = (refs: any[], handler: () => any) => {
	useEffect(() => {
		function handleClickOutside(event: any) {
			let elements = [];
			for (const ref of refs) {
				if (ref.current && ref.current.contains(event.target)) {
					elements.push(ref);
				}
			}

			if (elements.length === 0) {
				handler();
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [refs, handler]);
};

export default useOutsideClick;
