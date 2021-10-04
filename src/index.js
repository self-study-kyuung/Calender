// * cra basic import
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/shared/App';
import reportWebVitals from './reportWebVitals';

// * redux basic import
import { Provider } from 'react-redux';
import store from './redux/configureStore';

// ******************************************************************

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

reportWebVitals();
