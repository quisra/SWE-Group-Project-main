import { screen } from "@/styles/styleConstants";
import { useState } from "react";
import styled from "styled-components";

export default function NoteCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NoteCardWrapper isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <Text isOpen={!isOpen} isBackSide={false}>
          {question}
          <SmallText>Click to Open</SmallText>
        </Text>
        <Text isOpen={isOpen} isBackSide={true}>
          {answer}
        </Text>
      </NoteCardWrapper>
    </>
  );
}

const SmallText = styled.div`
  padding-top: 0.25rem;
  font-size: 0.5em;
  font-weight: 500;
`;

const Text = styled.span`
  font-size: 2em;

  position: absolute;
  text-align: center;

  word-break: break-word;

  margin: 1.5rem;

  transition: 0s 0.2s linear opacity;
  opacity: ${(props: { isOpen: boolean; isBackSide: boolean }) =>
    props.isOpen ? "1" : "0"};

  transform: ${(props: { isOpen: boolean; isBackSide: boolean }) =>
    props.isBackSide ? "rotateX(180deg)" : "rotateX(0)"};

@media (max-width: ${screen.laptop}) {
    margin: 1rem;
  }

  @media (max-width: ${screen.tablet}) {
    margin: 0.5rem;
    transform: ${(props: { isOpen: boolean; isBackSide: boolean }) =>
      props.isBackSide ? "rotateY(180deg)" : "rotateY(0)"};
  }

  @media (max-width: ${screen.mobile}) {
    margin: 0.25rem;
  }
`;

type wrapperProps = { isOpen: boolean };

const NoteCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  font-size: 1.25rem;
  font-weight: 700;

  box-sizing: border-box;
  background-color: #fafafa;

  margin: 1rem;

  transition: 0.4s linear transform, 0.4s linear box-shadow;
  box-shadow: ${(props: wrapperProps) =>
    props.isOpen
      ? "0.5rem -0.25rem 1.25rem #00000040"
      : "0.5rem  0.25rem 1.25rem #00000040"};

  transform: ${(props: wrapperProps) =>
    props.isOpen ? "rotateX(180deg)" : "rotateX(0deg)"};
  cursor: pointer;

  height: 50vh;
  width: 50vw;

  @media (max-width: ${screen.desktop}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${screen.laptop}) {
    font-size: 1rem;
  }

  @media (max-width: ${screen.tablet}) {
    font-size: 0.9rem;

    box-shadow: ${(props: wrapperProps) =>
      props.isOpen
        ? "-0.5rem  0.25rem 1.25rem #00000040"
        : "0.5rem  0.25rem 1.25rem #00000040"};

    transform: ${(props: wrapperProps) =>
      props.isOpen ? "rotateY(180deg)" : "rotateY(0deg)"};
    cursor: pointer;

    width: 75vw;
  }

  @media (max-width: ${screen.mobile}) {
    font-size: 0.8rem;
    height: 40vh;
    width: 90vw;
  }
`;
