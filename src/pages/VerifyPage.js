import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loading } from "../components";
import styled from "styled-components";

function VerifyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, setLoading } = useAppContext();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const verificationToken = searchParams.get("token");
  const email = searchParams.get("email");

  const verifyToken = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("api/v1/auth/verify-email", {
        verificationToken,
        email,
      });
      setSuccess(true);
    } catch (error) {
      console.log(error.response.data.msg);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      verifyToken();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (success) {
    return (
      <Success>
        <p>Your email was successfully verified !</p>
        <Link to="/login">Log in</Link>
      </Success>
    );
  }
  if (error) {
    return <Error>Email couldn't be verified. Please check the link.</Error>;
  }

  return null;
}

export default VerifyPage;

const Success = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  gap: 2rem;

  p {
    font-size: 1.6rem;
    color: var(--col-green);
    font-weight: bold;
  }

  a {
    margin-left: 2rem;
    text-decoration: none;
    background: var(--col-1);
    padding: var(--padding-btn);
    color: white;
    border-radius: var(--radius-btn);
    text-transform: uppercase;
    font-weight: bold;
  }
`;
const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  gap: 2rem;
  color: var(--col-red);
  font-size: 1.7rem;
`;
