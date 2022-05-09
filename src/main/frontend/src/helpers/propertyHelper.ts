export const propertyData = new Map<TerrainType, Array<Array<number>>>([
  [
    'darkPurple',
    [
      [2, 10, 30, 90, 160, 250, 30, 50],
      [4, 20, 60, 180, 320, 450, 30, 50],
    ],
  ],
  [
    'lightBlue',
    [
      [6, 30, 90, 270, 400, 550, 50, 50],
      [6, 30, 90, 270, 400, 550, 50, 50],
      [8, 40, 100, 300, 450, 600, 60, 50],
    ],
  ],
  [
    'purple',
    [
      [10, 50, 150, 450, 625, 750, 70, 100],
      [10, 50, 150, 450, 625, 750, 70, 100],
      [12, 60, 180, 500, 700, 900, 80, 100],
    ],
  ],
  [
    'orange',
    [
      [14, 70, 200, 550, 750, 950, 90, 100],
      [14, 70, 200, 550, 750, 950, 90, 100],
      [16, 80, 220, 600, 800, 1000, 100, 100],
    ],
  ],
  [
    'red',
    [
      [18, 90, 250, 700, 875, 1050, 110, 150],
      [18, 90, 250, 700, 875, 1050, 110, 150],
      [20, 100, 300, 750, 925, 1100, 120, 150],
    ],
  ],
  [
    'yellow',
    [
      [22, 110, 330, 800, 975, 1150, 130, 150],
      [22, 110, 330, 800, 975, 1150, 130, 150],
      [24, 120, 360, 850, 1025, 1200, 140, 150],
    ],
  ],
  [
    'green',
    [
      [26, 130, 390, 900, 1100, 1275, 150, 200],
      [26, 130, 390, 900, 1100, 1275, 150, 200],
      [28, 150, 450, 1000, 1200, 1400, 160, 200],
    ],
  ],
  [
    'blue',
    [
      [35, 175, 500, 1100, 1300, 1500, 175, 200],
      [50, 200, 600, 1400, 1700, 2000, 200, 200],
    ],
  ],
]);

const PROPERTY_TYPES = [
  'darkPurple',
  'lightBlue',
  'purple',
  'orange',
  'red',
  'yellow',
  'green',
  'blue',
  'railroads',
  'utilities',
] as const;

const TERRAIN_TYPES = [
  'darkPurple',
  'lightBlue',
  'purple',
  'orange',
  'red',
  'yellow',
  'green',
  'blue',
] as const;

export type PropertyType = typeof PROPERTY_TYPES[number];
export type TerrainType = typeof TERRAIN_TYPES[number];

export function isPropertyType(
  value: string | TerrainType
): value is PropertyType {
  return PROPERTY_TYPES.includes(value as PropertyType);
}

export function isTerrainType(
  value: string | PropertyType
): value is TerrainType {
  return TERRAIN_TYPES.includes(value as TerrainType);
}
