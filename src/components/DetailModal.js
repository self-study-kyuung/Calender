// * Basic features Libiary
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as eventCreators } from '../redux/modules/schedul';
import { Button, Grid, Text, Input, Select } from '../elements';

// * .. Libiary
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DetailModal = ({ clickEventId }) => {
	const [startDate, setStartDate] = useState(new Date());
	const [contentData, setContentData] = useState('');

	const [updatState, setUpdateState] = useState(false);
	const [correctValue, setCorrectValue] = useState('');

	const [sHour, setSHour] = useState('');
	const [smin, setSmin] = useState('');
	const [eHour, setEHour] = useState('');
	const [emin, setEmin] = useState('');
	const times = `${sHour}:${smin}-${eHour}:${emin}`;

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

	const updateContent = () => {
		dispatch(eventCreators.updateContentFB({ correctValue, _id }));
		setUpdateState(false);
	};

	const updateDate = () => {
		dispatch(eventCreators.updateDateFB({ _id, times }));
	};

	const chageView = () => {
		updatState ? setUpdateState(false) : setUpdateState(true);
	};

	return (
		<Modal>
			<Grid fd={'column'} height={'18rem'}>
				<Grid>
					<Text
						weight={'bold'}
						fs={'3rem'}
						others={'margin-bottom: 1rem'}
					>
						{docData.date}
					</Text>
					<Button
						width={'2.6rem'}
						height={'2.6rem'}
						bradius={'10px'}
						others={
							'margin-bottom:1rem;margin-left:1rem;padding-top:1.3rem'
						}
						fs={'2.3rem'}
						_onClick={chageView}
					>
						<i className="fas fa-eraser"></i>
					</Button>
				</Grid>
				{updatState === false ? (
					<Grid>
						<Text
							weight={'semiBold'}
							fs={'2rem'}
							others={'margin-bottom: 1rem'}
						>
							{docData.time}
						</Text>
					</Grid>
				) : (
					<Grid>
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
						<Button
							width={'2.6rem'}
							height={'2.6rem'}
							bradius={'10px'}
							others={'margin-left:1rem;'}
							_onClick={updateDate}
						>
							<Text>O</Text>
						</Button>
					</Grid>
				)}
				{updatState === false ? (
					<Text
						weight={'regular'}
						fs={'1.5rem'}
						others={'margin-bottom: 1rem'}
					>
						{docData.content}
					</Text>
				) : (
					<Grid width={'30rem'} height={'2rem'}>
						<Input
							width={'30rem'}
							height={'3rem'}
							braduis={'12px'}
							ph={'수정할 내용을 입력해주세요'}
							fs={'1.1rem'}
							others={'text-align:center'}
							_onChange={(e) => setCorrectValue(e.target.value)}
						/>
						<Button
							width={'2.6rem'}
							height={'2.6rem'}
							bradius={'10px'}
							others={'margin-left:1rem;'}
							_onClick={updateContent}
						>
							<Text>O</Text>
						</Button>
					</Grid>
				)}
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
