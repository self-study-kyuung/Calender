import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const ModalState = {
	addModalState: false,
	detailModalState: false,
};

const ADD_MODAL = 'ADD_MODAL';
const DETAIL_MODAL = 'DETAIL_MODAL';

const addModal = createAction(ADD_MODAL, (state) => ({ state }));
const detailModal = createAction(DETAIL_MODAL, (state) => ({ state }));

export default handleActions(
	{
		[ADD_MODAL]: (state, action) =>
			produce(state, (draft) => {
				draft['addModalState'] = action.payload.state;
			}),
		[DETAIL_MODAL]: (state, action) =>
			produce(state, (draft) => {
				draft['detailModalState'] = action.payload.state;
			}),
	},
	ModalState
);

export { addModal, detailModal };
