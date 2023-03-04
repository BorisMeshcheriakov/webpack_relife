/* eslint-disable */
import { useState, useEffect, useRef } from 'react';

import InputText from './frames/InputText';
import ButtonOpenMenu from './frames/ButtonOpenMenu';
import ImageViewer from './frames/ImageViewer';

import Menu from './frames/Menu';
import ButtonAddImage from './frames/ButtonAddImage';

import InputImage from './frames/InputImage';

import st from './index.module.scss';

const TextEditor = ({ blocks, setBlocks }) => {
	const [showButtonMenu, setShowButtonMenu] = useState(true); // меню добавления показать/скрыть
	const [showMenu, setShowMenu] = useState(false); // кнопка "добавить"(+) показать/скрыть
	const [activeItem, setActiveItem] = useState(0);
	const [cursorPosition, setCursorPosition] = useState(0);

	const inputRef = useRef(null);
	const inputImageRef = useRef(null);

	const showAddButton = () => {
		blocks[activeItem] && setShowButtonMenu(!blocks[activeItem]['text']);
	};

	useEffect(() => {
		showAddButton();
		setShowMenu(false);
		if (blocks.length === 0) {
			let newBlocks = [];
			newBlocks.push({ text: '' });
			setBlocks(newBlocks);
		}
	}, [blocks]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.selectionStart = cursorPosition;
			inputRef.current.selectionEnd = cursorPosition;
			inputRef.current.focus();
		}
		showAddButton();
		setShowMenu(false);
	}, [activeItem]);

	return (
		<div className={st.text}>
			<section className={st.workspace}>
				{blocks.map((item, index, arr) => {
					if (item['image']) {
						return (
							<ImageViewer
								key={index}
								image={item.image}
								blocks={arr}
								setBlocks={(data) => setBlocks(data)}
								index={index}
							/>
						);
					} else {
						return (
							<InputText
								inputRef={inputRef}
								key={index}
								index={index}
								setBlocks={setBlocks}
								blocks={arr}
								activeItem={activeItem}
								setActiveItem={(data) => setActiveItem(data)}
								cursorPosition={cursorPosition}
								setCursorPosition={(data) => setCursorPosition(data)}
								menuButton={
									showButtonMenu &&
									activeItem === index && (
										<Menu
											showMenu={showMenu}
											open={
												<ButtonOpenMenu
													showMenu={showMenu}
													setShowMenu={(data) => setShowMenu(data)}
												/>
											}
											addImage={<ButtonAddImage handler={() => inputImageRef.current.click()} />}
										/>
									)
								}
							/>
						);
					}
				})}
			</section>

			{/* невидимый загрузчик изображений */}
			<InputImage
				imageRef={inputImageRef}
				inputRef={inputRef}
				blocks={blocks}
				setBlocks={setBlocks}
				activeItem={activeItem}
				setActiveItem={(data) => setActiveItem(data)}
			/>
		</div>
	);
};

export default TextEditor;
