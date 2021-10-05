// * Basic features Libiary
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as eventCreators } from '../redux/modules/schedul';

// * Children Components, shared features
import { Button, Input, Text, Select } from '../elements/index';
import { dateReplace } from '../shared/dateReplace';

// * Add features Libiary
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// ! ******************************************************************

const AddModal = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [contentData, setContentData] = useState('');

	const [sHour, setSHour] = useState('');
	const [smin, setSmin] = useState('');
	const [eHour, setEHour] = useState('');
	const [emin, setEmin] = useState('');
	const times = `${sHour}:${smin}-${eHour}:${emin}`;

	const dispatch = useDispatch();
	const addEvent = () => {
		const selectDate = dateReplace(startDate);
		if (contentData === '') {
			window.alert('내용을 입력해주세요 ! ');
			return;
		} else if (sHour === '' || smin === '' || eHour === '' || emin === '') {
			window.alert('시간을 선택해주세요 ! ');
			return;
		}
		dispatch(
			eventCreators.createEventFB({
				date: selectDate,
				time: times,
				content: contentData,
				is_complete: 'false',
			})
		);
	};

	return (
		<Modal>
			<Input
				ph={'일정 내용을 입력해주세요'}
				text={'일정'}
				_onChange={(e) => setContentData(e.target.value)}
			/>
			<label>날짜를 선택해주세요 </label>
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
			/>
			<div>
				<Select
					type={'hour'}
					_onChange={(e) => {
						setSHour(e.target.value);
					}}
				/>
				<Select
					type={'min'}
					_onChange={(e) => {
						setSmin(e.target.value);
					}}
				/>
				<Select
					type={'hour'}
					_onChange={(e) => {
						setEHour(e.target.value);
					}}
				/>
				<Select
					type={'min'}
					_onChange={(e) => {
						setEmin(e.target.value);
					}}
				/>
			</div>
			<Button
				width={'100%'}
				height={'3rem'}
				text="추가하기"
				fs="1.8rem"
				_onClick={addEvent}
			/>
		</Modal>
	);
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

export default AddModal;
