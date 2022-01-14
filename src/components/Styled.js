import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  filter: brightness(50%) blur(2px);
  position: absolute;
  background: url("/images/world-map.jpg") no-repeat center;
  background-size: cover;
`;

export const Form = styled.section`
  width: clamp(250px, 40rem, 450px);
  padding: 2rem 3rem;
  background: white;
  border-radius: 1rem;
  z-index: 20;

  h4 {
    text-align: center;
    margin: 3rem 0 4rem;
    color: var(--col-1);
    font-size: 2rem;
    text-transform: capitalize;
  }
  p {
    text-align: center;
    margin-top: 3rem;
    font-size: 1.1rem;
  }
  a {
    text-decoration: none;
    text-transform: capitalize;
  }

  form {
    .form-group {
      margin-bottom: 2rem;
      input {
        border: 1px solid;
        width: 100%;
        min-height: 3.5rem;
        padding: 1.4rem 1.8rem;
        border: none;
        color: var(--input-col);
        font-size: 1.7rem;
        outline: none;
        border-bottom: 2px solid var(--col-1);

        &::placeholder {
          color: grey;
          text-transform: uppercase;
          font-size: 1.3rem;
        }
      }
      label {
        display: block;
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
        text-transform: capitalize;
      }
    }
    button {
      padding: 0.3rem 0.7rem;
      cursor: pointer;
      width: 100%;
      background: var(--col-1);
      color: white;
      border: none;
      border-radius: 0.4rem;
      padding: 1.5rem 0;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

export const Success = styled.div`
  position: absolute;
  top: 2rem;
  font-size: 1.4rem;
  color: white;
  background: var(--col-green);
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  .close {
    cursor: pointer;
  }
`;

export const Error = styled(Success)`
  background: tomato;
`;
