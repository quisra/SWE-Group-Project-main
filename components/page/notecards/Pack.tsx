import { colors, screen } from "@/styles/styleConstants";
import { User } from "@/values/types";
import Link from "next/link";
import styled from "styled-components";

export default function Pack({
  title,
  desc,
  img,
  link,
  creator,
}: {
  title: string;
  desc?: string;
  img: string;
  link: string;
  creator: User;
}) {
  function addDefaultSrc(ev: any) {
    ev.target.src = "anon-user.png";
  }

  return (
    <>
      <PackHolder>
        <PackWrapper href={link}>
          <Image src={img} alt="" />
          <TextHolder>
            <Title>{title}</Title>
            <Description>{desc}</Description>
            <Creator>
              <CreatorImg
                src={creator.imageUrl}
                onError={addDefaultSrc}
                alt=""
              />
              <CreatorName>{creator.name}</CreatorName>
            </Creator>
          </TextHolder>
        </PackWrapper>
      </PackHolder>
    </>
  );
}
const PackHolder = styled.div`
  width: 300px;
  height: 400px;

  margin: 0rem auto 3rem auto;

  display: flex;

  @media (max-width: ${screen.mobile}) {
    width: 255px;
    height: 340px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;

  filter: brightness(0.65);

  background-color: #aaa;

  position: absolute;
  top: 0;

  transition: 0.1s ease filter;
`;

const PackWrapper = styled(Link)`
  width: 100%;
  height: 100%;

  text-decoration: none;
  color: ${colors.nearBlack};

  position: relative;

  &:hover {
    ${Image} {
      filter: brightness(1);
    }
  }
`;

const TextHolder = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  box-sizing: border-box;

  color: white;

  text-shadow: 0 0 1rem black;

  padding: 1rem;
  z-index: 2;
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0.25rem 0;

  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
  white-space: -webkit-pre-wrap; /* Chrome & Safari */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  white-space: pre-wrap; /* CSS3 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  word-break: normal;
  white-space: normal;

  @media (max-width: ${screen.mobile}) {
    font-size: 1.5rem;
  }
`;

const Description = styled.div`
  line-height: 0.8rem;
  font-size: 0.8rem;

  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
  white-space: -webkit-pre-wrap; /* Chrome & Safari */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  white-space: pre-wrap; /* CSS3 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  word-break: normal;
  white-space: normal;

  @media (max-width: ${screen.mobile}) {
    line-height: 0.75rem;
    font-size: 0.75rem;
  }
`;

const Creator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  margin-top: 1rem;
`;

const CreatorImg = styled.img`
  border-radius: 50%;
  height: 20px;
  width: 20px;
  object-fit: cover;
`;

const CreatorName = styled.span`
  font-size: 0.9rem;
`;
