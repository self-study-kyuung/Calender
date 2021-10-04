import React from 'react';
import { Route } from 'react-router';
import Main from '../pages/Main';

// * to use redux-history import
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

const App = () => {
	return (
		<React.Fragment>
			<ConnectedRouter history={history}>
				<Route path="/" components={Main} />
			</ConnectedRouter>
		</React.Fragment>
	);
};

export default App;
