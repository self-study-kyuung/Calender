import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
	const { children, fd, jc, ai, width, height, z, others } = props;
	const styles = { fd, jc, ai, width, height, z, others };

	return (
		<>
			<Flexbox {...styles}>{children}</Flexbox>
		</>
	);
};

Grid.defaultProps = {
	children: 'child',
	fd: 'row',
	jc: 'center',
	ai: 'center',
	width: '100%',
	height: '100%',
	z: 1,
};

const Flexbox = styled.div`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	display: flex;
	flex-direction: ${(props) => props.fd};
	justify-content: ${(props) => props.jc};
	align-items: ${(props) => props.ai};
	margin: 1rem;
	z-index: ${(props) => props.z};
	${(props) => props.others};
`;

export default Grid;
