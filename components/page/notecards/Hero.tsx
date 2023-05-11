import { colors, screen } from "@/styles/styleConstants";
import Link from "next/link";
import styled from "styled-components";
import Button from "@/components/resuseable/button";
import { ChevronRight, ChevronsRight } from "tabler-icons-react";

export default function NotecardsHero() {
  return (
    <>
      <HeroWrapper>
        <BackgroundImage src="https://i.pinimg.com/originals/04/30/59/043059ce6533f962622a1042b79d505f.jpg" />
        <ContentWrapper>
          <Title>Create your own notecards!</Title>
          <Description>
            Create a personalized notecard pack to study efficiently for tests
            and quizzes. Share it with others to help them succeed too!
          </Description>

          <CreateLink href="/notecards/create">
            <Button isDark isMain>
              New Notecards <ChevronsRight size="1rem" />
            </Button>
          </CreateLink>
        </ContentWrapper>
      </HeroWrapper>
    </>
  );
}

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  position: absolute;
  top: 0;

  filter: brightness(0.6);
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;

  box-sizing: border-box;

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;

  position: absolute;
  top: 0;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 800;

  color: white;
  text-shadow: 0 0 1rem black;

  @media (max-width: ${screen.mobile}) {
    font-size: 2.25rem;
  }
`;

const HeroWrapper = styled.div`
  height: 80vh;

  position: relative;

  background-color: ${colors.unfBlue};
`;

const Description = styled.div`
  margin-bottom: 1rem;

  font-size: 0.9rem;
  color: white;
  text-shadow: 0 0 1rem black;

  @media (max-width: ${screen.mobile}) {
    font-size: 0.8rem;
  }
`;

const CreateLink = styled(Link)`
  text-decoration: none;
`;
