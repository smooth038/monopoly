import { Game } from 'components/Game';
import { NewGameModal } from 'components/NewGameModal';
import { NoPage } from 'components/NoPage';
import { StartScreen } from 'components/StartScreen';
import React from 'react';
import { useRoutes } from 'react-router-dom';

const App: React.FC = () => {
	const routes = useRoutes([
		{
			path: '/',
			element: <StartScreen />,
		},
		{
			path: '/game',
			element: <Game />,
		},
		{
			path: 'new-game',
			element: <NewGameModal />,
		},
		{
			path: '*',
			element: <NoPage />,
		},
	]);
	return routes;
};

export default App;
