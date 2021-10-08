import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore } from '../../shared/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { unstable_batchedUpdates } from 'react-dom';

// ! initialState
const initialState = {
	list: [],
};

// ! action types
const CREATE_EVENT = 'CREATE_EVENT';
const SET_EVENT = 'SET_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';
const UPDATE_CONTENT = 'UPDATE_CONTENT';
const UPDATE_DATE = 'UPDATE_DATE';

// ! action creators
const createEvent = createAction(CREATE_EVENT, (list) => ({ list }));
const setEvent = createAction(SET_EVENT, (set_list) => ({ set_list }));
const updateEvent = createAction(UPDATE_EVENT, (id) => ({ id }));
const deleteEvent = createAction(DELETE_EVENT, (id) => ({ id }));
const updateContent = createAction(UPDATE_CONTENT, (contents) => ({
	contents,
}));
const updateDate = createAction(UPDATE_DATE, (contents) => ({
	contents,
}));

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
		[UPDATE_CONTENT]: (state, action) =>
			produce(state, (draft) => {
				const updIndex = draft.list.findIndex(
					(e) => e.event_id === action.payload.contents._id
				);
				draft.list[updIndex].content =
					action.payload.contents.correctValue;
			}),
		[UPDATE_DATE]: (state, action) =>
			produce(state, (draft) => {
				const updIndex = draft.list.findIndex(
					(e) => e.event_id === action.payload.contents._id
				);
				draft.list[updIndex].time = action.payload.contents.times;
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
		eventDB
			.add({
				list,
			})
			.then((doc) => {
				let _list = { event_id: doc.id, ...list };
				dispatch(createEvent(_list));
				history.replace('/');
			});
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
		dispatch(deleteEvent(id));
		history.replace('/');
	};
};

const updateContentFB = (contents) => {
	return async function (dispatch, getState, { history }) {
		const eventDB = firestore;
		const ref = doc(eventDB, 'schedule', contents._id);
		const data = await getDoc(ref);
		const _data = data.data().list;
		const value = contents.correctValue;
		await updateDoc(ref, {
			list: {
				..._data,
				content: value,
			},
		});
		dispatch(updateContent(contents));
	};
};

const updateDateFB = (contents) => {
	return async function (dispatch, getState, { history }) {
		const eventDB = firestore;
		const ref = doc(eventDB, 'schedule', contents._id);
		const data = await getDoc(ref);
		const _data = data.data().list;
		const value = contents.times;
		await updateDoc(ref, {
			list: {
				..._data,
				time: value,
			},
		});
		dispatch(updateDate(contents));
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
	updateDateFB,
	updateContentFB,
};

export { actionCreators };
