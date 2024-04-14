/**
 * Color
 */
export enum COLOR {
  GREEN = '#00FF00',
  BLACK = '#000000',
}

/**
 * Game
 */
export const SCREEN_WIDTH = window.innerWidth;
export const SCREEN_HEIGHT = window.innerHeight;

export const NUMBER_OF_PLAYERS = 1;
export const EACH_CANVAS_WIDTH_RATIO = `${100 / NUMBER_OF_PLAYERS}%`;

/**
 * Snake
 */
const SIZE_WIDTH = 4;
const SIZE_HEIGHT = 4;
const SIZE_DEPTH = 4;
const SNAKE_X = -10;
const SNAKE_Y = 2;
const SNAKE_Z = 0;
export const SNAKE_INIT_POSITION: [number, number, number] = [
  SNAKE_X,
  SNAKE_Y,
  SNAKE_Z,
];
export const SNAKE_INIT_SIZE: [number, number, number] = [
  SIZE_WIDTH,
  SIZE_HEIGHT,
  SIZE_DEPTH,
];
export const SNAKE_MOVE_SPEED = 21;
export const SNAKE_COLOR = COLOR.GREEN;

/**
 * Road
 */
const ROAD_X = 0;
const ROAD_Y = 0;
const ROAD_Z = SNAKE_Z;
export const ROAD_INIT_POSITION: [number, number, number] = [
  ROAD_X,
  ROAD_Y,
  ROAD_Z,
];
export const ROAD_LENGTH = 100;
export const ROAD_WIDTH = 40;
export const ROAD_COLOR = COLOR.BLACK;
export const ROAD_SPEED = 1;
export const SEGMENT_NUMBER = 99;
