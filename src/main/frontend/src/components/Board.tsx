import { RootState } from 'app/store';
import boardImage from 'assets/board-high-res.jpg';
import {
	Coordinates,
	getSquare,
	selectableSquares,
	spaceCoordinates,
	spaceToProperty,
} from 'helpers/boardSpaceHelper';
import {
	Token,
	centerCoordinates,
	getTokenOffset,
	tokenImages,
} from 'helpers/tokenHelper';

import { Player } from 'models/player';
import { UiActionType } from 'models/uiAction';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextAction } from 'slices/actionsSlice';
import {
	advanceCurrentPlayer,
	exchangeMoney,
	freePlayerFromJail,
	loseMoney,
	sendPlayerToJail,
	setGameLock,
} from 'slices/gameSlice';
import styled from 'styled-components';
import { PropertyCard } from './PropertyCard';

export interface BoardProps {
	frameHeight: number;
}

export const Board: React.FC<BoardProps> = (props: BoardProps) => {
	const players = useSelector((state: RootState) => state.game.players);
	const actionsState = useSelector((state: RootState) => state.actions);
	const [highlightVisible, setHighlightVisible] = useState(false);
	const [highlightedSquare, setHighlightedSquare] = useState(-1);
	const tokenSize = 0.04;

	const dispatch = useDispatch();

	useEffect(() => {
		if (actionsState.actions.length > 0) {
			switch (actionsState.actions[0].type) {
				case UiActionType.ADVANCE:
					dispatch(setGameLock(true));
					{
						const distance = actionsState.actions[0].params[0];
						const reverse = distance < 0;
						for (let i = 1; i <= Math.abs(distance); i++) {
							setTimeout(() => {
								dispatch(advanceCurrentPlayer(reverse));
								if (i === Math.abs(distance)) {
									setTimeout(() => {
										dispatch(setGameLock(false));
										dispatch(nextAction());
									}, 500);
								}
							}, 300 * i);
						}
					}
					break;
				case UiActionType.JAIL_IN:
					dispatch(setGameLock(true));
					setTimeout(() => {
						dispatch(sendPlayerToJail());
						setTimeout(() => {
							dispatch(setGameLock(false));
							dispatch(nextAction());
						}, 500);
					}, 300);
					break;
				case UiActionType.JAIL_OUT:
					dispatch(freePlayerFromJail());
					dispatch(nextAction());
					break;
				case UiActionType.TAX:
					dispatch(loseMoney(actionsState.actions[0].params[0]));
					dispatch(nextAction());
					break;
				case UiActionType.BUY:
					dispatch(loseMoney(actionsState.actions[0].params[0]));
					dispatch(nextAction());
					break;
				case UiActionType.PAY_TO:
					dispatch(
						exchangeMoney(
							actionsState.actions[0].params as [number, number, number]
						)
					);
					dispatch(nextAction());
					break;
				default:
					break;
			}
		}
	}, [actionsState.actions, dispatch]);

	const handleBoardClick = (event: React.MouseEvent) => {
		const targetRect = event.currentTarget.getBoundingClientRect();
		const x = event.pageX - targetRect.left;
		const y = event.pageY - targetRect.top;
		const square = getSquare(x, y, targetRect);
		if (square >= 0) {
			if (square === highlightedSquare) {
				setHighlightVisible(false);
				setHighlightedSquare(-1);
			} else {
				if (selectableSquares.includes(square)) {
					setHighlightedSquare(square);
					setHighlightVisible(true);
				}
			}
		}
	};

	const getTokenCoordinates = useCallback(
		(player: Player) => {
			let coordinates = centerCoordinates(
				spaceCoordinates.get(player.position) as Coordinates,
				tokenSize
			);
			const offset = getTokenOffset(player, players);
			coordinates = {
				...coordinates,
				x1: coordinates.x1 + offset.x,
				y1: coordinates.y1 + offset.y,
			};
			return coordinates;
		},
		[players]
	);

	const getPropertyCard = (square: number) => {
		const property = spaceToProperty.get(square);
		if (property) {
			return (
				<PropertyCard
					propertyType={property[0]}
					rank={property[1]}
					boardSize={0.95 * props.frameHeight}
				/>
			);
		}
	};

	return (
		<StyledBoard frameHeight={props.frameHeight} onClick={handleBoardClick}>
			<div className="lighting" />
			{highlightVisible &&
				(() => {
					const { x1, y1, x2, y2 } = spaceCoordinates.get(
						highlightedSquare
					) as Coordinates;
					return (
						<StyledHighlight
							className="highlight"
							style={{
								left: x1 * 100 + '%',
								width: (x2 - x1) * 100 + '%',
								top: y1 * 100 + '%',
								height: (y2 - y1) * 100 + '%',
							}}
						/>
					);
				})()}
			{highlightVisible && getPropertyCard(highlightedSquare)}
			{players.map((player) => {
				const { x1, y1 } = getTokenCoordinates(player);
				return (
					<StyledToken
						key={player.token}
						style={{
							left: x1 * 100 + '%',
							top: y1 * 100 + '%',
							height: tokenSize * 100 + '%',
						}}
					>
						<img
							src={tokenImages.get(Object.values(Token)[player.token])}
							alt={Object.keys(Token)[player.token]}
						/>
					</StyledToken>
				);
			})}
		</StyledBoard>
	);
};

const StyledBoard = styled.div<{ frameHeight: number }>`
	--board-size: ${(props) => (0.95 * props.frameHeight).toString() + 'px'};
	border: 3px solid black;
	border-radius: 7px;
	text-align: center;
	box-sizing: border-box;
	width: var(--board-size);
	height: var(--board-size);
	margin: 0;
	background-image: url(${boardImage});
	background-size: contain;
	background-repeat: no-repeat;
	filter: drop-shadow(3px 2px 1px black);

	@keyframes fromRight {
		0% {
			left: 100vw;
		}
		100% {
			left: 0px;
		}
	}

	@keyframes rotate {
		to {
			transform: rotateZ(90deg);
		}
	}

	position: relative;
	left: 0px;
	animation-name: fromRight;
	animation-duration: 0.8s;
	animation-timing-function: ease;
	animation-iteration-count: 1coordinates;
`;

const StyledHighlight = styled.div`
	position: absolute;
	box-sizing: border-box;
	border-radius: 8px;
	animation: color_glow 0.4s linear infinite alternate;

	@keyframes color_glow {
		from {
			border: 0.25rem solid orange;
			box-shadow: 0 0 0.25em 0 lightsalmon, inset 0 0 0.25em salmon;
		}
		to {
			border: 0.25rem solid brown;
		}
	}
`;

const StyledToken = styled.div`
	position: absolute;
	box-sizing: border-box;
	img {
		height: 100%;
	}
	transition: left 0.2s ease-in-out, top 0.2s ease-in-out;
`;
