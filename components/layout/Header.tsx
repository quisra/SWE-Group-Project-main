import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { colors, fonts, screen } from "@/styles/styleConstants";
import { Menu2, X } from "tabler-icons-react";
import Link from "next/link";
import { UserContext } from "./LoginContext";
import { CalendarContext } from "./CalendarContext";
import data from "@/temp/calendarData";

export default function Header() {
  //Makes header background transparent or frosted glass when user scrolls down past 10px
  const [headerTransparent, setHeaderTransparent] = useState(true);
  useEffect(() => {
    const checkScrollHeight = () => {
      const scrollY = window.pageYOffset;
      if (headerTransparent != scrollY < 10) {
        setHeaderTransparent(scrollY < 10);
      }
    };

    window.addEventListener("scroll", checkScrollHeight); // add event listener
    return () => {
      window.removeEventListener("scroll", checkScrollHeight); // clean up
    };
  }, [headerTransparent]);

  //Shows menu on click of top right button
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <UpperHeader
        isTransparent={headerTransparent && !showMenu}
        onMouseEnter={() => setHeaderTransparent(false)}
        onMouseLeave={() => {
          if (scrollY < 10 && !showMenu) setHeaderTransparent(true);
        }}
      >
        <Link
          href="/"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <Image
            src="https://files.unfospreytools.com/file/Osprey-Productivity-Tools/logo.png"
            // src="logo.png" BACKUP
            alt=""
          />
        </Link>
        {showMenu ? (
          <CloseButton
            size="3rem"
            strokeWidth={3}
            color={colors.unfBlue}
            onClick={() => setShowMenu(!showMenu)}
          />
        ) : (
          <MenuButton
            size="3rem"
            strokeWidth={3}
            color={colors.unfBlue}
            onClick={() => setShowMenu(!showMenu)}
          />
        )}

        <Menu
          show={showMenu}
          closeMenu={() => {
            setShowMenu(false);
          }}
        />
      </UpperHeader>
    </>
  );
}

function Menu({ show, closeMenu }: { show: boolean; closeMenu: () => void }) {
  const { setEvents } = useContext(CalendarContext);
  const { user, setUser } = useContext(UserContext);

  function addDefaultSrc(ev: any) {
    ev.target.src = "anon-user.png";
  }

  return (
    <>
      <MenuWrapper show={show}>
        <MenuFlex>
          <NavButtons>
            <NavButton href="/calendar" onClick={closeMenu}>
              <NavText>Calendar</NavText>
            </NavButton>
            <NavButton href="/map" onClick={closeMenu}>
              <NavText>Map</NavText>
            </NavButton>
            <NavButton href="/notecards" onClick={closeMenu}>
              <NavText>Notecards</NavText>
            </NavButton>
          </NavButtons>

          {user ? (
            <div>
              <UserInfoHolder href="/users/edit" onClick={closeMenu}>
                <UserImg
                  src={user.imageUrl ? user.imageUrl : "anon-user.png"}
                  onError={addDefaultSrc}
                />
                <UserName>{user.name}</UserName>
              </UserInfoHolder>
              <LogoutButton
                onClick={() => {
                  setEvents(data);
                  setUser(null);
                }}
              >
                Logout
              </LogoutButton>
            </div>
          ) : (
            <LoginButton href="/users/create" onClick={closeMenu}>
              Login / Register
            </LoginButton>
          )}
        </MenuFlex>
      </MenuWrapper>
    </>
  );
}

const UserImg = styled.img`
  width: 50px;
  height: 50px;

  border-radius: 50%;

  transition: 150ms ease border;

  border: 5px solid ${colors.unfBlue};
`;

const UserInfoHolder = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 2rem;

  gap: 1rem;

  color: ${colors.unfBlue};
  text-decoration: none;

  transition: 150ms ease color;

  &:hover {
    color: ${colors.unfBlueLighter};

    ${UserImg} {
      border: 5px solid ${colors.unfBlueLighter};
    }
  }
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 2rem;
  height: 100%;
`;

const LogoutButton = styled.button`
  all: unset;
  background-color: #0a0927;
  color: white;

  width: max-content;
  padding: 1.5rem;
  margin: 2rem;

  text-decoration: none;
  font-size: 1.75rem;
  font-weight: 800;

  display: flex;
  align-items: center;

  transition: 100ms ease background-color;

  cursor: pointer;

  &:hover {
    background-color: #2d2a4b;
  }

  &:focus {
    outline: 1px solid blue;
  }
`;

const LoginButton = styled(Link)`
  background-color: #0a0927;
  color: white;

  width: max-content;
  padding: 1.5rem;
  margin: 2rem;

  text-decoration: none;
  font-size: 1.75rem;
  font-weight: 800;

  display: flex;
  align-items: center;

  transition: 100ms ease background-color;

  &:hover {
    background-color: #2d2a4b;
  }
`;

const MenuFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;

  @media (max-width: ${screen.tablet}) {
    padding-bottom: 5rem;
  }

  box-sizing: border-box;
`;

const NavButtons = styled.div`
  flex-direction: column;
  gap: 1rem;
`;

const NavButton = styled(Link)`
  color: ${colors.nearBlack};
  text-decoration: none;

  transition: 100ms ease background-color;

  text-decoration: none;
  font-size: 2.25rem;
  font-weight: 600;

  display: flex;
  align-items: center;

  &:hover {
    background-color: #ddd;
  }
`;

const NavText = styled.div`
  margin: 1rem;
  padding: 0.5rem;

  color: ${colors.nearBlack};

  font-size: 2rem;
  font-weight: 600;
  font-family: ${fonts.sansSerifMain};
`;

const MenuWrapper = styled.div`
  position: fixed;
  top: ${(props: { show: boolean }) => (props.show ? "5rem" : "10rem")};
  left: 0;
  z-index: 99;

  width: 100vw;
  height: calc(100vh - 5rem);

  background-color: ${(props: { show: boolean }) =>
    props.show ? "#eee" : "#0000"};

  transition: ${(props: { show: boolean }) =>
    props.show
      ? "0.3s ease all, 0.8s ease backdrop-filter"
      : "0.3s ease all, 0.2s ease backdrop-filter"};

  opacity: ${(props: { show: boolean }) => (props.show ? "1" : "0")};
  visibility: ${(props: { show: boolean }) =>
    props.show ? "visible" : "hidden"};
`;

const MenuButton = styled(Menu2)`
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const CloseButton = styled(X)`
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 90px;
`;

const UpperHeader = styled.header<{ isTransparent: boolean }>`
  position: fixed;
  z-index: 99;

  top: 0;

  height: 5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 1rem;

  color: ${colors.nearBlack};

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: 0.3s ease all;

  backdrop-filter: ${(props: { isTransparent: boolean }) =>
    props.isTransparent ? "none" : "blur(3px)"};

  background-color: ${(props: { isTransparent: boolean }) =>
    props.isTransparent ? "transparent" : colors.translucentNearWhite};

  box-shadow: ${(props: { isTransparent: boolean }) =>
    props.isTransparent ? "none" : "0 1px 12px rgba(0, 0, 0, 0.25)"};

  border-bottom: ${(props: { isTransparent: boolean }) =>
    props.isTransparent
      ? "1px solid transparent"
      : "1px solid rgba(255, 255, 255, 0.3)"};
`;
