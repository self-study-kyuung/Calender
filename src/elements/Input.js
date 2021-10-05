import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
	const { text, ph, fs, _onChange, width, height } = props;
	const styles = {
		width,
		height,
	};
	return (
		<React.Fragment>
			<label>{text}</label>
			<InputEl {...styles} placeholder={ph} onChange={_onChange} />
		</React.Fragment>
	);
};

Input.defaultProps = {
	width: '100%',
	height: '3rem',
	text: '',
	ph: '',
	fs: '14px',
	_onChange: () => {},
};

const InputEl = styled.input`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	font-size: ${(props) => props.fs};
`;

export default Input;
