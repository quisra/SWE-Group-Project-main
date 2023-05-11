import Head from "next/head";
import styled from "styled-components";
import CampusMap from "@/components/page/map/CampusMap";
import FloorViewer from "@/components/page/map/FloorViewer";
import { useEffect, useState } from "react";
import data, { locationType } from "@/temp/locationData";
import MapLayout from "@/components/page/map/MapLayout";
import { BoxMultiple, Map } from "tabler-icons-react";
import { screen } from "@/styles/styleConstants";

export default function MapPage({ location }: { location: locationType }) {
  const [center, setCenter] = useState(location.coordinates);

  const [activeLocation, setActiveLocation] = useState(location);

  const [viewMap, setViewMap] = useState(true);

  const floors = activeLocation.images;
  const [activeImage, setActiveImage] = useState(
    activeLocation.images[0]["image"]
  );
  const [imageIndex, setImageIndex] = useState(0);
  const images = floors.map((floor: any) => ({
    src: floor.image,
    title: floor.floor,
  }));

  useEffect(() => {
    setActiveImage(floors[0]["image"]);
  }, [floors]);

  return (
    <>
      <Head>
        <title>Map | UNF App</title>
      </Head>
      <MapLayout
        setCenter={setCenter}
        setActiveLocation={setActiveLocation}
        setViewMap={setViewMap}
        floors={activeLocation.images}
        setImageIndex={setImageIndex}
        setActiveImage={setActiveImage}
        imageIndex={imageIndex}
      >
        <MainContentLayout>
          <ChangeViewButton onClick={() => setViewMap(!viewMap)}>
            {viewMap ? (
              <BoxMultiple color="white" size="1.75rem" />
            ) : (
              <Map color="white" size="1.75rem" />
            )}
          </ChangeViewButton>
          {viewMap ? (
            <CampusMap
              setCenter={setCenter}
              center={center}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
              setImageIndex={setImageIndex}
              setActiveImage={setActiveImage}
            />
          ) : (
            <FloorViewer
              activeImage={activeImage}
              images={images}
              imageIndex={imageIndex}
            />
          )}
        </MainContentLayout>
      </MapLayout>
    </>
  );
}

const MainContentLayout = styled.main`
  position: relative;

  display: flex;
  justify-content: center;
`;

const ChangeViewButton = styled.button`
  background-color: black;

  position: absolute;
  top: 4rem;
  right: 4rem;

  z-index: 2;

  height: 3.5rem;
  width: 3.5rem;

  border-radius: 50%;

  cursor: pointer;

  @media (max-width: ${screen.tablet}) {
    top: 1rem;
    left: 1rem;
  }
`;

export async function getStaticPaths() {
  const paths = data.map((point) => ({
    params: { location: point.number },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { location: string };
}) {
  return {
    props: { location: data.find((point) => point.number === params.location) },
  };
}
