// * Basic features Libiary
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as eventCreators } from '../redux/modules/schedul';

// * Children Components, shared features
import { Button, Input, Text, Select, Grid } from '../elements/index';
import { dateReplace } from '../shared/dateReplace';

// * Add features Libiary
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addModal } from '../redux/modules/pages';

// ! ******************************************************************

const AddModal = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [contentData, setContentData] = useState('');

	const [sHour, setSHour] = useState('');
	const [smin, setSmin] = useState('');
	const [eHour, setEHour] = useState('');
	const [emin, setEmin] = useState('');
	const times = `${sHour}:${smin}-${eHour}:${emin}`;

	const _setSHour = (e) => {
		setSHour(e.target.value);
	};

	const _setSMin = (e) => {
		setSmin(e.target.value);
	};

	const _setEHour = (e) => {
		setEHour(e.target.value);
	};

	const _setEMin = (e) => {
		setEmin(e.target.value);
	};

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
				is_complete: false,
			})
		);
		window.alert('일정이 추가되었습니다.');
		dispatch(addModal(0));
	};

	return (
		<Modal>
			<Input
				braduis={'20px'}
				ph={'일정 내용을 입력해주세요'}
				fs={'1.2rem'}
				text={
					<Text
						fs={'2rem'}
						weight={'semiBold'}
						others={'margin-bottom:2rem'}
					>
						일정
					</Text>
				}
				_onChange={(e) => setContentData(e.target.value)}
			/>
			<Grid
				height={'12rem'}
				others={`@media only screen and (max-width: 780px) {
		flex-direction: column;
	}`}
			>
				<Grid
					fd={'column'}
					height={'5rem'}
					others={`@media only screen and (max-width: 780px) {
		height:1rem; padding-top:2rem
	}`}
				>
					<Text weight={'regular'} fs={'1rem'}>
						날짜를 선택해주세요{' '}
					</Text>
					<Grid width={'9rem'}>
						<DatePicker
							selected={startDate}
							onChange={(date) => setStartDate(date)}
						/>
					</Grid>
				</Grid>
				<Grid height={'5rem'} fd={'column'}>
					<Text weight={'regular'} fs={'1rem'}>
						시간을 선택해주세요{' '}
					</Text>
					<Grid>
						<Select type={'hour'} _onChange={_setSHour} />
						<Select type={'min'} _onChange={_setSMin} />
						<Select
							type={'hour'}
							_onChange={_setEHour}
							limit={sHour}
						/>
						<Select type={'min'} _onChange={_setEMin} />
					</Grid>
				</Grid>
			</Grid>
			<Button
				width={'100%'}
				height={'3rem'}
				fs="1.8rem"
				_onClick={addEvent}
				z={0}
				bradius={'20px'}
			>
				<Text fs={'1.3rem'} weight={'bold'}>
					추가하기
				</Text>
			</Button>
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
	height: 44vh;
	position: fixed;
	z-index: 2;
	top: 20vh;
	left: 10vw;
	padding-left: 5vw;
	padding-right: 5vw;
	padding-top: 8vh;
	padding-bottom: 8vh;
	-webkit-box-shadow: 5px 5px 12px 3px rgba(0, 0, 0, 0.53);
	box-shadow: 5px 5px 12px 3px rgba(0, 0, 0, 0.53);
	border-radius: 30px;
`;

export default React.memo(AddModal);
