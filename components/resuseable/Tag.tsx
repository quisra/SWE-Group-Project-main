import { fonts } from "@/styles/styleConstants";
import styled from "styled-components";

export default function Tag({
  children,
  color,
}:
{
  children: string;
  color: string;
}) {
  return <StyledTag color={color}>{children}</StyledTag>;
}

const StyledTag = styled.span`
  border: 2px solid ${({ color }: { color: string }) => color};
  border-radius: 1rem;

  font-size: 0.75rem;
  color: ${({ color }: { color: string }) => color};

  font-family: ${fonts.sansSerifMain};

  padding: 3px 6px;

  display: inline-flex;
  align-items: center;

  &:before {
    content: "";

    display: inline-block;
    height: 0.75rem;
    width: 0.75rem;

    border-radius: 50%;

    background-color: ${({ color }: { color: string }) => color};

    margin-right: 0.25rem;
  }
`;
