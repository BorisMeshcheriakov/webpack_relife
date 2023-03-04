import React from 'react';
import cn from 'classnames';

import { FieldError } from 'react-hook-form';

import st from './ImageInput.module.scss';

type Props = {
	value: FileList | string;
	onChange: (...event: any[]) => void;
	className?: string;
	error: FieldError | undefined;
	[x: string]: any;
};

const ImageInput: React.FC<Props> = ({ value, onChange, className, error }) => {
	const [url, setUrl] = React.useState<string>('');
	const inputRef = React.useRef<HTMLInputElement>(null);

	const onImageChange = (files: FileList) => {
		let image = '';
		if (files && files.length) {
			const file = files.item(0);
			const reader = new FileReader();
			if (file instanceof File) {
				reader.readAsDataURL(file as File);
				reader.onload = () => {
					setUrl(reader.result as any);
				};
			}
		}
		return image;
	};

	const onInputClick = () => {
		inputRef.current?.click();
	};

	const onImage = (e: any) => {
		onChange(e.target.files);
		onImageChange(e.target.files);
	};

	React.useEffect(() => {
		if (value?.length > 0 && value instanceof FileList) {
			onImageChange(value);
		} else if (typeof value === 'string') {
			setUrl(value);
		} else {
			setUrl('/events/emptyImage.png');
		}
	}, [value]);

	return (
		<div className={cn(st.image, error && st.error, className)} onClick={onInputClick}>
			<input
				ref={inputRef}
				accept="image/*"
				type="file"
				onChange={onImage}
				style={{ display: 'none' }}
			/>
			<img src={url} className={st.image__picture} alt="" />
		</div>
	);
};

export default ImageInput;
