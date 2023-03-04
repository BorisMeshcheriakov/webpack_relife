import { useRef, useEffect, useState, useCallback } from 'react';

export function useOutsideAlerter(ref, handler) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				handler();
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, handler]);
}

export function useStateCallback(initialState) {
	const [state, setState] = useState(initialState);
	const cbRef = useRef(null); // mutable ref to store current callback

	const setStateCallback = useCallback((state, cb) => {
		cbRef.current = cb; // store passed callback to ref
		setState(state);
	}, []);

	useEffect(() => {
		// cb.current is `null` on initial render, so we only execute cb on state *updates*
		if (cbRef.current) {
			cbRef.current(state);
			cbRef.current = null; // reset callback after execution
		}
	}, [state]);

	return [state, setStateCallback];
}

// export function useLazyEffect(effect, deps = [], wait = 300) {
//   const cleanUp = useRef();
//   const effectRef = useRef();
//   const updatedEffect = useCallback(effect, deps);
//   effectRef.current = updatedEffect;
//   const lazyEffect = useCallback(
//     _.debounce(() => {
//       cleanUp.current = effectRef.current();
//     }, wait),
//     [],
//   );
//   useEffect(lazyEffect, deps);
//   useEffect(() => {
//     return () => {
//       typeof cleanUp.current == 'function'? cleanUp.current() : null;
//     };
//   }, []);
// }

export function useDebounce(value, delay) {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(
		() => {
			// Set debouncedValue to value (passed in) after the specified delay
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);

			// Return a cleanup function that will be called every time ...
			// ... useEffect is re-called. useEffect will only be re-called ...
			// ... if value changes (see the inputs array below).
			// This is how we prevent debouncedValue from changing if value is ...
			// ... changed within the delay period. Timeout gets cleared and restarted.
			// To put it in context, if the user is typing within our app's ...
			// ... search box, we don't want the debouncedValue to update until ...
			// ... they've stopped typing for more than 500ms.
			return () => {
				clearTimeout(handler);
			};
		},
		// Only re-call effect if value changes
		// You could also add the "delay" var to inputs array if you ...
		// ... need to be able to change that dynamically.
		[value, delay]
	);

	return debouncedValue;
}

export function useOnScreen(ref) {
	/****
   * хук проверяет, находится ли компонент в видимой области экрана
   * (например, видна ли карточка во время скролла списка карточек)
   * принимает реф на проверяемый компонент, возвращает boolean
   * 
   * пример:
     const DummyComponent = () => {
  
        const ref = useRef()
        const isVisible = useOnScreen(ref)
        
        return <div ref={ref}>{isVisible && `Yep, I'm on screen`}</div>
      }
   */

	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
		observer.observe(ref.current);
		// Remove the observer as soon as the component is unmounted
		return () => {
			observer.disconnect();
		};
	}, [ref]);

	return isIntersecting;
}
