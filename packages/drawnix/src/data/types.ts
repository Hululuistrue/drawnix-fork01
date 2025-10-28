import { PlaitElement, Viewport } from '@plait/core';

export interface DrawnixExportedData {
  type: DrawnixExportedType.monet;
  version: number;
  source: 'web';
  elements: PlaitElement[];
  viewport: Viewport;
}

export enum DrawnixExportedType {
    monet = 'monet'
}
