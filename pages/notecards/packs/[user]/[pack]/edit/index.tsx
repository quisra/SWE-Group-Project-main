import { UserContext } from "@/components/layout/LoginContext";
import { NotecardSetContext } from "@/components/layout/notecards/NotecardSetContext";
import NotecardLayout from "@/components/layout/notecards/layout";
import FieldTitles from "@/components/page/notecards/edit/FieldTitles";
import NotecardEdit from "@/components/page/notecards/edit/NotecardEdit";
import NotecardNew from "@/components/page/notecards/edit/NotecardNew";
import { colors, screen } from "@/styles/styleConstants";
import { images } from "@/temp/images";
import { Notecard } from "@/values/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styled from "styled-components";

export default function EditCardsPage() {
  const { notecardSet } = useContext(NotecardSetContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.nNumber != notecardSet.creator.nNumber) {
      router.push(`/notecards`);
    }
  }, [user, router, notecardSet.creator.nNumber]);

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  return (
    <>
      <Head>
        <title>Edit Notecards | UNF App</title>
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
          <HeaderText>Edit notecards</HeaderText>
        </Header>
        <NotecardsElements>
          <FieldTitles />
          {notecardSet.notecards?.map((notecard: Notecard) => (
            <NotecardEdit notecard={notecard} key={notecard.noteid} />
          ))}
          <NotecardNew />
          <BottomScollPadding />
        </NotecardsElements>
      </main>
    </>
  );
}

const BottomScollPadding = styled.div`
  height: 8rem;
`;

EditCardsPage.getLayout = function getLayout(page: any) {
  return <NotecardLayout>{page}</NotecardLayout>;
};

const NotecardsElements = styled.div`
  height: calc(100vh - 5rem - 4rem - 2rem);
  width: 100%;

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
  height: 6rem;

  background-color: #111;

  position: relative;
`;
