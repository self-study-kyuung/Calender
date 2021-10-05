import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
	const { width, height, shape, text, color, bg, fs, _onClick } = props;

	const styles = {
		width,
		height,
		color,
		bg,
		fs,
	};

	if (props.shape === 'circle') {
		return (
			<AddBtn {...styles} onClick={_onClick}>
				{text}
			</AddBtn>
		);
	}
	return (
		<BasicBtn onClick={_onClick} {...styles}>
			{text}
		</BasicBtn>
	);
};

Button.defaultProps = {
	width: '100px',
	height: '100px',
	shape: 'rect',
	text: '버튼',
	color: '#fff',
	bg: 'black',
	fs: '1.2rem',
	_onClick: () => {},
};

const BasicBtn = styled.button`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	background-color: ${(props) => props.bg};
	color: ${(props) => props.color};
	font-size: ${(props) => props.fs};
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.7rem;
	border: 1px solid lightgray;
	z-index: 3;
`;

const AddBtn = styled.button`
	width: ${(props) => props.width};
	height: ${(props) => props.width};
	background-color: ${(props) => props.bg};
	color: ${(props) => props.color};
	font-size: ${(props) => props.fs};
	border-radius: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 20px;
	right: 20px;
	padding: 0.7rem;
	z-index: 3;
`;

export default Button;
