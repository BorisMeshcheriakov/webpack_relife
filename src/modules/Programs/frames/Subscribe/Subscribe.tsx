import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useModuleSettings } from 'library/hooks/module';
import { getCookie, setCookie } from '../../../../setupCookie';

const Subscribe = () => {
	const { push } = useHistory();
	const { code, pk } = useParams<{ code: string; pk: string }>();
	const { locationRoot } = useModuleSettings();

	const hashcode = getCookie('subscribe_hash');

	React.useEffect(() => {
		const subscribe = () => {
			if (code) {
				setCookie('subscribe_hash', JSON.stringify({ hashcode: code, program: pk }));
			}
			push(`/${locationRoot}/program/${pk}`);
		};

		if (code) subscribe();
	}, [code, pk, locationRoot, push, hashcode]);

	return <></>;
};

export default Subscribe;
