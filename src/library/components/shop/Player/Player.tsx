import { useState } from 'react';
import ModalLarge from 'library/components/common/modals/ModalLarge';

import st from './Player.module.scss';

interface Props {
	isOpen: boolean;
	video: string;
	close: () => void;
}

const Player = ({ isOpen, close, video }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const handleClose = () => {
		setIsLoading(true);
		close();
	};

	return (
		<ModalLarge isOpen={isOpen} close={handleClose}>
			<div className={st.wrapper}>
				{isLoading && (
					<div className={st.loader}>
						<div className={st.spinner} />
					</div>
				)}
				<div className={st.embedContainer}>
					<iframe
						title="boomstream"
						src={`https://play.boomstream.com/${video}?title=0`}
						onLoad={() => setIsLoading(false)}
						allowFullScreen
					/>
				</div>
			</div>
		</ModalLarge>
	);
};

export default Player;
