import { colors, screen } from "@/styles/styleConstants";
import Link from "next/link";
import styled from "styled-components";

export default function PopularLocations() {
  const data = [
    {
      name: "Student Union",
      url: "58",
      img: "https://files.unfospreytools.com/file/Osprey-Productivity-Tools/58.jpg",
    },
    {
      name: "Social Sciences",
      url: "51",
      img: "https://files.unfospreytools.com/file/Osprey-Productivity-Tools/51.jpg",
    },
    {
      name: "Thomas G. Carpenter Library",
      url: "12",
      img: "https://files.unfospreytools.com/file/Osprey-Productivity-Tools/59.jpg",
    },
    {
      name: "Skinner - Jones Hall",
      url: "4",
      img: "https://files.unfospreytools.com/file/Osprey-Productivity-Tools/4.jpg",
    },
  ];

  return (
    <FavoriteLocationsWrapper>
      <Title>Popular Locations</Title>

      <Locations>
        {data.map((location) => (
          <StyledLink key={location.name} href={"map/" + location.url}>
            <Location imgUrl={location.img}>
              <LocationText>{location.name}</LocationText>
            </Location>
          </StyledLink>
        ))}
      </Locations>
    </FavoriteLocationsWrapper>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Locations = styled.div`
  margin: 2rem 0.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${screen.tablet}) {
    margin: 2rem 0rem;
  }
`;

const FavoriteLocationsWrapper = styled.div`
  padding: 1rem;
  margin: 0rem 2rem;

  @media (max-width: ${screen.mobile}) {
    padding: 1rem 0;
    margin: 0rem 0.5rem;
  }
`;

const Title = styled.div`
  font-size: 1.75rem;
  font-weight: 800;

  padding-bottom: 0.5rem;
  border-bottom: 2px solid black;
`;

const LocationText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  font-size: 1.5rem;
  font-weight: 700;

  padding: 1rem;
  height: 100%;

  box-sizing: border-box;

  backdrop-filter: brightness(0.45);
  color: white;

  transition: 0.2s ease all;

  @media (max-width: ${screen.mobile}) {
    font-size: 1.25rem;
  }
`;

const Location = styled.div`
  height: 12rem;

  background-image: ${(props: { imgUrl: string }) =>
    "url('" + props.imgUrl + "')"};
  background-size: cover;
  background-position: 0;

  box-shadow: 0.1rem 0.3rem 0.75rem #00000040;

  transition: 0.1s ease all;

  &:hover {
    cursor: pointer;

    box-shadow: 0.1rem 0.3rem 0.75rem #00000060;

    ${LocationText} {
      backdrop-filter: brightness(0.9);
    }
  }
`;
