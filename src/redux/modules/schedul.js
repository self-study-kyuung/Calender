import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';

// ! initialState
const initialState = {
	list: [
		{
			data: moment().format('YYYY-MM-DD, h:mm:ss'),
			content: '으아아앙',
			is_complete: 'false',
		},
	],
};

// ! action types
const CREATE_EVENT = 'CREATE_EVENT';
const LOAD_EVENT = 'LOAD_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';

// ! action creators
const createEvent = createAction(CREATE_EVENT, (event) => ({ event }));
const loadEvent = createAction(LOAD_EVENT, (event) => ({ event }));
const updateEvent = createAction(UPDATE_EVENT, (event) => ({ event }));
const deleteEvent = createAction(DELETE_EVENT, (event) => ({ event }));

// ! reducers
export default handleActions(
	{
		[CREATE_EVENT]: (state, action) => produce(state, (draft) => {}),
	},
	initialState
);

// ! action creator export
const actionCreators = {
	createEvent,
	loadEvent,
	updateEvent,
	deleteEvent,
};

export { actionCreators };
