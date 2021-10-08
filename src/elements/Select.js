import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Select = (props) => {
	const { _onChange, type } = props;

	const generateValues = (limit) => {
		const ret = [];
		for (let i = limit; i < 24; i++) {
			i = String(i);
			if (i.length < 2) {
				i = i.padStart(2, '0');
				ret.push(i);
			} else {
				ret.push(i);
			}
		}
		return ret;
	};

	const [list, setList] = useState(generateValues(1));

	const minutes = ['00', '30'];

	if (type === 'hour') {
		return (
			<SelectBox onChange={_onChange}>
				<option>Hours</option>
				{list.map((hour, idx) => (
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
	&:hover {
		cursor: pointer;
	}
`;

export default React.memo(Select);
