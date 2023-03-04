import { programsService } from 'library/api/programsService';
import React from 'react';

type Props = {
	coachSpecIds: number[];
};

const useSpecs = ({ coachSpecIds }: Props) => {
	const [specs, setSpecs] = React.useState<any[]>([]);

	React.useEffect(() => {
		const getSpecs = async () => {
			if (coachSpecIds.length === 0) return;
			try {
				const response = await programsService.getSpecs();
				setSpecs(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		getSpecs();
	}, [coachSpecIds.length]);

	const buildSpecString = () => {
		if (specs.length === 0 || coachSpecIds.length === 0) return;

		let coachSpecs = [];

		for (const id of coachSpecIds) {
			const spec = specs.find((spec) => spec.pk === id);
			if (spec) coachSpecs.push(spec);
		}

		return coachSpecs.map((spec) => spec.title).join(', ');
	};

	return {
		coachSpecs: buildSpecString(),
	};
};

export default useSpecs;
