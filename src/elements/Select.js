import React from 'react';
import styled from 'styled-components';

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
			<SelectBox onChange={_onChange}>
				<option>Hours</option>
				{hours.map((hour, idx) => (
					<option key={idx} value={hour}>
						{hour}
					</option>
				))}
			</SelectBox>
		);
	}
	return (
		<SelectBox onChange={_onChange}>
			<option>Minutes</option>
			{minutes.map((minute, idx) => (
				<option key={idx} value={minute} name="startM">
					{minute}
				</option>
			))}
		</SelectBox>
	);
};

Select.defaultProps = {
	_onChange: () => {},
	type: 'hour',
};

const SelectBox = styled.select`
	margin-right: 0.5rem;
	border: 1px solid lightgray;
	width: 4.8rem;
	height: 1.5rem;
	border-radius: 5px;
	text-align: center;
	padding: 0 2px;
`;

export default Select;
