import { getCanvasFromFile, getJpegFileFromCanvas } from "./file.helpers";
import { fixCanvasColors } from "./canvas.helpers";
import { Color } from "../types/colors";

/**
 * Fix colors
 */
export const fixColors = async (
  photo: File,
  colors: Color[]
): Promise<File> => {
  const canvas = fixCanvasColors(await getCanvasFromFile(photo), colors);

  return getJpegFileFromCanvas(canvas, 1, photo);
};
