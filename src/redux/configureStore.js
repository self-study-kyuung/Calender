import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import Schedul from './modules/schedul';
import Pages from './modules/pages';
export const history = createBrowserHistory();

const rootReducer = combineReducers({
	schedul: Schedul,
	pages: Pages,
	router: connectRouter(history),
});

// * 미들웨어에서 히스토리를 사용할 수 있다.
const middlewares = [thunk.withExtraArgument({ history: history })];

// * 지금이 어느 환경인지
const env = process.env.NODE_ENV;

// * 로거는 콘솔에 리덕스의 상태 변화를 보여준다.
if (env === 'development') {
	const { logger } = require('redux-logger');
	middlewares.push(logger);
}

// * 지금 환경이 브라우저 일 때만 리덕스 데브툴을 사용한다.
const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

// ! 사용 할 미들웨어 묶어주기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// ! 스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
