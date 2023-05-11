import NotecardLayout from "@/components/layout/notecards/layout";
import Head from "next/head";
import styled from "styled-components";
import NoteCard from "@/components/page/notecards/NoteCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { NotecardSetContext } from "@/components/layout/notecards/NotecardSetContext";
import { useContext } from "react";
import { images } from "@/temp/images";
import { colors, screen } from "@/styles/styleConstants";

export default function StudyPage() {
  const { notecardSet, setNotecardSet } = useContext(NotecardSetContext);

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  return (
    <>
      <Head>
        <title>Study Notecards | UNF App</title>
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
          <HeaderText>Studying {notecardSet.name}</HeaderText>
        </Header>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {notecardSet.notecards?.map((card) => (
            <SwiperSlide key={card.noteid}>
              <SlideWrapper>
                <NoteCard question={card.question} answer={card.answer} />
              </SlideWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </>
  );
}

StudyPage.getLayout = function getLayout(page: any) {
  return <NotecardLayout>{page}</NotecardLayout>;
};

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
  font-size: 1.5rem;
  }
  @media (max-width: ${screen.mobile}) {
  font-size: 1.25rem;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 9rem;

  background-color: #111;

  position: relative;

  @media (max-width: ${screen.desktop}) {
    height: 8rem;
  }
  @media (max-width: ${screen.laptop}) {
    height: 7rem;
  }
  @media (max-width: ${screen.tablet}) {
    height: 8rem;
  }
  @media (max-width: ${screen.mobile}) {
    height: 6rem;
  }
`;

const SlideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 2rem;
`;
