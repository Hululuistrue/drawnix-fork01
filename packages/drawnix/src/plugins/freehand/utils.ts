import {
  getSelectedElements,
  idCreator,
  isPointInPolygon,
  PlaitBoard,
  PlaitElement,
  Point,
  RectangleClient,
  rotateAntiPointsByElement,
  Selection,
  ThemeColorMode,
} from '@plait/core';
import { Freehand, FreehandShape, FreehandThemeColors } from './type';
import {
  DefaultDrawStyle,
  isClosedCustomGeometry,
  isClosedPoints,
  isHitPolyLine,
  isRectangleHitRotatedPoints,
} from '@plait/draw';

export function getFreehandPointers() {
  return [FreehandShape.feltTipPen, FreehandShape.eraser];
}

export const createFreehandElement = (
  shape: FreehandShape,
  points: Point[]
): Freehand => {
  const element: Freehand = {
    id: idCreator(),
    type: 'freehand',
    shape,
    points,
  };
  return element;
};

export const isHitFreehand = (
  board: PlaitBoard,
  element: Freehand,
  point: Point
) => {
  const antiPoint = rotateAntiPointsByElement(board, point, element) || point;
  const points = element.points;
  if (isClosedPoints(element.points)) {
    return (
      isPointInPolygon(antiPoint, points) || isHitPolyLine(points, antiPoint)
    );
  } else {
    return isHitPolyLine(points, antiPoint);
  }
};

export const isRectangleHitFreehand = (
  board: PlaitBoard,
  element: Freehand,
  selection: Selection
) => {
  const rangeRectangle = RectangleClient.getRectangleByPoints([
    selection.anchor,
    selection.focus,
  ]);
  return isRectangleHitRotatedPoints(
    rangeRectangle,
    element.points,
    element.angle
  );
};

export const getSelectedFreehandElements = (board: PlaitBoard) => {
  return getSelectedElements(board).filter((ele) => Freehand.isFreehand(ele));
};

export const getFreehandDefaultStrokeColor = (theme: ThemeColorMode) => {
  return FreehandThemeColors[theme].strokeColor;
};

export const getFreehandDefaultFill = (theme: ThemeColorMode) => {
  return FreehandThemeColors[theme].fill;
};

export const getStrokeColorByElement = (
  board: PlaitBoard,
  element: PlaitElement
) => {
  const defaultColor = getFreehandDefaultStrokeColor(
    board.theme.themeColorMode
  );
  const strokeColor = element.strokeColor || defaultColor;
  return strokeColor;
};

export const getFillByElement = (board: PlaitBoard, element: PlaitElement) => {
  const defaultFill =
    Freehand.isFreehand(element) && isClosedCustomGeometry(board, element)
      ? getFreehandDefaultFill(board.theme.themeColorMode)
      : DefaultDrawStyle.fill;
  const fill = element.fill || defaultFill;
  return fill;
};

export function gaussianWeight(x: number, sigma: number) {
  return Math.exp(-(x * x) / (2 * sigma * sigma));
}

export function gaussianSmooth(
  points: Point[],
  sigma: number,
  windowSize: number
) {
  if (points.length < 2) return points;

  const halfWindow = Math.floor(windowSize / 2);
  const smoothedPoints: Point[] = [];

  // Approach 1: mirror points beyond each end of the polyline.
  function getMirroredPoint(idx: number): Point {
    if (idx < 0) {
      // Mirror the left edge.
      const mirrorIdx = -idx - 1;
      if (mirrorIdx < points.length) {
        // Reflect around the first point.
        return [
          2 * points[0][0] - points[mirrorIdx][0],
          2 * points[0][1] - points[mirrorIdx][1],
        ];
      }
    } else if (idx >= points.length) {
      // Mirror the right edge.
      const mirrorIdx = 2 * points.length - idx - 1;
      if (mirrorIdx >= 0) {
        // Reflect around the final point.
        return [
          2 * points[points.length - 1][0] - points[mirrorIdx][0],
          2 * points[points.length - 1][1] - points[mirrorIdx][1],
        ];
      }
    }
    return points[idx];
  }

  // Approach 2: adjust the window size near the edges.
  function getAdaptiveWindow(i: number): number {
    // Narrow the window when approaching each boundary.
    const distToEdge = Math.min(i, points.length - 1 - i);
    return Math.min(halfWindow, distToEdge + Math.floor(halfWindow / 2));
  }

  for (let i = 0; i < points.length; i++) {
    let sumX = 0;
    let sumY = 0;
    let weightSum = 0;

    // Use an adaptive window for endpoints.
    const adaptiveWindow = getAdaptiveWindow(i);

    for (let j = -adaptiveWindow; j <= adaptiveWindow; j++) {
      const idx = i + j;
      const point = getMirroredPoint(idx);

      // Apply a gradient weight at the endpoints.
      let weight = gaussianWeight(j, sigma);

      // Slightly boost the original endpoint values.
      if (i < halfWindow || i >= points.length - halfWindow) {
        const edgeFactor = 1 + 0.5 * (1 - Math.abs(j) / adaptiveWindow);
        weight *= j === 0 ? edgeFactor : 1;
      }

      sumX += point[0] * weight;
      sumY += point[1] * weight;
      weightSum += weight;
    }

    if (i === 0 || i === points.length - 1) {
      smoothedPoints.push([points[i][0], points[i][1]]);
    } else {
      smoothedPoints.push([sumX / weightSum, sumY / weightSum]);
    }
  }

  return smoothedPoints;
}
