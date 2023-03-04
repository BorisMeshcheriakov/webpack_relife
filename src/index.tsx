import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from 'core/redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from 'core/theme';
import { ThemeProvider } from '@mui/material';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import App from 'core/App';

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
