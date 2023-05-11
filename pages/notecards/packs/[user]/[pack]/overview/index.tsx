import { NotecardSetContext } from "@/components/layout/notecards/NotecardSetContext";
import NotecardLayout from "@/components/layout/notecards/layout";
import { useContext } from "react";
import Head from "next/head";
import styled from "styled-components";
import { images } from "@/temp/images";
import { colors, screen } from "@/styles/styleConstants";

export default function NotecardsOverviewPage() {
  const { notecardSet } = useContext(NotecardSetContext);

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  return (
    <>
      <Head>
        <title>Notecards Overview | UNF App</title>
      </Head>
      <main>
        <Header>
          <StyledImage
            src={
              notecardSet.imageUrl
                ? notecardSet.imageUrl
                : images[getRandomInt(0, images.length)]
            }
          />
          <HeaderText>
            Overview of {notecardSet.name} by {notecardSet.creator.name}
          </HeaderText>
        </Header>
        <GridHolder>
          <StickyElement>
            <ColumnTitle>Question</ColumnTitle>
            <ColumnTitle>Answer</ColumnTitle>
          </StickyElement>
          <CardGrid>
            {notecardSet.notecards?.map((card) => (
              <GridElement key={card.noteid}>
                <QuestionElement>{card.question}</QuestionElement>
                <AnswerElement>{card.answer}</AnswerElement>
              </GridElement>
            ))}
          </CardGrid>
        </GridHolder>
      </main>
    </>
  );
}

const ColumnTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.75rem;
  font-weight: 700;
`;

const HorizontalRule = styled.hr`
  margin: 0 2rem;

  @media (max-width: ${screen.tablet}) {
    margin: 0 0.25rem;
  }
`;

const GridHolder = styled.div`
  position: relative;
  padding-top: 4rem;
`;

const GridElement = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

  font-weight: 600;
  font-size: 1.5rem;

  background-color: #eee;

  border: 2px solid #e8e8e8;

  margin: 1.25rem 0.5rem;

  @media (max-width: ${screen.laptop}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${screen.tablet}) {
    grid-template-columns: 1fr 1fr;
    font-size: 1.1rem;
  }

  @media (max-width: ${screen.mobile}) {
    font-size: 1rem;
  }
`;

const StickyElement = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;

  box-sizing: border-box;

  padding-right: 20px;

  display: grid;
  grid-template-columns: 1fr 2fr;

  height: 4rem;

  width: 100%;
  color: black;
  /* background-color: #ddd; */
  border-bottom: 3px solid ${colors.unfBlueNearWhite};

  @media (max-width: ${screen.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const QuestionElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  margin: 1rem;
  padding: 1rem;

  word-break: break-word;

  border-right: 3px solid #c8c8c8;

  @media (max-width: ${screen.tablet}) {
    margin: 0.5rem;
    padding: 0.5rem;
  }

  @media (max-width: ${screen.mobile}) {
    margin: 0.25rem;
    padding: 0.25rem;
  }
`;

const AnswerElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  margin: 1rem;
  padding: 1rem;

  word-break: break-word;

  @media (max-width: ${screen.tablet}) {
    margin: 0.5rem;
    padding: 0.5rem;
  }

  @media (max-width: ${screen.mobile}) {
    margin: 0.25rem;
    padding: 0.25rem;
  }
`;

const CardGrid = styled.div`
  height: calc(100vh - 5rem - 15rem - 4rem);
  overflow-y: scroll;

  @media (min-width: ${screen.tablet}) {
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
  }
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  filter: brightness(0.35);
`;

const HeaderText = styled.div`
  font-size: 1.75rem;
  font-weight: 800;

  text-align: center;

  color: #eee;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: ${screen.tablet}) {
    font-size: 1.25rem;
  }
  @media (max-width: ${screen.mobile}) {
    font-size: 1.1rem;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 11rem;

  background-color: #111;

  position: relative;

  @media (max-width: ${screen.desktop}) {
    height: 10rem;
  }
  @media (max-width: ${screen.laptop}) {
    height: 9rem;
  }
  @media (max-width: ${screen.tablet}) {
    height: 10rem;
  }
  @media (max-width: ${screen.mobile}) {
    height: 8rem;
  }
`;

NotecardsOverviewPage.getLayout = function getLayout(page: any) {
  return <NotecardLayout>{page}</NotecardLayout>;
};
