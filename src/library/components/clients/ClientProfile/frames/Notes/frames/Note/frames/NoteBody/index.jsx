import Text from './frames/Text';
import Image from './frames/Image';

const NoteBody = ({ blocks }) => {
	let blockArr = [...blocks];

	return (
		<>
			{blockArr
				.sort((a, b) => (a.order > b.order ? 1 : -1))
				.map((block, index) => {
					if (block.image) {
						return <Image image={block.image} key={block.id} index={index} />;
					}
					return <Text text={block.text} key={block.id} />;
				})}
		</>
	);
};

export default NoteBody;
