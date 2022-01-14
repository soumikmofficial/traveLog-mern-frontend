import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Background, Form, Error } from "../components/Styled";
import { useAppContext } from "../context/appContext";
import { Loading, FormRow } from "../components";
import CloseIcon from "@mui/icons-material/Close";

function LoginPage() {
  const navigate = useNavigate();
  const {
    setLoading,
    loading,
    saveUser,
    loginInputs,
    setLoginInputs,
    error,
    setError,
    alert,
    setAlert,
  } = useAppContext();
  const loginUrl = "/api/v1/auth/login";

  const handleChange = (e) => {
    setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
  };

  //TODO: HANDLE FORM SUBMIT

  const handleClose = () => {
    setAlert("");
    setError(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    try {
      const { data } = await axios.post(loginUrl, loginInputs);
      setLoginInputs({
        email: "",
        password: "",
      });
      saveUser(data.user);
      navigate("/");
    } catch (error) {
      setError(true);
      setAlert(error.response.data.msg);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
    setLoading(false);
  };

  // TODO: RENDER
  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Background />
      {error && (
        <Error>
          {alert}
          <CloseIcon className="close" onClick={handleClose} />
        </Error>
      )}
      <Form>
        <h4>sign in</h4>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormRow
            name="email"
            type="text"
            handleChange={handleChange}
            value={loginInputs.email}
          />

          <FormRow
            type="password"
            name="password"
            value={loginInputs.password}
            handleChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">register</Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
`;
