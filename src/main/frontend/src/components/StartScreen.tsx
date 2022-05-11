import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const StartScreen: React.FC = () => {
	const { t } = useTranslation('common');
	const navigate = useNavigate();
	return (
		<div>
			<h1>{t('startScreen.welcome')}</h1>
			<StyledButtons>
				<button type="button" onClick={() => navigate('/new-game')}>
					{t('startScreen.newGame')}
				</button>
				<button
					disabled={true}
					className="disabled"
					type="button"
					onClick={() => null}
				>
					{t('startScreen.loadGame')}
				</button>
			</StyledButtons>
		</div>
	);
};

const StyledButtons = styled.div`
	display: flex;
	justify-content: center;
	column-gap: 8px;

	button {
		background-color: #333;
	}
`;
