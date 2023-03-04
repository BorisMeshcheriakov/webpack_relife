import { useRef, useState } from 'react';
import { CommonImage } from 'library/components/common';
import { DetailImage } from 'library/models/shop';
import Glider, { GliderMethods } from 'react-glider';
import ModalLarge from 'library/components/common/modals/ModalLarge';
import SVG from 'react-inlinesvg';
import arrow from 'resources/icons/shop/arrow.svg';

import 'glider-js/glider.min.css';
import cn from 'classnames';
import st from './Carousel.module.scss';

interface Props {
	images: DetailImage[];
}

interface ExtendedGlide extends GliderMethods {
	slide: number;
}

const Carousel = ({ images }: Props) => {
	const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
	const gliderRef = useRef<ExtendedGlide>(null);
	const modalGliderRef = useRef<GliderMethods>(null);

	return (
		<>
			<Glider
				hasArrows
				rewind
				slidesToShow={1}
				slidesToScroll={1}
				arrows={{ prev: '#buttonPrev', next: '#buttonNext' }}
				className={st.glider}
				exactWidth={256}
				itemWidth={256}
				ref={gliderRef}
			>
				{images.map((img) => (
					<div className={st.wrapper} key={img.id} onClick={() => setIsPreviewOpen(true)}>
						<CommonImage className={st.image} src={img.url} alt="" />
					</div>
				))}
			</Glider>
			{images.length > 1 && (
				<>
					<button className={cn(st.button, st.prev, st.presentation)} id="buttonPrev">
						<SVG src={arrow} className={st.icon} />
					</button>
					<button className={cn(st.button, st.next, st.presentation)} id="buttonNext">
						<SVG src={arrow} className={st.icon} />
					</button>
				</>
			)}

			<ModalLarge isOpen={isPreviewOpen} close={() => setIsPreviewOpen(false)}>
				<div className={st.preview__wrapper}>
					<Glider
						hasArrows
						rewind
						slidesToShow={1}
						slidesToScroll={1}
						scrollToSlide={gliderRef.current?.slide ? gliderRef.current?.slide + 1 : 0}
						ref={modalGliderRef}
						arrows={{ prev: '#modalButtonPrev', next: '#modalButtonNext' }}
						className={st.slideshow}
					>
						{images.map((img) => (
							<div className={st.imgWrapper} key={img.id}>
								<CommonImage className={st.preview__image} src={img.url} alt="" />
							</div>
						))}
					</Glider>
					{images.length > 1 && (
						<>
							<button className={cn(st.button, st.prev, st.previewPrev)} id="modalButtonPrev">
								<SVG src={arrow} className={st.icon} />
							</button>
							<button className={cn(st.button, st.next, st.previewNext)} id="modalButtonNext">
								<SVG src={arrow} className={st.icon} />
							</button>
						</>
					)}
				</div>
			</ModalLarge>
		</>
	);
};

export default Carousel;
