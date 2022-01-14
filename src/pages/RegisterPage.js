import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Background, Form, Success, Error } from "../components/Styled";
import { Link } from "react-router-dom";
import { Loading, FormRow } from "../components";
import { useAppContext } from "../context/appContext";
import CloseIcon from "@mui/icons-material/Close";

function RegisterPage() {
  const {
    setLoading,
    registerInputs,
    setRegisterInputs,
    error,
    setError,
    success,
    setSuccess,
    alert,
    setAlert,
  } = useAppContext();
  const registerUrl = "/api/v1/auth/register";

  const handleChange = (e) => {
    setRegisterInputs({ ...registerInputs, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setAlert("");
    setError(false);
    setSuccess(false);
  };

  //TODO: HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    try {
      const { data } = await axios.post(registerUrl, registerInputs);
      setRegisterInputs({
        username: "",
        email: "",
        password: "",
      });
      setSuccess(true);
      setAlert(data.msg);
    } catch (error) {
      setError(true);
      setAlert(error.response.data.msg.split(",")[0]);
      setTimeout(() => {
        setAlert("");
        setSuccess(false);
        setError(false);
      }, 2000);
    }
    setLoading(false);
  };

  // TODO: RENDER
  return (
    <Wrapper>
      <Background />
      {success && (
        <Success>
          {alert}
          <CloseIcon className="close" onClick={handleClose} />
        </Success>
      )}
      {error && (
        <Error>
          {alert}
          <CloseIcon className="close" onClick={handleClose} />
        </Error>
      )}
      <Form>
        <h4>Create Account</h4>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormRow
            name="username"
            type="text"
            handleChange={handleChange}
            value={registerInputs.username}
          />
          <FormRow
            name="email"
            type="text"
            handleChange={handleChange}
            value={registerInputs.email}
          />

          <FormRow
            type="password"
            name="password"
            value={registerInputs.password}
            handleChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default RegisterPage;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: realtive;
`;

// const Success = styled.div`
//   position: absolute;
//   top: 2rem;
//   font-size: 1.4rem;
//   color: white;
//   background: var(--col-green);
//   padding: 1rem 2rem;
//   border-radius: 0.4rem;
//   display: flex;
//   align-items: center;
//   gap: 1rem;

//   .close {
//     cursor: pointer;
//   }
// `;

// const Error = styled(Success)`
//   background: tomato;
// `;
