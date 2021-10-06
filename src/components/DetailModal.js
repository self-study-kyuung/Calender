// * Basic features Libiary
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as eventCreators } from '../redux/modules/schedul';
import { Button, Grid, Text } from '../elements';
import { useHistory } from 'react-router';

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
		if (!docData.is_complete) window.alert('일정이 완료되었습니다.');
	};
	const deleteEvent = () => {
		if (window.confirm('일정을 삭제하시겠습니까? ')) {
			dispatch(eventCreators.deleteEventFB(_id));
		}
	};
	console.log(docData);

	return (
		<Modal>
			<Grid fd={'column'} height={'18rem'}>
				<Text
					weight={'bold'}
					fs={'3rem'}
					others={'margin-bottom: 1rem'}
				>
					{docData.date}
				</Text>
				<Text
					weight={'semiBold'}
					fs={'2rem'}
					others={'margin-bottom: 1rem'}
				>
					{docData.time}
				</Text>
				<Text
					weight={'regular'}
					fs={'1.5rem'}
					others={'margin-bottom: 1rem'}
				>
					{docData.content}
				</Text>
			</Grid>
			<Grid height={'5rem'}>
				<Button
					bradius={'20px'}
					height={'3rem'}
					width={'9rem'}
					_onClick={changeComplete}
					bg={docData.is_complete ? 'orange' : 'black'}
					color={docData.is_complete ? 'black' : 'white'}
					others={'margin-right: 3rem'}
				>
					<Text fs={'1rem'}>일정 완료</Text>
				</Button>
				<Button
					_onClick={deleteEvent}
					bradius={'20px'}
					height={'3rem'}
					width={'9rem'}
				>
					<Text fs={'1rem'}>일정 삭제</Text>
				</Button>
			</Grid>
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
