import { screen } from "@/styles/styleConstants";
import styled from "styled-components";

export default function FieldTitles() {
  return (
    <FieldTitlesWrapper>
      <InputFieldTitle style={{ borderRight: "1px solid #ccc" }}>
        Question
      </InputFieldTitle>
      <InputFieldTitle style={{ borderLeft: "1px solid #ccc" }}>
        Answer
      </InputFieldTitle>
    </FieldTitlesWrapper>
  );
}

const FieldTitlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  margin: 0 0.5rem;

  @media (max-width: ${screen.tablet}) {
    margin: 0 0rem;
  }
`;

const InputFieldTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 1.75rem;
  padding: 1.25rem 0;

  background-color: #eee;
`;
