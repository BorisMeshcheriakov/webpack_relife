import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import App from './App';

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
