import React, { FC } from "react";
import { PhotoFile } from "types/photos";

type PhotoPreviewsProps = {
  photos: PhotoFile[];
};

const PhotoPreviews: FC<PhotoPreviewsProps> = ({ photos }) => {
  if (photos.length === 0) return <></>;

  return (
    <div className="justify-center p-4 m-4 bg-gray-100 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <img
          key={photo.name}
          src={URL.createObjectURL(photo.photo)}
          alt={photo.name}
          className="object-cover w-full h-full border border-gray-600 rounded shadow min-h-32"
        />
      ))}
    </div>
  );
};

export default PhotoPreviews;
