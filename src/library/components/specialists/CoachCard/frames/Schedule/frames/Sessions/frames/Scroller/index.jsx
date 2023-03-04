import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

import ButtonSession from './frames/ButtonSession';
import ButtonArrow from './frames/ButtonArrow';

import st from './index.module.scss';

const Scroller = ({ sessions, onSessionClick, quantity }) => {
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(quantity);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		setStart(0);
		setEnd(calculateQuantity(quantity));
		/* eslint-disable-next-line */
	}, [sessions]);

	function calculateQuantity(quantity) {
		return quantity <= sessions.length ? quantity - 1 : quantity;
	}

	const handleScroll = (direction) => {
		if (direction === 'forward') {
			setIndex(index + 1);
			setStart(end);

			if (end + quantity < sessions.length) {
				setEnd(end + quantity - 2);
			}

			if (end + quantity >= sessions.length) {
				setEnd(end + quantity - 1);
			}
		}

		if (direction === 'backward') {
			setIndex(index - 1);

			if (start - quantity > quantity) {
				setEnd(start);
				setStart(start - quantity + 2);
			}

			if (start - quantity <= quantity && start - quantity > 0) {
				setEnd(start);
				setStart(start - quantity + 2);
			}

			if (start - quantity <= 0) {
				setStart(0);
				setEnd(quantity - 1);
			}
		}
	};

	const showForwardBtn = () => {
		return end < sessions.length && quantity < sessions.length;
	};

	const showBackwardBtn = () => {
		return start > 0 && quantity < sessions.length;
	};

	return (
		<div className={st.scroller}>
			{showBackwardBtn() && (
				<ButtonArrow direction={'left'} handler={() => handleScroll('backward')} />
			)}
			{sessions.slice(start, end).map((session) => (
				<ButtonSession
					key={session.id}
					startTime={DateTime.fromISO(session.start_time)}
					handler={() => onSessionClick(session)}
				/>
			))}
			{showForwardBtn() && <ButtonArrow handler={() => handleScroll('forward')} />}
		</div>
	);
};

export default Scroller;
