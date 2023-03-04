import React from 'react';

import { Avatar } from '@mui/material';

type Props = {
	onChange: (...event: any[]) => void;
	value: File | string | null;
	error: boolean;
};

const ImageUpload: React.FC<Props> = ({ onChange, value, error }) => {
	const [image, setImage] = React.useState<string | null>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const onInputClick = () => {
		inputRef.current?.click();
	};

	React.useEffect(() => {
		if (typeof value === 'string') {
			setImage(value);
		} else if (value instanceof File) {
			const file = value;
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setImage(reader.result as string);
			};
		} else if (value === null) {
			setImage(null);
		}
	}, [value]);

	return (
		<div onClick={onInputClick} style={{ alignSelf: 'center', cursor: 'pointer' }}>
			<input
				type="file"
				onChange={(e) => onChange(e.target.files?.length ? e.target.files[0] : null)}
				accept="image/*"
				style={{ display: 'none' }}
				ref={inputRef}
			/>
			<Avatar
				src={image ?? ''}
				sx={{ width: 120, height: 120, bgcolor: error ? '#d0021b' : '' }}
			></Avatar>
		</div>
	);
};

export default ImageUpload;
