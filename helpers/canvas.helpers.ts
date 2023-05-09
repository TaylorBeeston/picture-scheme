import chroma from "chroma-js";

import { Color } from "../types/colors";

/**
 * Definitely gets a CanvasRenderingContext2D
 */
export const get2dContext = (
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D => {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Browser does not support 2d context");
  return ctx;
};

/**
 * Quantizes the colors of a given canvas to a given color scheme using LCH colorspace
 */
export const fixCanvasColors = (
  sourceCanvas: HTMLCanvasElement,
  colors: Color[]
): HTMLCanvasElement => {
  const hues = colors.map((color) => {
    const hue = chroma(color).hcl()[0];

    return Number.isNaN(hue) ? 0 : hue;
  });

  const fixedCanvas = document.createElement("canvas")!;
  fixedCanvas.width = sourceCanvas.width;
  fixedCanvas.height = sourceCanvas.height;
  const fixedCtx = get2dContext(fixedCanvas);

  const sourceImageData = get2dContext(sourceCanvas).getImageData(
    0,
    0,
    sourceCanvas.width,
    sourceCanvas.height
  );
  const destinationImageData = fixedCtx.createImageData(
    fixedCanvas.width,
    fixedCanvas.height
  );

  for (let row = 0; row < destinationImageData.height; row += 1) {
    for (let column = 0; column < destinationImageData.width; column += 1) {
      const currentPixel = (column + destinationImageData.width * row) * 4;

      const color = chroma(
        sourceImageData.data[currentPixel],
        sourceImageData.data[currentPixel + 1],
        sourceImageData.data[currentPixel + 2]
      );

      const hcl = color.hcl();

      const closestHue = hues.reduce((previous, current) => {
        return Math.abs(previous - hcl[0]) > Math.abs(current - hcl[0])
          ? current
          : previous;
      }, hues[0]);

      const newColor = chroma.hcl([closestHue, hcl[1], hcl[2]]).rgb();

      destinationImageData.data[currentPixel] = newColor[0];
      destinationImageData.data[currentPixel + 1] = newColor[1];
      destinationImageData.data[currentPixel + 2] = newColor[2];
      destinationImageData.data[currentPixel + 3] =
        sourceImageData.data[currentPixel + 3];
    }
  }

  fixedCtx.putImageData(destinationImageData, 0, 0);

  return fixedCanvas;
};
