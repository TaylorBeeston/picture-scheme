import { useState, FC } from "react";

import FileInput from "../components/FileInput";
import ColorSchemeInput from "../components/ColorSchemeInput";

import { PhotoFile } from "../types/photos";
import { Color } from "../types/colors";

const defaultColors = [
  "#1d1f21",
  "#cc6666",
  "#b5bd68",
  "#f0c674",
  "#81a2be",
  "#b294bb",
  "#8abeb7",
  "#c5c8c6",
];

const Home: FC = () => {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [colors, setColors] = useState<Color[]>(defaultColors);

  return (
    <>
      <h1 className="text-5xl">
        Please set a colorscheme and then select some photos to scheme!
      </h1>
      <ColorSchemeInput colors={colors} setColors={setColors} />
      <FileInput photos={photos} setPhotos={setPhotos} colors={colors} />
    </>
  );
};

export default Home;
