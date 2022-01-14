import React from "react";
import styled from "styled-components";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import { Background } from "./Styled";

function Loading() {
  return (
    <Wrapper>
      <BackgroundGrey />
      <BounceLoader color={"#497eb9"} loading={true} size={100} />
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BackgroundGrey = styled(Background)`
  filter: grayscale(80%) brightness(30%);
`;
