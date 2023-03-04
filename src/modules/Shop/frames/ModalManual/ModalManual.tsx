import { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Player } from 'library/components/shop';

const ModalManual: FC = () => {
	const { push } = useHistory();
	const params = useParams<{ tab: string }>();
	const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(true);

	const onClose = () => {
		setIsPlayerOpen(false);
		push(`/store/${params.tab}`);
	};

	return (
		<>
			<Player isOpen={isPlayerOpen} close={onClose} video={'FMmV9wmc'} />
		</>
	);
};

export default ModalManual;
