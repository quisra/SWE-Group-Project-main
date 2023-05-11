import { colors, screen } from "@/styles/styleConstants";
import { Route } from "devextreme-react/map";
import Link from "next/link";
import { ChevronsRight } from "tabler-icons-react";
import styled from "styled-components";
import data from "@/temp/homePageLinksData";

export default function Links() {
  return (
    <LinksLayout>
      {data.map((link) => (
        <PageLink
          title={link.title}
          desc={link.desc}
          imgSrc={link.img}
          route={link.route}
          key={link.title}
        />
      ))}
    </LinksLayout>
  );
}

const LinksLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;

  padding: 5rem max(3rem, calc(50vw - 50rem));

  background-color: #ddd;

  @media (max-width: ${screen.desktop}) {
    gap: 3rem;
    padding: 5rem 2rem;
  }

  @media (max-width: ${screen.laptop}) {
    gap: 0.5rem;
    padding: 5rem 1rem;
  }

  @media (max-width: ${screen.tablet}) {
    grid-template-columns: 1fr;
    gap: 4rem;
    padding: 5rem max(0.5rem, calc(50vw - 13rem));
  }
`;

function PageLink({
  imgSrc,
  title,
  desc,
  route,
}: {
  imgSrc: string;
  title: string;
  desc: string;
  route: string;
}) {
  return (
    <>
      <LinkWrapper>
        <Image src={imgSrc} alt="" loading="lazy" />
        <Title>{title}</Title>
        <Description>{desc}</Description>
        <LearnMore href={route}>
            Learn more
            <ChevronsRight size="1rem" />
        </LearnMore>
      </LinkWrapper>
    </>
  );
}

const LearnMore = styled(Link)`
  display: flex;

  justify-content: center;
  align-items: center;

  text-decoration: none;

  color: ${colors.unfBlue};
  font-weight: 700;
  font-size: 1rem;

  padding: 0.5rem;
  margin: 1rem 0;
`;

const LinkWrapper = styled.div`
  color: ${colors.nearBlack};

  padding: 2rem;
  border-radius: 1rem;

  transition: 0.2s ease box-shadow, 0.2s ease background-color;

  @media (max-width: ${screen.desktop}) {
    padding: 1.5rem;
  }

  @media (max-width: ${screen.laptop}) {
    padding: 1rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 15rem;

  object-fit: cover;

  @media (max-width: ${screen.desktop}) {
    height: 12rem;
  }
`;

const Title = styled.div`
  text-align: center;
  font-weight: 550;
  font-size: 1.25rem;

  margin: 1rem 0;

  color: ${colors.nearBlack};
`;

const Description = styled.div`
  text-align: center;
  line-height: 1.5rem;

  color: ${colors.nearBlack};
`;
