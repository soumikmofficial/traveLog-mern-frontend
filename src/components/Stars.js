import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import styled from "styled-components";

function Stars({ rating }) {
  return (
    <Wrapper>
      {Array.from({ length: rating }, (_, index) => {
        return <StarRateIcon key={index} />;
      })}
    </Wrapper>
  );
}

export default Stars;

const Wrapper = styled.div``;
