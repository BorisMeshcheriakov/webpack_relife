import React from 'react';
import cn from 'classnames';

import st from './ImageUploader.module.scss';
import { useFormContext } from 'react-hook-form';

type Props = {
	fieldName: `${string}` | `${string}.${string}` | `${string}.${number}`;
	className?: string;
};

const ImageInput: React.FC<Props> = ({ fieldName, className }) => {
	const [url, setUrl] = React.useState<string>('');

	const {
		register,
		formState: { errors },
		getValues,
	} = useFormContext();

	const onImageChange = (files: FileList) => {
		if (files.length) {
			const file = files.item(0);
			const reader = new FileReader();
			if (file instanceof File) {
				reader.readAsDataURL(file as File);
				reader.onload = () => {
					setUrl(reader.result as string);
				};
			}
		}
	};

	const eventImage: string | FileList = getValues(fieldName);

	const image = React.useCallback(() => {
		let image = '/events/emptyImage.png';
		if (url.length) {
			image = url;
		} else if (eventImage && !(eventImage instanceof FileList)) {
			image = eventImage;
		}
		return image;
	}, [eventImage, url]);

	return (
		<div className={cn(st.uploader, className)}>
			<label htmlFor={fieldName}>
				<input
					type="file"
					id={fieldName}
					className={st.input}
					{...register(fieldName, {
						onChange: (e) => onImageChange(e.target.files),
					})}
				/>
				<img
					className={cn(
						st.image,
						(url || (eventImage && !(eventImage instanceof FileList))) && st.selected
					)}
					src={image()}
					alt=""
				/>
			</label>
		</div>
	);
};

export default ImageInput;
