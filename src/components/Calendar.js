// * Basic Libiary
import React from 'react';

// * Children Components
import ScheduleModal from './ScheduleModal';
import { Button, Input, Text } from '../elements/index';

// * form fullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// ******************************************************************

const Calendar = (props) => {
	// * 여기서 getState

	const test = () => {
		window.alert('hellllooooooo');
	};

	return (
		<React.Fragment>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				events={[
					{ title: 'event 1', date: '2021-10-12' },
					{ title: 'event 2', date: '2021-10-13' },
				]}
				eventClick={test}
			/>
		</React.Fragment>
	);
};

export default Calendar;
