import Head from "next/head";
import styled from "styled-components";

export default function Page() {
  return (
    <>
      <Head>
        <title>Alex Keo</title>
      </Head>
      <main>
        <Hero></Hero>
      </main>
    </>
  );
}

const Hero = styled.div`
  height: 90vh;
  background-color: white;
`;
