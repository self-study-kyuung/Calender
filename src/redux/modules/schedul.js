import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore } from '../../shared/firebase';
import { collection, addDoc } from 'firebase/firestore';

const db = firestore;

// ! initialState
const initialState = {
	list: [],
};

// ! action types
const CREATE_EVENT = 'CREATE_EVENT';
const SET_EVENT = 'SET_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';

// ! action creators
const createEvent = createAction(CREATE_EVENT, (list) => ({ list }));
const setEvent = createAction(SET_EVENT, (set_list) => ({ set_list }));
const updateEvent = createAction(UPDATE_EVENT, (list) => ({ list }));
const deleteEvent = createAction(DELETE_EVENT, (list) => ({ list }));

// ! reducers
export default handleActions(
	{
		[CREATE_EVENT]: (state, action) =>
			produce(state, (draft) => {
				draft.list.unshift(action.payload.list);
			}),
		[SET_EVENT]: (state, action) =>
			produce(state, (draft) => {
				draft.list = action.payload.set_list;
			}),
	},
	initialState
);

// ! middlewares
const getEventFB = () => {
	return function (dispatch, getState, { history }) {
		const eventDB = firestore.collection('schedule');
		eventDB.get().then((docs) => {
			let set_list = [];
			docs.forEach((doc) => {
				const event = {
					event_id: doc.id,
					date: doc.data().list.date,
					time: doc.data().list.time,
					content: doc.data().list.content,
					is_complete: doc.data().list.is_complete,
				};
				set_list.push(event);
			});
			dispatch(setEvent(set_list));
		});
	};
};

const createEventFB = (list) => {
	return async function (dispatch, getState, { history }) {
		const eventDB = firestore.collection('schedule');
		eventDB.add({
			list,
		});
		dispatch(createEvent(list));
		window.alert('일정이 추가되었습니다.');
	};
};

const findEventFB = (id) => {
	return async function (dispatch, getState, { history }) {
		const eventDB = firestore.collection('schedule');
		console.log(id);
		eventDB.get().then((docs) => {
			console.log(docs.id);
		});
	};
};

// ! action creator export
const actionCreators = {
	createEvent,
	setEvent,
	updateEvent,
	deleteEvent,
	getEventFB,
	createEventFB,
	findEventFB,
};

export { actionCreators };
