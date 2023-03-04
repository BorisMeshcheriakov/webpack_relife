import React from 'react';

import { MenuBase } from 'library/components/schedules';
import { useBuyerMenu, useSellerMenu } from 'library/hooks/schedules';
import { useModulePermissions } from 'library/hooks/module';
import { Consultation } from 'library/models/schedules';

type Props = {
	consultation: Consultation;
};

const Menu: React.FC<Props> = ({ consultation }) => {
	const { can_sell } = useModulePermissions();
	const buyerMenu = useBuyerMenu({ consultation });
	const sellerMenu = useSellerMenu({ consultation });

	return (
		<MenuBase
			buttonId="consultation-menu-button"
			menuId="consultation-menu"
			items={can_sell ? sellerMenu.actions : buyerMenu.actions}
		/>
	);
};

export default Menu;
