import React from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useMapContext } from "../context/mapContext";

function Buttons() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAppContext();
  const { setCurrent } = useMapContext();

  // hiding compoenent in verify route
  const location = useLocation();
  if (location.pathname === "/verify-email") {
    return null;
  }
  return (
    <Wrapper>
      {user && (
        <button
          className="btn logout"
          onClick={() => {
            setCurrent(null);
            logoutUser();
            navigate("/login");
          }}
        >
          logout
        </button>
      )}

      {!user && (
        <>
          <Link className="btn login" to="/login">
            login
          </Link>
          <Link className="btn register" to="/register">
            register
          </Link>
        </>
      )}
    </Wrapper>
  );
}

export default Buttons;

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 20px;
  z-index: 50;
  display: flex;
  gap: 1rem;

  .btn {
    background: var(--col-green);
    border-radius: var(--radius-btn);
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    padding: var(--padding-btn);
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.25s ease;
    &:hover {
      transform: scale(1.1);
    }
    &.login {
      background: var(--col-blue);
    }
    &.logout {
      background: var(--col-red);
    }
  }
`;
