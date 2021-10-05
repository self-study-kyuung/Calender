// * Basic features Libiary
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as eventCreators } from '../redux/modules/schedul';

// * Children Components
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import { Button, Input, Text } from '../elements/index';

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

	// * me -> redux -> firebase
	React.useEffect(() => {
		dispatch(eventCreators.getEventFB());
	}, []);
	const events = useSelector((state) => state.schedul.list);

	// * for event box view , target.event.id (fullcal) === event.event_id (redux)
	let event_box = [];
	for (const event of events) {
		event_box.push({
			id: event.event_id,
			title: event.content,
			date: event.date,
			time: event.time,
			is_complete: event.is_complete,
		});
	}

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
			// setaddModal(0);
			// setDetailModal(0);
		}
	};

	return (
		<section onClick={closeModal}>
			{addModal === 1 && <AddModal />}
			{detailModal === 1 && <DetailModal clickEventId={clickEventId} />}
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				events={event_box}
				eventClick={detailModalClick}
			/>
			<Button
				shape={'circle'}
				width={'3rem'}
				height={'3rem'}
				text="+"
				fs="2.2rem"
				_onClick={addModalClick}
			/>
		</section>
	);
};

export default Calendar;
