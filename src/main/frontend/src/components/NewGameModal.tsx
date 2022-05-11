import { Token, tokenImages } from 'helpers/tokenHelper';

import { PlayerInfo } from 'models/player';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gameService } from 'service/gameService';
import styled from 'styled-components';

export const NewGameModal: React.FC = () => {
	const { t } = useTranslation('common');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [numberOfPlayers, setNumberOfPlayers] = useState(2);
	const [players, setPlayers] = useState<Array<{ name: string; token: Token }>>(
		[
			{ name: '', token: Token.BOOT },
			{ name: '', token: Token.CAR },
		]
	);

	const handleNumberOfPlayersChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const inputValue = event.target.value;
		if (inputValue) {
			let newNumberOfPlayers = parseInt(inputValue);
			if (newNumberOfPlayers < 2) {
				newNumberOfPlayers = 2;
			} else if (newNumberOfPlayers > 8) {
				newNumberOfPlayers = 8;
			}
			if (newNumberOfPlayers !== numberOfPlayers) {
				const newPlayers = [...players];
				if (newNumberOfPlayers > numberOfPlayers) {
					const numberOfPlayersToAdd = newNumberOfPlayers - numberOfPlayers;
					for (let i = 0; i < numberOfPlayersToAdd; i++) {
						newPlayers.push({
							name: '',
							token: Object.values(Token)[i + numberOfPlayers],
						});
					}
				} else if (newNumberOfPlayers < numberOfPlayers) {
					const numberOfPlayersToRemove = numberOfPlayers - newNumberOfPlayers;
					for (let i = 0; i < numberOfPlayersToRemove; i++) {
						newPlayers.pop();
					}
				}
				setPlayers(newPlayers);
				setNumberOfPlayers(newNumberOfPlayers);
			}
		}
	};

	const handlePlayerNameChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		playerIndex: number
	) => {
		const newPlayers = [...players];
		newPlayers[playerIndex].name = event.target.value;
		setPlayers(newPlayers);
	};

	const handlePlayerTokenChange = (playerIndex: number, tokenIndex: number) => {
		const newPlayers = [...players];
		newPlayers[playerIndex].token = Object.values(Token)[tokenIndex];
		setPlayers(newPlayers);
	};

	const handleNewGameButtonClick = () => {
		const playerNames: string[] = [];
		const playerTokens: Token[] = [];
		for (let i = 0; i < numberOfPlayers; i++) {
			if (players[i].name.length > 25) {
				alert(t('newGameModal.nameTooLong'));
				return;
			}
			if (!players[i].name) {
				alert(t('newGameModal.emptyName'));
				return;
			}
			if (playerNames.includes(players[i].name)) {
				alert(t('newGameModal.duplicateNames'));
				return;
			} else {
				playerNames.push(players[i].name);
			}
			if (playerTokens.includes(players[i].token)) {
				alert(t('newGameModal.duplicateTokens'));
				return;
			} else {
				playerTokens.push(players[i].token);
			}
		}
		const newPlayers: PlayerInfo[] = [];
		// we randomize player order
		let i = players.length;
		while (i > 0) {
			const player = players.splice(Math.floor(Math.random() * i), 1)[0];
			newPlayers.push({
				name: player.name.trim(),
				token: Object.values(Token).indexOf(player.token),
			});
			i--;
		}
		gameService.startNewGame(newPlayers, dispatch, navigate);
	};

	return (
		<StyledNewGameModal>
			<h1>{t('newGameModal.title')}</h1>
			<form>
				<StyledRow>
					<StyledNumberOfPlayers>
						<label>
							{t('newGameModal.numberOfPlayers')}&nbsp;&nbsp;
							<input
								type="number"
								onChange={handleNumberOfPlayersChange}
								value={numberOfPlayers}
							/>
						</label>
					</StyledNumberOfPlayers>
				</StyledRow>
				{Array.from({ length: numberOfPlayers }).map((_, playerIndex) => (
					<StyledRow key={playerIndex}>
						<StyledPlayerEntry>
							<StyledInline>
								<StyledPlayerName>
									<input
										type="text"
										placeholder={t('newGameModal.nameInputPlaceholder')}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handlePlayerNameChange(event, playerIndex)
										}
									/>
								</StyledPlayerName>
								<StyledTokenSelector>
									{Object.values(Token).map((token, tokenIndex) => (
										<div
											key={playerIndex.toString() + '-' + tokenIndex.toString()}
										>
											<input
												type="radio"
												id={'player' + playerIndex + '-token'}
												name={'player' + playerIndex + '-token'}
												value={token}
												checked={
													(!players[playerIndex] &&
														tokenIndex === playerIndex) ||
													players[playerIndex]?.token === token
												}
												readOnly
											/>
											<label
												htmlFor={'player' + playerIndex + '-token'}
												onClick={() => {
													handlePlayerTokenChange(playerIndex, tokenIndex);
												}}
											>
												<img src={tokenImages.get(token)} alt={token} />
											</label>
										</div>
									))}
								</StyledTokenSelector>
							</StyledInline>
						</StyledPlayerEntry>
					</StyledRow>
				))}
				<StyledFormButtons>
					<button type="button" onClick={handleNewGameButtonClick}>
						{t('newGameModal.startGameButtonCaption')}
					</button>
				</StyledFormButtons>
			</form>
		</StyledNewGameModal>
	);
};

const StyledNewGameModal = styled.div`
	position: absolute;
	top: 50px;
	left: 50%;
	transform: translateX(-50%);
	box-sizing: border-box;
	background-color: #2223;
	border: 3px solid #0008;
	border-radius: 10px;
	filter: drop-shadow(3px 2px 2px #000);
	padding: 10px 20px;
	color: white;
	background-image: linear-gradient(-210deg, #fff4, #fff0);

	@keyframes appear {
		from {
			transform: translateX(-50%) scale(0);
		}
	}

	transition: appear 0.5s ease-out forwards;
	counter-reset: playerNumber;

	h1 {
		text-align: center;
	}
`;

const StyledRow = styled.div`
	padding: 10px 0px;
`;

const StyledNumberOfPlayers = styled.div`
	font-size: 18px;
	input {
		height: 1.5em;
		width: 3em;
		font-size: 18px;
	}
`;
const StyledPlayerEntry = styled.div`
	display: flex;
	::before {
		width: 1em;
		counter-increment: playerNumber;
		content: counter(playerNumber) ')';
		padding-right: 0.5em;
		display: flex;
		align-items: center;
		font-size: 1.2em;
		font-weight: 600;
	}
`;

const StyledInline = styled.span`
	display: flex;
`;
const StyledPlayerName = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	margin-right: 8px;
	input {
		flex-grow: 1;
		height: 1.5em;
		font-size: 18px;
	}
`;

const StyledTokenSelector = styled.div`
	display: flex;
	margin-left: 8px;
	white-space: nowrap;
	input[type='radio'] {
		opacity: 0;
		position: fixed;
		width: 0;
	}
	label {
		display: flex;
		align-items: center;
		margin: 0px 2px;
		padding: 5px 5px;
		font-size: 16px;
		border: 1px solid transparent;
		border-radius: 4px;
	}
	input[type='radio']:checked + label {
		border: 1px solid #4c4;
		box-shadow: 0 0 0.5em 0 #4c4, inset 0 0 0.5em 0 #4c4;
	}
	label:hover {
		background-color: #4c43;
	}
	img {
		width: 2.5em;
		height: 2.5em;
	}
`;

const StyledFormButtons = styled.div`
	display: flex;
	justify-content: center;
	padding: 15px 0px;
`;
