import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
	const { childern } = props;
	return (
		<React.Fragment>
			<Flexbox>{childern}</Flexbox>
		</React.Fragment>
	);
};

Grid.defaultProps = {
	childern: null,
};

const Flexbox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 80vw;
	height: 80vh;
`;

export default Grid;
