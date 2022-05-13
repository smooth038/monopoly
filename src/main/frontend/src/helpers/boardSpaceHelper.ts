import { PropertyType } from './propertyHelper';

export interface Coordinates {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export const getSquare = (x: number, y: number, rect: DOMRect): number => {
	if (
		x > 0.1375 * rect.width &&
		x < 0.8625 * rect.width &&
		y > 0.13633 * rect.height &&
		y < 0.864 * rect.height
	) {
		return -1;
	}
	if (y > (spaceCoordinates.get(0) as Coordinates).y1 * rect.width) {
		for (let i = 0; i <= 10; i++) {
			if (
				x < (spaceCoordinates.get(i) as Coordinates).x2 * rect.width &&
				x > (spaceCoordinates.get(i) as Coordinates).x1 * rect.width
			) {
				return i;
			}
		}
	}
	if (y < (spaceCoordinates.get(20) as Coordinates).y2 * rect.width) {
		for (let i = 20; i <= 30; i++) {
			if (
				x > (spaceCoordinates.get(i) as Coordinates).x1 * rect.width &&
				x < (spaceCoordinates.get(i) as Coordinates).x2 * rect.width
			) {
				return i;
			}
		}
	}
	if (x < (spaceCoordinates.get(10) as Coordinates).x2 * rect.width) {
		for (let i = 11; i <= 19; i++) {
			if (
				y < (spaceCoordinates.get(i) as Coordinates).y2 * rect.width &&
				y > (spaceCoordinates.get(i) as Coordinates).y1 * rect.width
			) {
				return i;
			}
		}
	}
	if (x > (spaceCoordinates.get(30) as Coordinates).x1 * rect.width) {
		for (let i = 31; i <= 39; i++) {
			if (
				y > (spaceCoordinates.get(i) as Coordinates).y1 * rect.width &&
				y < (spaceCoordinates.get(i) as Coordinates).y2 * rect.width
			) {
				return i;
			}
		}
	}
	return -2;
};

export const selectableSquares = [
	1, 3, 5, 6, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 21, 23, 24, 25, 26, 27, 28,
	29, 31, 32, 34, 35, 37, 39,
];

export const spaceCoordinates = new Map<number, Coordinates>([
	[0, { x1: 0.862667, y1: 0.864, x2: 1.003167, y2: 1.003167 }],
	[1, { x1: 0.779333, y1: 0.864, x2: 0.866167, y2: 1.003167 }],
	[2, { x1: 0.702833, y1: 0.864, x2: 0.782667, y2: 1.003167 }],
	[3, { x1: 0.622833, y1: 0.864, x2: 0.706, y2: 1.003167 }],
	[4, { x1: 0.541667, y1: 0.864, x2: 0.625833, y2: 1.003167 }],
	[5, { x1: 0.4605, y1: 0.864, x2: 0.545, y2: 1.003167 }],
	[6, { x1: 0.378333, y1: 0.864, x2: 0.463833, y2: 1.003167 }],
	[7, { x1: 0.297167, y1: 0.864, x2: 0.381667, y2: 1.003167 }],
	[8, { x1: 0.216167, y1: 0.864, x2: 0.3005, y2: 1.003167 }],
	[9, { x1: 0.133667, y1: 0.864, x2: 0.219167, y2: 1.003167 }],
	[10, { x1: -0.003167, y1: 0.864, x2: 0.1375, y2: 1.003167 }],
	[11, { x1: -0.003167, y1: 0.783, x2: 0.1375, y2: 0.867333 }],
	[12, { x1: -0.003167, y1: 0.704, x2: 0.1375, y2: 0.786333 }],
	[13, { x1: -0.003167, y1: 0.621833, x2: 0.1375, y2: 0.707333 }],
	[14, { x1: -0.003167, y1: 0.540667, x2: 0.1375, y2: 0.625 }],
	[15, { x1: -0.003167, y1: 0.459667, x2: 0.1375, y2: 0.544 }],
	[16, { x1: -0.003167, y1: 0.3775, x2: 0.1375, y2: 0.462833 }],
	[17, { x1: -0.003167, y1: 0.296167, x2: 0.1375, y2: 0.380667 }],
	[18, { x1: -0.003167, y1: 0.215167, x2: 0.1375, y2: 0.299667 }],
	[19, { x1: -0.003167, y1: 0.132, x2: 0.1375, y2: 0.218333 }],
	[20, { x1: -0.003167, y1: -0.003167, x2: 0.1375, y2: 0.136667 }],
	[21, { x1: 0.133667, y1: -0.003167, x2: 0.2195, y2: 0.136667 }],
	[22, { x1: 0.216167, y1: -0.003167, x2: 0.2985, y2: 0.136667 }],
	[23, { x1: 0.295167, y1: -0.003167, x2: 0.380667, y2: 0.136667 }],
	[24, { x1: 0.377333, y1: -0.003167, x2: 0.461667, y2: 0.136667 }],
	[25, { x1: 0.4585, y1: -0.003167, x2: 0.542667, y2: 0.136667 }],
	[26, { x1: 0.5395, y1: -0.003167, x2: 0.625167, y2: 0.136667 }],
	[27, { x1: 0.621833, y1: -0.003167, x2: 0.706, y2: 0.136667 }],
	[28, { x1: 0.703, y1: -0.003167, x2: 0.787167, y2: 0.136667 }],
	[29, { x1: 0.784, y1: -0.003167, x2: 0.866167, y2: 0.136667 }],
	[30, { x1: 0.862667, y1: -0.003167, x2: 1.003167, y2: 0.136667 }],
	[31, { x1: 0.862667, y1: 0.132, x2: 1.003167, y2: 0.218333 }],
	[32, { x1: 0.862667, y1: 0.215167, x2: 1.003167, y2: 0.2995 }],
	[33, { x1: 0.862667, y1: 0.296167, x2: 1.003167, y2: 0.3805 }],
	[34, { x1: 0.862667, y1: 0.377333, x2: 1.003167, y2: 0.462833 }],
	[35, { x1: 0.862667, y1: 0.459667, x2: 1.003167, y2: 0.543833 }],
	[36, { x1: 0.862667, y1: 0.540667, x2: 1.003167, y2: 0.625 }],
	[37, { x1: 0.862667, y1: 0.621833, x2: 1.003167, y2: 0.707167 }],
	[38, { x1: 0.862667, y1: 0.704167, x2: 1.003167, y2: 0.786167 }],
	[39, { x1: 0.862667, y1: 0.783, x2: 1.003167, y2: 0.867167 }],
]);

export const spaceToProperty = new Map<number, [PropertyType, number]>([
	[1, ['darkPurple', 1]],
	[3, ['darkPurple', 2]],
	[5, ['railroads', 1]],
	[6, ['lightBlue', 1]],
	[8, ['lightBlue', 2]],
	[9, ['lightBlue', 3]],
	[11, ['purple', 1]],
	[12, ['utilities', 1]],
	[13, ['purple', 2]],
	[14, ['purple', 3]],
	[15, ['railroads', 2]],
	[16, ['orange', 1]],
	[18, ['orange', 2]],
	[19, ['orange', 3]],
	[21, ['red', 1]],
	[23, ['red', 2]],
	[24, ['red', 3]],
	[25, ['railroads', 3]],
	[26, ['yellow', 1]],
	[27, ['yellow', 2]],
	[28, ['utilities', 2]],
	[29, ['yellow', 3]],
	[31, ['green', 1]],
	[32, ['green', 2]],
	[34, ['green', 3]],
	[35, ['railroads', 4]],
	[37, ['blue', 1]],
	[39, ['blue', 2]],
]);
