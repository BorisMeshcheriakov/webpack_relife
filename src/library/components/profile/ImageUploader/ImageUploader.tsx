import React from 'react';
import SVG from 'react-inlinesvg';

import st from './ImageUploader.module.scss';

import { icons } from 'resources/icons/profile';

interface Props {
	empty: any;
	url: string | null | undefined;
	register: any;
	preview: string | ArrayBuffer | null;
}

const ImageUploader: React.FC<Props> = ({ empty, url, register, preview }) => {
	const showImage = () => {
		if (!url && !preview) {
			return empty;
		}

		if (preview) {
			return preview;
		}

		if (url) {
			return url;
		}
	};

	return (
		<label htmlFor="file" className={st.label}>
			<input type="file" id="file" className={st.input} {...register} />
			<img className={st.image} src={showImage()} alt="" />
			<div className={st.upload}>
				<div className={st.upload__circle}>
					<SVG src={icons.downloads} />
				</div>
			</div>
		</label>
	);
};

export default ImageUploader;
