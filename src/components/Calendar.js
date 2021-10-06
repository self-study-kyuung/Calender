// * Basic features Libiary
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as eventCreators } from '../redux/modules/schedul';

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

	// * modal button
	const [addModal, setaddModal] = useState(0);
	const [detailModal, setDetailModal] = useState(0);
	const [clickEventId, setClickEventId] = useState([]);

	const [completeEvents, setCompleteEvents] = useState(0);

	// * me -> redux -> firebase
	React.useEffect(() => {
		dispatch(eventCreators.getEventFB());
	}, []);
	const events = useSelector((state) => state.schedul.list);

	// * for event box view , target.event.id (fullcal) === event.event_id (redux)
	let all_event_box = [];
	for (const event of events) {
		all_event_box.push({
			id: event.event_id,
			title: `${event.time} ${event.content}`,
			date: event.date,
			is_complete: event.is_complete,
			color: event.is_complete ? 'orange' : 'blue',
		});
	}

	let completed_event_box = [];
	for (const event of events) {
		if (event.is_complete) {
			completed_event_box.push({
				id: event.event_id,
				title: `${event.time} ${event.content}`,
				date: event.date,
				is_complete: event.is_complete,
				color: event.is_complete ? 'orange' : 'blue',
			});
		}
	}

	const chageEventsView = () => {
		completeEvents ? setCompleteEvents(0) : setCompleteEvents(1);
	};

	// * + 버튼 누르면 추가 모달 둥두둘ㅇ둥두룯등장
	const addModalClick = () => {
		addModal === 0 ? setaddModal(1) : setaddModal(0);
	};

	// * 각 일정 누르면 디테일 모달 팝업, 정보 prop로 넘기기
	const detailModalClick = (e) => {
		detailModal === 0 ? setDetailModal(1) : setDetailModal(0);
		const id = e.event.id;
		setClickEventId(id);
	};

	// * 아무데나 눌러도 모달 닫겨라
	const closeModal = () => {
		if (addModal === 1 || detailModal === 1) {
			console.log('close');
			setaddModal(0);
			setDetailModal(0);
		}
	};

	return (
		<section style={{ padding: '4rem' }}>
			{addModal === 1 && <AddModal />}
			{detailModal === 1 && <DetailModal clickEventId={clickEventId} />}
			<div onClick={closeModal}>
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
					{completeEvents ? '모든 일정 보기' : '완료된 일정만 보기'}
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
