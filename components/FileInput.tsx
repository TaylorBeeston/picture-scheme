import React, { FC } from "react";
import PhotoPreviews from "../components/Photos/PhotoPreviews";
import usePhotoInput from "../hooks/usePhotoInput";
import { PhotoFile } from "../types/photos";
import { Color } from "../types/colors";

const PhotoInput: FC<{
  photos: PhotoFile[];
  setPhotos: React.Dispatch<PhotoFile[]>;
  colors: Color[];
}> = ({ photos, setPhotos, colors }) => {
  const { input, selectPhotos, addPhotos } = usePhotoInput(
    setPhotos,
    photos,
    colors
  );

  return (
    <div className="flex flex-col w-full h-full flex-center">
      <button type="button" onClick={selectPhotos} className="card">
        <h3 className="text-xl">Click Here To Add Photos</h3>
      </button>
      <input
        name="photos"
        ref={input}
        type="file"
        multiple
        onChange={addPhotos}
        className="hidden"
        accept="image/*"
      />
      <PhotoPreviews photos={photos} />
    </div>
  );
};

export default PhotoInput;
