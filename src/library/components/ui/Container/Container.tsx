import React from 'react';

import sharedStyles from 'resources/layout/index.module.scss';

type Props = {
	children?: React.ReactNode | React.ReactNodeArray;
};

const Container: React.FC<Props> = ({ children }) => {
	return <div className={sharedStyles.container}>{children}</div>;
};

export default Container;
