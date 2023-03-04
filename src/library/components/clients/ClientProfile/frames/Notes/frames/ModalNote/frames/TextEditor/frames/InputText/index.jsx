import cn from 'classnames';

import { TextareaAutosize } from '@mui/material';

import st from './index.module.scss';

const InputText = ({
	inputRef,
	blocks,
	setBlocks,
	index,
	activeItem,
	setActiveItem,
	setCursorPosition,
	menuButton,
}) => {
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleEnter(e);
		}

		if (e.key === 'Backspace') {
			handleBackspace(e);
		}

		if (e.key === 'ArrowUp') {
			handleArrowUp(e);
		}

		if (e.key === 'ArrowDown') {
			handleArrowDown(e);
		}
	};

	const handleEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let newText = [...blocks];
		let value = e.target.value;

		let cursorPosition = e.target.selectionStart;
		let selectionEnd = e.target.selectionEnd;

		let textToSave = value.slice(0, cursorPosition);

		newText[index]['text'] = textToSave;
		let textToMove = value.slice(selectionEnd);
		newText.splice(index + 1, 0, { text: textToMove });

		setBlocks(newText);
		setActiveItem(index + 1);
		setCursorPosition(0);

		// setText(newText);
	};

	const handleBackspace = (e) => {
		/**
		 * при нажатии на Backspace по умолчанию стирается текст
		 * но если позиция курсора достигла 0 во время стирания (начало строки)
		 * и строка не является первой
		 * то строка удалятся, а ее значение переносится в предыдущую
		 */

		if (e.target.selectionStart === 0 && e.target.selectionEnd === 0 && index > 0) {
			e.preventDefault();
			e.stopPropagation();

			setCursorPosition(blocks[index - 1]['text'].length);
			let newStructure = [...blocks];
			let text = newStructure[index]['text'];
			newStructure[index - 1]['text'] = blocks[index - 1]['text'] + text;
			newStructure.splice(index, 1);
			setBlocks(newStructure);
			setActiveItem(activeItem - 1);
		}
	};

	const handleArrowUp = (e) => {
		if (e.target.selectionStart === 0) {
			e.preventDefault();
			e.stopPropagation();
			if (activeItem !== 0) {
				setCursorPosition(e.target.selectionStart);
				setActiveItem(activeItem - 1);
			} else {
				setCursorPosition(0);
			}
		}
	};

	const handleArrowDown = (e) => {
		if (e.target.selectionStart === blocks[index]['text'].length) {
			e.preventDefault();
			e.stopPropagation();
			if (activeItem !== blocks.length - 1) {
				setActiveItem(activeItem + 1);
				setCursorPosition(0);
			}
		}
	};

	const handleTextChange = (e) => {
		let newText = [...blocks];
		newText[index]['text'] = e.target.value;
		setBlocks(newText);
	};

	const handleInputClick = (e) => {
		setActiveItem(index);
		setCursorPosition(e.target.selectionStart);
	};

	// useEffect(() => {
	//   autosize(document.querySelectorAll('textarea'));
	// }, [blocks[index]['text']])

	return (
		<div className={st.block}>
			{menuButton}
			<TextareaAutosize
				className={cn(st.text, index === activeItem && st.text_active)}
				onKeyDown={(e) => handleKeyDown(e)}
				onChange={(e) => handleTextChange(e)}
				onClick={(e) => handleInputClick(e)}
				value={blocks[index]['text']}
				ref={index === activeItem ? inputRef : null}
				// variant="standard"
				// InputProps={{
				// 	disableUnderline: true,
				// }}
			/>
		</div>
	);
};

export default InputText;
