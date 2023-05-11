import { screen } from "@/styles/styleConstants";
import Head from "next/head";
import styled from "styled-components";
import UpcomingTasks from "@/components/page/root/UpcomingTasks";
import MainHero from "@/components/page/root/Hero";
import Links from "@/components/page/root/Links";
import PopularLocations from "@/components/page/root/PopularLocations";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | UNF App</title>
      </Head>

      <main>
        <MainHero />
        <MainContent>
          <ShadowWrapper>
            <QuickAccessComponents>
              <UpcomingTasks />
              <PopularLocations />
            </QuickAccessComponents>
          </ShadowWrapper>
          <Links />
        </MainContent>
      </main>
    </>
  );
}

const ShadowWrapper = styled.div`
  padding-bottom: 2rem;
  background-color: #ddd;
`;

const QuickAccessComponents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  box-shadow: 0 0 1rem #0002;
  background-color: #fff;

  @media (max-width: ${screen.laptop}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
`;