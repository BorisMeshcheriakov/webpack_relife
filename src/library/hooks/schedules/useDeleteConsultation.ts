import { schedulesService } from 'library/api/schedulesService';

const useDeleteConsultation = () => {
	const deleteConsultation = async (id: any) => {
		try {
			schedulesService.deleteConsultation(id);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		deleteConsultation,
	};
};

export default useDeleteConsultation;
