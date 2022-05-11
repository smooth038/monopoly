import faucetImage from 'assets/faucet.gif';
import lightbulbImage from 'assets/lightbulb.gif';
import railroadImage from 'assets/railroad.png';
import {
	PropertyType,
	isTerrainType,
	propertyData,
} from 'helpers/propertyHelper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export interface PropertyCardProps {
	propertyType: PropertyType;
	rank: number;
	boardSize: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = (
	props: PropertyCardProps
) => {
	const { t } = useTranslation(['properties']);

	const getPropertyData = () => {
		if (isTerrainType(props.propertyType)) {
			return (propertyData.get(props.propertyType) as number[][])[
				props.rank - 1
			];
		} else {
			return [];
		}
	};

	const getPictoImage = () => {
		switch (props.propertyType) {
			case 'railroads':
				return { src: railroadImage, alt: 'locomotive' };
			case 'utilities':
				return props.rank === 1
					? { src: lightbulbImage, alt: 'light bulb' }
					: { src: faucetImage, alt: 'faucet' };
		}
	};

	return (
		<StyledPropertyCard
			color={colors.get(props.propertyType)}
			boardSize={props.boardSize}
		>
			{isTerrainType(props.propertyType) ? (
				<>
					<div className="title">
						<h4 className="titleDeed">{t('titleDeed')}</h4>
						<h2 className="propertyName">
							{t(`propertyName.${props.propertyType}.${props.rank}`)}
						</h2>
					</div>
					<div className="content">
						<div className="rent">
							{t('rent', {
								rent: getPropertyData()[0],
							})}
						</div>
						{[...Array(4)].map((e, i) => (
							<div className="line" key={i + 1}>
								<div className="rentText">
									{t('withHouse', { count: i + 1 })}
								</div>
								<div className="rentValue">
									{t('houseRent', {
										rent: getPropertyData()[i + 1],
									})}
								</div>
							</div>
						))}
						<div className="hotelRent">
							{t('withHotel', { rent: getPropertyData()[5] })}
						</div>
						<div className="mortgageValue">
							{t('mortgageValue', { value: getPropertyData()[6] })}
						</div>
						<div className="houseCost">
							{t('houseCost', { cost: getPropertyData()[7] })}
						</div>
						<div className="hotelCost">
							{t('hotelCost', { cost: getPropertyData()[7] })}
						</div>
						<div className="footnote">{t('footnote')}</div>
					</div>
				</>
			) : (
				<>
					<div className="pictoContainer">
						<img alt="" {...getPictoImage()} className="picto"></img>
					</div>
					<div className="content nonTerrainContent">
						<hr />
						<h2 className="nonTerrainPropertyName">
							{t(`propertyName.${props.propertyType}.${props.rank}`)}
						</h2>
						<hr />
						{props.propertyType === 'railroads' ? (
							<>
								<div className="railroadRents">
									{[...Array(4)].map((e, i) => (
										<div className="line" key={'rrRent' + i + 1}>
											<div className="rentText">
												{t('railroads.rent', { count: i + 1 })}
											</div>
											<div className="rentValue">
												{t('houseRent', {
													rent: 25 * Math.pow(2, i),
												})}
											</div>
										</div>
									))}
								</div>
								<div className="mortgageValue railroad">
									{t('mortgageValue', { value: 100 })}
								</div>
							</>
						) : (
							<>
								<div className="utilityRent">
									<div className="left-align">{t('utilities.rent1')}</div>
									<div className="left-align">{t('utilities.rent2')}</div>
								</div>
								<div className="mortgageValue">
									{t('mortgageValue', { value: 75 })}
								</div>
							</>
						)}
					</div>
				</>
			)}
		</StyledPropertyCard>
	);
};

const colors = new Map<PropertyType, string>([
	['darkPurple', '#420144'],
	['lightBlue', '#88b8ff'],
	['purple', '#fe15bc'],
	['orange', '#ff6205'],
	['red', '#fe1300'],
	['yellow', '#f7f806'],
	['green', '#2ee920'],
	['blue', '#0e32ff'],
]);

const StyledPropertyCard = styled.div<{
	color: string | undefined;
	boardSize: number;
}>`
	position: absolute;
	top: ${(props) => props.boardSize * 0.2 + 'px'};
	bottom: ${(props) => props.boardSize * 0.2 + 'px'};
	left: ${(props) => props.boardSize * 0.23 + 'px'};
	right: ${(props) => props.boardSize * 0.23 + 'px'};
	background-color: white;
	border: 2px solid black;
	box-shadow: 0 0 0 ${(props) => props.boardSize / 100 + 'px'} white,
		0 0 0 ${(props) => props.boardSize / 100 + 1 + 'px'} #ccc;
	overflow: hidden;

	.title {
		margin: ${(props) => props.boardSize / 100 + 'px'};
		height: ${(props) => props.boardSize / 9 + 'px'};
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: ${(props) => props.boardSize / 100 + 'px'};
		background-color: ${(props) => props.color};
		color: ${(props) =>
			props.color && ['#420144', '#fe15bc', '#0e32ff'].includes(props.color)
				? 'white'
				: 'black'};
		border: ${(props) =>
			props.color && ['#f7f806'].includes(props.color) && '1px solid #ccc'};
		box-sizing: border-box;
	}

	h2 {
		font-family: 'kabale-medium';
		text-transform: uppercase;
		font-size: ${(props) => props.boardSize / 32 + 'px'};
		margin: 0;
	}

	h4 {
		font-family: 'kabob-light';
		text-transform: uppercase;
		font-size: ${(props) => props.boardSize / 48 + 'px'};
		margin: 0;
	}

	.content {
		font-size: ${(props) => props.boardSize / 36 + 'px'};
	}

	.line {
		margin: ${(props) =>
			props.boardSize / 200 + 'px ' + props.boardSize / 100 + 'px'};
		padding: 0px ${(props) => props.boardSize / 20 + 'px'};
		display: flex;
		column-gap: ${(props) => props.boardSize / 200 + 'px'};
		.rentText {
			flex-grow: 1;
			overflow-x: hidden;
			white-space: nowrap;
			::after {
				content: ' ......................................................................................';
				white-space: nowrap;
			}
		}
		.rentValue {
			text-align: right;
		}
	}
	.mortgageValue {
		margin-top: ${(props) => props.boardSize / 50 + 'px'};
	}
	.footnote {
		margin: ${(props) => props.boardSize / 50 + 'px'};
		font-size: ${(props) => props.boardSize / 48 + 'px'};
	}

	.pictoContainer {
		margin: ${(props) => props.boardSize / 40 + 'px'};
	}
	.picto {
		height: ${(props) => props.boardSize / 7 + 'px'};
	}

	.nonTerrainPropertyName {
		margin: ${(props) => props.boardSize / 200 + 'px'};
	}

	hr {
		margin: 0 auto;
	}

	.nonTerrainContent {
		padding: 0px ${(props) => props.boardSize / 30 + 'px'};
	}

	.railroadRents {
		padding: ${(props) => props.boardSize / 50 + 'px'} 0px;
	}

	.railroadRents > .line {
		margin: ${(props) => props.boardSize / 60 + 'px'} auto;
		padding: 0px;
	}

	.utilityRent {
		margin: ${(props) => props.boardSize / 60 + 'px'} 0px;
		height: ${(props) => props.boardSize / 4 + 'px'};
		display: flex;
		flex-direction: column;
		gap: ${(props) => props.boardSize / 50 + 'px'};
		justify-content: center;
	}

	.left-align {
		text-align: left;
		text-indent: ${(props) => props.boardSize / 50 + 'px'};
	}
`;
