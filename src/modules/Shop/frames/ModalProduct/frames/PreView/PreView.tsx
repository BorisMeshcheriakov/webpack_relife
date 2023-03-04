import { FC, useState } from 'react';
import { DetailImage } from 'library/models/shop';
import { CommonImage } from 'library/components/common';
import { Player, Carousel } from 'library/components/shop';

import triangle from 'resources/icons/shop/triangle.svg';
import SVG from 'react-inlinesvg';

import st from './PreView.module.scss';

interface Props {
	promoImage: string;
	images: DetailImage[];
	video: string;
}

const PreView: FC<Props> = ({ promoImage, images, video }) => {
	const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);

	return (
		<div className={st.image}>
			{images.length > 0 ? (
				<Carousel images={images} />
			) : (
				<CommonImage className={st.image__promo} src={promoImage} alt="" />
			)}

			{video && (
				<button className={st.video} onClick={() => setIsPlayerOpen(true)}>
					<SVG src={triangle} />
					<span>ВИДЕО</span>
				</button>
			)}
			<Player isOpen={isPlayerOpen} close={() => setIsPlayerOpen(false)} video={video} />
		</div>
	);
};

export default PreView;
