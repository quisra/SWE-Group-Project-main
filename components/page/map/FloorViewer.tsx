import { colors, screen } from "@/styles/styleConstants";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import "yet-another-react-lightbox/plugins/captions.css";
export default function FloorViewer({
  activeImage,
  images,
  imageIndex,
}: {
  activeImage: string;
  images: {
    src: string;
    title: string;
  }[];
  imageIndex: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image src={activeImage} onClick={() => setOpen(true)} alt="" />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={imageIndex}
        slides={images}
        plugins={[Thumbnails, Zoom, Captions]}
      />
    </>
  );
}

const Image = styled.img`
  width: 100%;
  height: calc(100vh - 5rem);

  object-fit: contain;

  cursor: pointer;

  @media (max-width: ${screen.tablet}) {
    height: calc(100vh - 5rem - 5rem);
  }
`;
