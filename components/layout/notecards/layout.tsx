import { colors, screen } from "@/styles/styleConstants";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  ArrowBarLeft,
  Cards,
  List,
  Pencil,
  Settings,
} from "tabler-icons-react";
import { useEffect, useContext, useState } from "react";
import { NotecardSetContext } from "./NotecardSetContext";
import { baseURL } from "@/values/api";
import { NotecardSet } from "@/values/types";
import { Store } from "react-notifications-component";
import { UserContext } from "../LoginContext";

export default function NotecardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { notecardSet, setNotecardSet } = useContext(NotecardSetContext);
  const { user } = useContext(UserContext);
  const [oldQuery, setOldQuery] = useState<any>({ user: "", pack: "" });

  useEffect(() => {
    if (
      router.query.user != oldQuery.user ||
      router.query.pack != oldQuery.pack
    ) {
      setOldQuery({ user: router.query.user, pack: router.query.pack });
      fetch(
        baseURL +
          `notecardset/get/set?nNumber=${router.query.user}&id=${router.query.pack}`
      )
        .then((res) => {
          if (res.ok) {
            res.json().then((res: NotecardSet) => {
              setNotecardSet(res);
            });
          } else if (res.status == 404) {
            Store.addNotification({
              title: "Could not find notecard set",
              message: "Invalid set information or server error",
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });
          }
        })
        .catch((error) => {
          Store.addNotification({
            title: "Client failed to connect to API",
            message: "Possible network error or disruption",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover: true,
              showIcon: true,
            },
          });

          console.log(error);
        });
    }
  }, [router.query, setNotecardSet]);

  const lastSlash = router.asPath.lastIndexOf("/");
  const currentRoute = router.asPath.substring(0, lastSlash);
  const relativeRoute = router.asPath.substring(lastSlash);

  return (
    <>
      <MainHeaderSafeArea />

      <PageLayout>
        <Navbar>
          <NavButtons>
            <StyledLink
              href={currentRoute + "/overview"}
              isActive={relativeRoute === "/overview"}
            >
              <List size="3rem" />
            </StyledLink>
            <StyledLink
              href={currentRoute + "/study"}
              isActive={relativeRoute === "/study"}
            >
              <Cards size="3rem" />
            </StyledLink>
            {user?.nNumber === notecardSet.creator.nNumber && (
              <>
                <StyledLink
                  href={currentRoute + "/edit"}
                  isActive={relativeRoute === "/edit"}
                >
                  <Pencil size="3rem" />
                </StyledLink>
                <StyledLink
                  href={currentRoute + "/settings"}
                  isActive={relativeRoute === "/settings"}
                >
                  <Settings size="3rem" />
                </StyledLink>
              </>
            )}
          </NavButtons>
          <NavButtons>
            <ExitLink href="/notecards">
              <ArrowBarLeft size="3rem" />
            </ExitLink>
          </NavButtons>
        </Navbar>
        <MainContent>{children}</MainContent>
      </PageLayout>
    </>
  );
}

const MainHeaderSafeArea = styled.div`
  height: 5rem;
  border-bottom: 1px solid #bbb;
`;

const PageLayout = styled.div`
  display: grid;
  grid-template-columns: 5rem calc(100% - 5rem);

  @media (max-width: ${screen.tablet}) {
    grid-template-columns: 100%;
    grid-template-rows: 5rem calc(100vh - 5rem - 5rem);
  }
`;

const MainContent = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 5rem);
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  background-color: ${colors.unfBlue};

  @media (max-width: ${screen.tablet}) {
    flex-direction: row;
    padding: 0 0.5rem;
  }

  @media (max-width: ${screen.mobile}) {
    padding: 0 0.25rem;
  }
`;

const NavButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;

  @media (max-width: ${screen.tablet}) {
    height: 100%;
    flex-direction: row;
  }
`;

const StyledLink = styled(Link)`
  color: ${(props: { isActive: boolean }) =>
    props.isActive ? colors.unfBlueWhite : colors.unfBlueNearWhite};

  border-right: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "6px solid " + colors.unfBlueWhite : "6px solid transparent"};

  box-sizing: border-box;

  transition: 0.15s ease color, 0.05s ease background-color;

  width: 100%;

  margin-left: 1px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;

  &:hover {
    background-color: ${colors.unfBlueLight};
    color: ${colors.unfBlueWhite};
  }

  @media (max-width: ${screen.tablet}) {
    border-right: none;
    height: 100%;
    padding: 0;

    border-bottom: ${({ isActive }: { isActive: boolean }) =>
      isActive ? "6px solid " + colors.unfBlueWhite : "6px solid transparent"};

    font-size: 1.5rem;

    &:hover {
      background-color: transparent;
      color: ${(props: { isActive: boolean }) =>
        props.isActive ? colors.unfBlueWhite : colors.unfBlueNearWhite};
    }
  }
`;

const ExitLink = styled(Link)`
  color: ${colors.unfBlueWhite};

  box-sizing: border-box;

  transition: 0.15s ease color, 0.05s ease background-color;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;

  &:hover {
    background-color: #ccc;
    color: #000066;
  }

  @media (max-width: ${screen.tablet}) {
    justify-content: right;
    padding: 0 0.5rem;
  }

  @media (max-width: ${screen.mobile}) {
    padding: 0 0.25rem;
  }
`;
