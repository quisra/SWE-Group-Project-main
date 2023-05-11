import styled from "styled-components";
import { colors, fonts } from "@/styles/styleConstants";

export default styled.button`
  padding: 1rem;

  font-size: 1rem;
  font-weight: 600;
  font-family: ${fonts.sansSerifMain};

  transition: 0.3s ease all;

  border: 4px solid
    ${(props: { isDark: boolean }) =>
      props.isDark ? colors.lightBlack : colors.darkWhite};

  //Main buttons are filled in the center to the appopriate color
  background-color: ${(props: { isMain: boolean; isDark: boolean }) => {
    if (!props.isMain) return "transparent";
    else if (props.isDark) return colors.lightBlack;
    else if (!props.isDark) return colors.darkWhite;
  }};

  //The ternary '!=' is a workaround for logical exclusive or, aka xor
  color: ${(props: { isMain: boolean; isDark: boolean }) =>
    props.isMain != props.isDark ? colors.nearBlack : colors.nearWhite};

  &:hover {
    cursor: pointer;

    //Ensures text color contrasts background
    color: ${(props: { isDark: boolean }) =>
      props.isDark ? colors.nearWhite : colors.nearBlack};

    //Makes button a ligher or darker version of its color
    background-color: ${(props: { isDark: boolean }) =>
      props.isDark ? colors.nearBlack : colors.nearWhite};

    //Makes button a ligher or darker version of its color
    border: 4px solid
      ${(props: { isDark: boolean }) =>
        props.isDark ? colors.nearBlack : colors.nearWhite};
  }
`;
