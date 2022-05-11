import { Board } from 'components/Board';
import { LeftPanel } from 'components/LeftPanel';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Game = () => {
	const [windowHeight, setWindowHeight] = useState(window.innerHeight);
	const footerHeight = 0;

	useEffect(() => {
		function handleResize() {
			setWindowHeight(window.innerHeight);
		}
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<StyledLayout>
			<div className="main">
				<LeftPanel frameHeight={windowHeight - footerHeight} />
				<span />
				<Board frameHeight={windowHeight - footerHeight} />
			</div>
		</StyledLayout>
	);
};

const StyledLayout = styled.div`
	margin: 0;
	padding: 0;
	.main {
		display: flex;
		span {
			width: 20px;
		}
	}
`;
