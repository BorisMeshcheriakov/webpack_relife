import React from 'react';
import ReactDOM from 'react-dom';
import { store } from 'core/redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import App from 'core/App';

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
