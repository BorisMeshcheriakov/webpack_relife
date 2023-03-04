import { FC, memo } from 'react';
import { ProgramList } from 'library/models/programs';
import { Description } from './frames';
import { icons } from 'resources/icons/events/EventDescription/index';
import { numberWithSeparator } from 'library/helpers/common/strings';
import { useModulePermissions } from 'library/hooks/module';

interface Props {
	program: ProgramList;
	type: 'cost';
	isAuthor: boolean;
}

const ProgramDescription: FC<Props> = ({ program, type, isAuthor }) => {
	const { can_sell, can_buy } = useModulePermissions();

	const getCostNumber = () => {
		if (isAuthor) return `${program.cost / 100} / ${program.cost_coach / 100}`;

		if (can_sell && !isAuthor) return `${program.cost_coach / 100}`;

		if (can_buy) return `${program.cost / 100}`;
		else return `${program.cost / 100}`;
	};

	return (
		<>
			{type === 'cost' && program.cost && (
				<Description title={`${numberWithSeparator(getCostNumber())} руб`} svg={icons.cost} />
			)}
		</>
	);
};

export default memo(ProgramDescription);
