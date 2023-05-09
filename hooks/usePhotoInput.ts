import { useRef, MutableRefObject } from "react";
import { fixColors } from "../helpers/photo.helpers";
import { getDatePhotoWasTaken } from "../helpers/exif.helpers";
import { PhotoFile } from "../types/photos";
import { Color } from "../types/colors";

type PhotoInputValues = {
  input: MutableRefObject<HTMLInputElement>;
  selectPhotos: () => void;
  addPhotos: () => Promise<void>;
};

const usePhotoInput = (
  onChange: (photos: PhotoFile[]) => void,
  photos: PhotoFile[],
  colors: Color[]
): PhotoInputValues => {
  const input = useRef<HTMLInputElement>(null!);

  const addPhotos = async () => {
    if (input.current.files) {
      const newPhotos = await Promise.all(
        [...Array.from(input.current.files)].map(async (file) => ({
          photo: await fixColors(file, colors),
          name: file.name,
          date: await getDatePhotoWasTaken(file),
        }))
      );
      onChange([...photos, ...newPhotos]);
      input.current.files = null;
    }
  };

  const selectPhotos = (): void => {
    input.current.click();
  };

  return { input, selectPhotos, addPhotos };
};

export default usePhotoInput;
