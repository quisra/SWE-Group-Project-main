import styled from "styled-components";
import { colors, fonts, screen } from "@/styles/styleConstants";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterSection>
        <MainInfoTitle>Group 10</MainInfoTitle>
      </FooterSection>

      <FooterSection>
        <GroupMembersTitle>Group Members</GroupMembersTitle>
        <div>
          <GroupMemberName>Jessica Rawson</GroupMemberName>
          <GroupMemberName>Karim Hussien</GroupMemberName>
          <GroupMemberName>Richfield Quist</GroupMemberName>
          <GroupMemberName>Jordan Fong</GroupMemberName>
          <GroupMemberName>Alex Keo</GroupMemberName>
        </div>
      </FooterSection>

      <Copyright>
        <span>Copyright © 2023 Group 10. All rights reserved.</span>
      </Copyright>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  box-sizing: border-box;
  height: 15rem;
  width: 100%;
  padding: 2rem 4rem;

  background-color: ${colors.nearWhite};
  color: ${colors.nearBlack};

  display: flex;
  justify-content: space-between;
  gap: 2rem;

  position: relative;

  @media (max-width: ${screen.tablet}) {
    padding: 2rem 2rem;
  }
`;

const MainInfoTitle = styled.div`
  font-weight: 600;
  font-family: ${fonts.serifMain};
  font-size: 2rem;

  @media (max-width: ${screen.tablet}) {
    font-size: 1.5rem;
  }
`;

const FooterSection = styled.div``;

const Copyright = styled.div`
  position: absolute;
  bottom: 0rem;
  left: 50%;

  display: flex;
  flex-direction: column;
  justify-content: end;

  transform: translateX(-50%);

  span {
    margin: 0.25rem;
    font-size: 0.75rem;
    font-family: ${fonts.sansSerifMain};
    text-align: center;
    white-space: nowrap;

    @media (max-width: ${screen.tablet}) {
      font-size: 0.6rem;
    }
  }
`;

const GroupMembersTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  font-family: ${fonts.serifMain};

  text-align: right;

  @media (max-width: ${screen.tablet}) {
    font-size: 1.25rem;
  }
`;

const GroupMemberName = styled.div`
  font-size: 1.25rem;
  font-family: ${fonts.sansSerifMain};

  text-align: right;

  @media (max-width: ${screen.tablet}) {
    font-size: 1rem;
  }
`;
