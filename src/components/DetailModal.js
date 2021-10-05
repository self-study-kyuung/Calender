// * Basic features Libiary
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as eventCreators } from '../redux/modules/schedul';
import { Button } from '../elements';

const DetailModal = ({ clickEventId }) => {
	const _id = clickEventId;
	const dispatch = useDispatch();
	let docData = {};

	const detailDoc = useSelector((state) => state.schedul.list);
	for (const doc of detailDoc) {
		if (doc.event_id === _id) {
			docData = doc;
		}
	}
	const changeComplete = () => {
		dispatch(eventCreators.updateEventFB(_id));
	};
	const deleteEvent = () => {
		if (window.confirm('일정을 삭제하시겠습니까? ')) {
			dispatch(eventCreators.deleteEventFB(_id));
		}
	};
	console.log(docData);

	return (
		<Modal>
			<h1>{docData.date}</h1>
			<h1>{docData.time}</h1>
			<h1>{docData.content}</h1>
			<Button
				text={'완료'}
				_onClick={changeComplete}
				bg={docData.is_complete ? 'orange' : 'black'}
			/>
			<Button text={'삭제'} _onClick={deleteEvent} />
		</Modal>
	);
};

DetailModal.defaultProps = {
	list: ['a', 'b'],
};

const Modal = styled.section`
	background-color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 70vw;
	height: 60vh;
	position: fixed;
	z-index: 2;
	top: 20vh;
	left: 10vw;
	padding-left: 5vw;
	padding-right: 5vw;
	-webkit-box-shadow: 5px 5px 12px 3px rgba(0, 0, 0, 0.53);
	box-shadow: 5px 5px 12px 3px rgba(0, 0, 0, 0.53);
	border-radius: 30px;
`;
export default DetailModal;
