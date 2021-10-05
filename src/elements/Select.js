import React from 'react';

const Select = (props) => {
	const { _onChange, type } = props;

	const hours = [];
	for (let i = 0; i < 24; i++) {
		// ! Todo Hours 한자리수 두자리수로 맞춰줘야 함
		hours.push(i);
	}
	const minutes = ['00', '30'];

	if (type === 'hour') {
		return (
			<select onChange={_onChange}>
				<option>Hours</option>
				{hours.map((hour, idx) => (
					<option key={idx} value={hour}>
						{hour}
					</option>
				))}
			</select>
		);
	}
	return (
		<select onChange={_onChange}>
			<option>Minutes</option>
			{minutes.map((minute, idx) => (
				<option key={idx} value={minute} name="startM">
					{minute}
				</option>
			))}
		</select>
	);
};

Select.defaultProps = {
	_onChange: () => {},
	type: 'hour',
};

export default Select;
