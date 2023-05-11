import styled from "styled-components";
import data, { locationType } from "@/temp/locationData";
import { useState } from "react";
import { Search, X } from "tabler-icons-react";
import { colors, screen } from "@/styles/styleConstants";

export default function SearchElement({
  setCenter,
  setActiveLocation,
  closeMenu,
}: {
  setCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  setActiveLocation: React.Dispatch<React.SetStateAction<locationType>>;
  closeMenu: React.Dispatch<void>;
}) {
  const [filteredList, setFilteredList] = useState(data);

  function updateFilteredList(query: string) {
    setFilteredList(
      data.filter((location) =>
        location.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  return (
    <KeyPointsOfInterest>
      <Header>
        <Title>Key Points of Interest</Title>
        <CloseButton onClick={() => closeMenu()}>
          <StyledDesktopX size="2.5rem" color="white" strokeWidth={3} />
          <StyledMobileX size="1.5rem" color="white" strokeWidth={3} />
        </CloseButton>
      </Header>
      <SearchComponent>
        <SearchBar
          onChange={(e) => {
            updateFilteredList(e.target.value);
          }}
        />
        <StyledSearchIcon size="2rem" />
      </SearchComponent>
      <POIList>
        {filteredList.map((point) => (
          <PointOfInterest
            onClick={() => {
              closeMenu();
              setCenter({
                lat: point.coordinates.lat,
                lng: point.coordinates.lng,
              });
              setActiveLocation(point);
            }}
            key={point.number}
          >
            {point.name}
          </PointOfInterest>
        ))}
      </POIList>
    </KeyPointsOfInterest>
  );
}

const StyledDesktopX = styled(X)`
  display: inline;
  @media (max-width: ${screen.tablet}) {
    display: none;
  }
`;

const StyledMobileX = styled(X)`
  display: none;
  @media (max-width: ${screen.tablet}) {
    display: inline;
  }
`;

const CloseButton = styled.div`
  padding: 0.5rem;

  margin-left: 1rem;
  background-color: #a82020;
  border-radius: 25%;

  width: 2.5rem;
  height: 2.5rem;

  cursor: pointer;

  @media (max-width: ${screen.tablet}) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Header = styled.div`
  height: 5rem;

  display: flex;
  justify-content: space-between;

  @media (max-width: ${screen.tablet}) {
    height: 4rem;
  }
`;

const StyledSearchIcon = styled(Search)`
  padding-right: 0.5rem;
  cursor: pointer;
`;

const SearchBar = styled.input`
  background-color: transparent;
  border: none;

  width: 100%;

  border-radius: 3rem;
  padding: 0.5rem 1.25rem;

  font-size: 1.25rem;
  line-height: 1.25rem;
  font-weight: 800;
  font-family: inherit;
`;

const SearchComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  margin-left: 1rem;
  margin-right: calc(1rem - 10px);

  border-radius: 3rem;
  border: 2px solid #0005;

  @media (max-width: ${screen.mobile}) {
    margin-left: 0.5rem;
    margin-right: calc(0.5rem - 10px);
  }
`;

const POIList = styled.div`
  height: calc(100vh - 5rem - 5rem - 2rem - 2.25rem - 2rem);
  overflow-y: scroll;

  padding: 0 1rem;
  margin-top: 1rem;

  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #9ba5a9;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
    &:hover {
      background-color: #5c6568;
    }
  }

  @media (max-width: ${screen.mobile}) {
    padding: 0 0.5rem;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  line-height: 2rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid black;

  flex-grow: 1;

  @media (max-width: ${screen.tablet}) {
    font-size: 1.5rem;
    line-height: 1.5rem;

    margin-bottom: 1.5rem;
  }

  @media (max-width: ${screen.mobile}) {
    font-size: 1.25rem;
    line-height: 1rem;

    margin-bottom: 1.75rem;
  }
`;

const PointOfInterest = styled.div`
  margin: 1rem 0;
  padding: 1rem;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;

  box-shadow: 0.1rem 0.3rem 0.75rem #00000040;

  transition: 0.1s ease all;

  &:hover {
    cursor: pointer;

    background-color: #e2e2e2e8;
    box-shadow: 0.1rem 0.3rem 0.75rem #00000060;
  }
`;

const KeyPointsOfInterest = styled.div`
  color: ${colors.nearBlack};
  font-size: 1.5rem;
  font-weight: 700;

  padding: 1rem;

  height: calc(100vh - 5rem);

  @media (max-width: ${screen.mobile}) {
    font-size: 1.25rem;
    padding: 1rem 0.5rem;
  }
`;
