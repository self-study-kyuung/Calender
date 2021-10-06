import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
	const {
		width,
		height,
		shape,
		text,
		color,
		bg,
		fs,
		_onClick,
		z,
		children,
		bradius,
		others,
	} = props;

	const styles = {
		width,
		height,
		color,
		bg,
		fs,
		z,
		bradius,
		others,
	};

	if (props.shape === 'circle') {
		return (
			<AddBtn {...styles} onClick={_onClick}>
				{children}
			</AddBtn>
		);
	}
	return (
		<BasicBtn onClick={_onClick} {...styles}>
			{children}
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
	others: null,
	_onClick: () => {},
	z: 1,
	children: '버튼',
	bradius: 0,
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
	border: none;
	z-index: ${(props) => props.z};
	border-radius: ${(props) => props.bradius};
	-webkit-box-shadow: 4px 7px 6px 0px rgba(56, 56, 56, 0.61);
	box-shadow: 4px 7px 6px 0px rgba(56, 56, 56, 0.61);
	${(props) => props.others};
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
