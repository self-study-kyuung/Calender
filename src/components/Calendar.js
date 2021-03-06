// * Basic features Libiary
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as eventCreators } from '../redux/modules/schedul';
import { addModal, detailModal } from '../redux/modules/pages';

// * Children Components
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import { Button, Input, Text, Grid } from '../elements/index';

// * for fullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// ! ******************************************************************

const Calendar = (props) => {
	const dispatch = useDispatch();
	const modalStates = useSelector((state) => state.pages);

	// * modal button
	const [clickEventId, setClickEventId] = useState([]);

	const [completeEvents, setCompleteEvents] = useState(0);

	const events = useSelector((state) => state.schedul.list);
	// * me -> redux -> firebase
	React.useEffect(() => {
		if (events.length === 0) {
			dispatch(eventCreators.getEventFB());
		}
	}, [events]);

	const spliceDate = (date) => {
		const idx = date.indexOf('-');
		const time = `${date.slice(0, idx)}~`;
		return time;
	};

	// * for event box view , target.event.id (fullcal) === event.event_id (redux)
	let all_event_box = [];
	for (const event of events) {
		all_event_box.push({
			id: event.event_id,
			title: `${spliceDate(event.time)} ${event.content}`,
			date: event.date,
			is_complete: event.is_complete,
			color: event.is_complete ? 'orange' : '#4B89DC',
		});
	}

	let completed_event_box = [];
	for (const event of events) {
		if (event.is_complete) {
			completed_event_box.push({
				id: event.event_id,
				title: `${spliceDate(event.time)} ${event.content}`,
				date: event.date,
				is_complete: event.is_complete,
				color: event.is_complete ? 'orange' : '#4B89DC',
			});
		}
	}

	const chageEventsView = () => {
		completeEvents ? setCompleteEvents(0) : setCompleteEvents(1);
	};

	// * ??? ?????? ????????? ????????? ?????? ??????, ?????? prop??? ?????????
	const detailModalClick = (e) => {
		dispatch(detailModal(true));
		const id = e.event.id;
		setClickEventId(id);
	};

	// * + ?????? ????????? ?????? ?????? ??????
	const addModalClick = () => {
		console.log('[component.calendar] called');
		dispatch(addModal(true));
	};

	// * ???????????? ????????? ?????? ?????????
	const closeModal = () => {
		if (
			modalStates.addModalState === true ||
			modalStates.detailModalState === true
		) {
			dispatch(detailModal(false));
			dispatch(addModal(false));
		}
	};

	return (
		<section>
			{modalStates.addModalState === true && <AddModal />}
			{modalStates.detailModalState === true && (
				<DetailModal clickEventId={clickEventId} />
			)}
			<div style={{ padding: '4rem' }} onClick={closeModal}>
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					events={
						completeEvents ? completed_event_box : all_event_box
					}
					eventClick={detailModalClick}
					height={'85vh'}
				/>
			</div>

			<Button
				width={'auto'}
				height={'auto'}
				bradius={'20px'}
				_onClick={chageEventsView}
				others={'position:fixed;bottom:20px;left:50px'}
			>
				<Text fs={'1.1rem'} weight={'semiBold'}>
					{completeEvents ? '?????? ?????? ??????' : '????????? ????????? ??????'}
				</Text>
			</Button>
			<Button
				shape={'circle'}
				width={'3rem'}
				height={'3rem'}
				fs={'2.2rem'}
				_onClick={addModalClick}
			>
				<Text fs={'2.2rem'} weight={'bold'}>
					+
				</Text>
			</Button>
		</section>
	);
};

export default Calendar;
