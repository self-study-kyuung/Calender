// * Basic features Libiary
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as eventCreators } from '../redux/modules/schedul';

const DetailModal = ({ clickEventId }) => {
	const dispatch = useDispatch();
	const id = clickEventId;
	console.log(id);
	dispatch(eventCreators.findEventFB(id));

	return <Modal>{clickEventId}</Modal>;
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
