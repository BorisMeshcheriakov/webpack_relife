import React from 'react';
import type { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { ProgramVideo } from 'library/models/video';

import { Video } from 'library/components/programs';

type Props = {
	id: number;
	text: string;
	index: number;
	periodicity: boolean;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
	video: ProgramVideo;
};

interface DragItem {
	index: number;
	id: string;
	type: string;
}

const style = {
	cursor: 'move',
	width: 276,
	height: 197,
};

const ItemTypes = {
	CARD: 'card',
};

const DraggableCard: React.FC<Props> = ({ id, text, index, moveCard, periodicity, video }) => {
	const { push } = useHistory();
	const { url } = useRouteMatch();
	const ref = React.useRef<HTMLDivElement>(null);

	const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
		accept: ItemTypes.CARD,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			// Get vertical middle
			const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

			// Determine mouse position
			const clientOffset = monitor.getClientOffset();

			// Get pixels to the top
			const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
				return;
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
				return;
			}

			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: () => {
			return { id, index };
		},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
		<div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
			<Video
				mode="view"
				video={video}
				videoType="video"
				periodicity={periodicity}
				onPlay={() => push(`${url}/video/${id}`)}
			/>
		</div>
	);
};

export default DraggableCard;
