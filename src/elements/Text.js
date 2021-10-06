import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
	const { fs, margin, children, weight, others } = props;
	const styles = { weight, fs, margin, others };

	return (
		<React.Fragment>
			<Pp {...styles}>{children}</Pp>
		</React.Fragment>
	);
};

Text.defaultProps = {
	children: 'child',
	weight: 400,
	fs: '14px',
	margin: 0,
};

const Pp = styled.p`
	font-size: ${(props) => props.fs};
	margin: ${(props) => props.margin};
	font-family: ${(props) => props.weight};
	${(props) => props.others};
	text-align: center;
`;

export default Text;
