import React from 'react';
import { DetailAttribute, DetailStorageItem } from 'library/models/shop';

import Selectable from './frames/Selectable';
import Text from './frames/Text';

type Props = {
	attributes: DetailAttribute[];
	showSelectNote: boolean;
	storage: DetailStorageItem[];
};

const Specs: React.FC<Props> = ({ attributes, showSelectNote, storage }: Props) => {
	return (
		<>
			{attributes.map((attr: DetailAttribute, idx) => {
				if (attr.type === 'color' || attr.type === 'size' || attr.type === 'option') {
					return (
						<Selectable
							attribute={attr}
							key={attr.id}
							showSelectNote={showSelectNote}
							storage={storage}
							allAttributes={attributes}
						/>
					);
				}

				if (attr.type === 'text') {
					return <Text key={attr.id} text={attr} />;
				}

				return <div key={attr.id}>{attr.title}</div>;
			})}
		</>
	);
};

export default Specs;
