import { colors, screen } from "@/styles/styleConstants";
import data, { locationType } from "@/temp/locationData";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

export default function CampusMap({
  center,
  setCenter,
  activeLocation,
  setActiveLocation,
  setImageIndex,
  setActiveImage,
}: {
  center: { lat: number; lng: number };
  setCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  activeLocation: locationType;
  setActiveLocation: React.Dispatch<React.SetStateAction<locationType>>;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setActiveImage: React.Dispatch<React.SetStateAction<string>>;
}) {
  function _onChange({
    center,
    zoom,
  }: {
    center: { lat: number; lng: number };
    zoom: number;
  }) {
    setCenter(center);
  }

  return (
    <MapHolder>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process?.env?.NEXT_PUBLIC_GOOGLE_MAPS_APIKEYY
            ? process?.env?.NEXT_PUBLIC_GOOGLE_MAPS_APIKEYY
            : "",
        }}
        defaultZoom={16}
        center={center}
        onChange={_onChange}
      >
        {data.map((point) => (
          <MapMarker
            lat={point.coordinates.lat}
            lng={point.coordinates.lng}
            onClick={() => {
              setCenter({
                lat: point.coordinates.lat,
                lng: point.coordinates.lng,
              });
              setActiveLocation(point);
              setActiveImage(point.images[0].image);
              setImageIndex(0);
            }}
            isActive={activeLocation.number == point.number}
            key={point.number}
          >
            {point.number}
          </MapMarker>
        ))}
      </GoogleMapReact>
    </MapHolder>
  );
}

const MapHolder = styled.div`
  height: calc(100vh - 5rem);
  width: 100%;

  @media (max-width: ${screen.tablet}) {
    height: calc(100vh - 5rem - 5rem);
  }
`;

function MapMarker({
  lat,
  lng,
  isActive,
  children,
  onClick,
}: {
  lat: number;
  lng: number;
  isActive: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <Marker isActive={isActive} onClick={onClick}>
      {children}
    </Marker>
  );
}

const Marker = styled.div`
  background-color: rgba(0, 0, 0, 0.8);

  background-color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "rgb(0, 81, 255)" : "rgba(0, 0, 0, 0.8)"};
  color: #fff;
  text-align: center;
  padding: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "7.5px 0.75rem" : "5px 0.5rem"};
  border-radius: 6px;

  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;

  transform: translate(-50%, calc(-100% - 14px));

  transition: 100ms ease background-color, 100ms ease padding;

  &::after {
    content: " ";
    position: absolute;
    top: calc(100%);
    /* At the bottom of the tooltip */
    left: 50%;

    margin-left: -8px;
    border-width: 8px;
    border-top-width: 14px;
    border-style: solid;
    border-color: ${({ isActive }: { isActive: boolean }) =>
        isActive ? "rgb(0, 81, 255)" : "rgba(0, 0, 0, 0.8)"}
      transparent transparent transparent;
  }
`;
