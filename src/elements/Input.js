import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
	const { text, ph, fs, _onChange, width, height, braduis, others } = props;
	const styles = {
		width,
		height,
		braduis,
		fs,
		others,
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
	fs: '0.7rem',
	_onChange: () => {},
	braduis: 0,
};

const InputEl = styled.input`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	font-size: ${(props) => props.fs};
	border-radius: ${(props) => props.braduis};
	padding-left: 1.2rem;
	border: none;
	${(props) => props.others};
	-webkit-box-shadow: 2px 7px 15px 2px rgba(115, 115, 115, 0.63);
	box-shadow: 2px 7px 15px 2px rgba(115, 115, 115, 0.63);
	&:focus {
		border: 1px solid orange;
	}
`;

export default Input;
