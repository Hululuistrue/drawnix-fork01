import { DEFAULT_COLOR } from '@plait/core';
import { TRANSPARENT, NO_COLOR, WHITE } from '../constants/color';

// Convert an opacity value in the range 0-100 to an alpha value in the range 0-255.
function transparencyToAlpha255(transparency: number) {
  return Math.round(((100 - transparency) / 100) * 255);
}

// Convert an alpha value in the range 0-255 to an opacity value in the range 0-100.
function alpha255ToTransparency(alpha255: number) {
  return Math.round((1 - alpha255 / 255) * 100);
}

export function applyOpacityToHex(hexColor: string, opacity: number) {
  const alpha = transparencyToAlpha255(100 - opacity);
  const alphaHex = alpha.toString(16).padStart(2, '0');
  return `${hexColor}${alphaHex}`;
}

export function hexAlphaToOpacity(hexColor: string) {
  // Remove a leading # if present.
  hexColor = hexColor.replace(/^#/, '');

  let alpha;
  if (hexColor.length === 8) {
    // Eight-digit hex: use the last two digits as the alpha channel.
    alpha = parseInt(hexColor.slice(6, 8), 16);
  } else if (hexColor.length === 4) {
    // Four-digit shorthand hex: repeat the last digit to form the alpha channel.
    alpha = parseInt(hexColor.slice(3, 4).repeat(2), 16);
  } else {
    // No alpha channel means the color is fully opaque.
    return 100;
  }

  return 100 - alpha255ToTransparency(alpha);
}

export function isValidColor(color: string) {
  if (color === 'none') {
    return false;
  }
  return true;
}

export function removeHexAlpha(hexColor: string) {
  // Remove an optional leading # and normalize to uppercase.
  const hexColorClone = hexColor.replace(/^#/, '').toUpperCase();

  if (hexColorClone.length === 8) {
    // Eight-digit hex: drop the final two characters.
    return '#' + hexColorClone.slice(0, 6);
  } else if (hexColorClone.length === 4) {
    // Four-digit shorthand hex: drop the final character.
    return '#' + hexColorClone.slice(0, 3);
  } else if (hexColorClone.length === 6 || hexColorClone.length === 3) {
    // Already a standard six or three character hex code.
    return '#' + hexColorClone;
  } else {
    return hexColor;
  }
}

export function isTransparent(color?: string) {
  return color === TRANSPARENT;
}

export function isWhite(color?: string) {
  return color === WHITE;
}

export function isFullyTransparent(opacity: number) {
  return opacity === 0;
}

export function isFullyOpaque(opacity: number) {
  return opacity === 100;
}

export function isNoColor(value: string) {
  return value === NO_COLOR;
}

export function isDefaultStroke(color?: string) {
  return !color || color === DEFAULT_COLOR;
}
