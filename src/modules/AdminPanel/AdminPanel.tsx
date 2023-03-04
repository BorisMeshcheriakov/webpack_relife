import { Container } from 'library/components/ui';
import { FC, memo } from 'react';
import { Menu } from './frames';

const AdminPanel: FC = () => {
	return (
		<Container>
			<Menu />
		</Container>
	);
};

export default memo(AdminPanel);
