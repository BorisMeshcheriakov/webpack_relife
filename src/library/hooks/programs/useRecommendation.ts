import { selectProgram, selectRecommendation, setRecommendation } from 'library/redux/programs';
import { Recommendation } from 'library/types/programs';
import { useAppDispatch, useAppSelector } from '../common';

const useRecommendation = () => {
	const dispatch = useAppDispatch();
	const program = useAppSelector(selectProgram);
	const recommendation = useAppSelector(selectRecommendation);

	const changeRecommendation = (recommendation: Recommendation | null) => {
		dispatch(setRecommendation(recommendation));
	};

	return {
		recommendation,
		changeRecommendation,
		program,
	};
};

export default useRecommendation;
