import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore } from '../../shared/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

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
const updateEvent = createAction(UPDATE_EVENT, (id) => ({ id }));
const deleteEvent = createAction(DELETE_EVENT, (id) => ({ id }));

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
		[UPDATE_EVENT]: (state, action) =>
			produce(state, (draft) => {
				const updIndex = draft.list.findIndex(
					(e) => e.event_id === action.payload.id
				);
				draft.list[updIndex].is_complete
					? (draft.list[updIndex].is_complete = false)
					: (draft.list[updIndex].is_complete = true);
			}),
		[DELETE_EVENT]: (state, action) =>
			produce(state, (draft) => {
				const updIndex = draft.list.findIndex(
					(e) => e.event_id === action.payload.id
				);
				draft.list.splice(updIndex, 1);
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

const updateEventFB = (id) => {
	return async function (dispatch, getState, { history }) {
		const eventDB = firestore;
		const ref = doc(eventDB, 'schedule', id);
		const data = await getDoc(ref);
		const _data = data.data().list;
		const value = _data.is_complete ? false : true;
		await updateDoc(ref, {
			list: {
				..._data,
				is_complete: value,
			},
		});
		dispatch(updateEvent(id));
	};
};

const deleteEventFB = (id) => {
	return async function (dispatch, getState, { history }) {
		const eventDB = firestore;
		await deleteDoc(doc(eventDB, 'schedule', id));
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
	updateEventFB,
	deleteEventFB,
};

export { actionCreators };
