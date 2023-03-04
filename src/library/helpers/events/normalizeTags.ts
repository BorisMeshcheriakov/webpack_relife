import { Tag } from 'library/models/programs';

const normalizeTags = (tags: Tag[], selected: number[]): Tag[] => {
	return selected.map((pk) => {
		const idx = tags.findIndex((tag) => tag.pk === pk);
		return { ...tags[idx] };
	});
};

export default normalizeTags;
