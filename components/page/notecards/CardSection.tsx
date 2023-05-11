import { screen } from "@/styles/styleConstants";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function CardSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: any;
}) {
  return (
    <SectionSet>
      <SectionName>{title}</SectionName>
      <SectionDescription>{description}</SectionDescription>
      <PackList>
        <StyledSwiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1500: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {children}
        </StyledSwiper>
      </PackList>
    </SectionSet>
  );
}

const SectionSet = styled.div`
  margin: 3rem 3rem;
  border-radius: 2rem;

  @media (max-width: ${screen.laptop}) {
    margin: 3rem 2rem;
  }

  @media (max-width: ${screen.tablet}) {
    margin: 3rem 1rem;
  }

  @media (max-width: ${screen.mobile}) {
    margin: 3rem 0.5rem;
  }
`;

const SectionName = styled.div`
  font-weight: 600;
  font-size: 2.5rem;

  @media (max-width: ${screen.mobile}) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.div`
  font-size: 1rem;
  @media (max-width: ${screen.mobile}) {
    font-size: 0.9rem;
  }
`;

const PackList = styled.div`
  margin-top: 2rem;
`;

const StyledSwiper = styled(Swiper)`
  @media (max-width: ${screen.tablet}) {
    .swiper-button-prev {
      display: none;
    }

    .swiper-button-next {
      display: none;
    }
  }
`;
