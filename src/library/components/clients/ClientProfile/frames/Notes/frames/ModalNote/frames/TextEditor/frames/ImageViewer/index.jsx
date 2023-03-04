import SVG from 'react-inlinesvg';

import cross from './resources/cross.svg';

import st from './index.module.scss';

const ImageViewer = ({ image, index, blocks, setBlocks }) => {
	const deleteImage = () => {
		let newStructure = [...blocks];
		newStructure.splice(index, 1);
		setBlocks(newStructure);
	};

	return (
		<div className={st.image}>
			<img src={image} alt="" />
			<div className={st.delete} onClick={() => deleteImage()}>
				<SVG alt="delete image" src={cross} className={st.icon} />
			</div>
		</div>
	);
};

export default ImageViewer;
