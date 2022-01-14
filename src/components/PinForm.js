import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAppContext } from "../context/appContext";

function PinForm({ pins, long, lat, setPins, setNewPin }) {
  const { user } = useAppContext();
  const [inputs, setInputs] = useState({
    title: "",
    review: "",
    rating: 1,
    username: user.username,
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //   *handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { pin },
      } = await axios.post("api/v1/pins", {
        ...inputs,
        long,
        lat,
      });
      setPins([...pins, pin]);
      setInputs({ title: "", review: "", rating: null });
      setNewPin(null);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">title</label>
        <input
          required
          type="text"
          placeholder="name the place"
          id="title"
          name="title"
          value={inputs.title}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="review">review</label>
        <textarea
          required
          name="review"
          id="review"
          placeholder="Write a short note"
          onChange={(e) => handleChange(e)}
          value={inputs.review}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="rating">rating</label>
        <select
          // value="1"
          name="rating"
          id="rating"
          onChange={(e) =>
            setInputs({ ...inputs, rating: Number(e.target.value) })
          }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <button type="submit">submit</button>
    </Wrapper>
  );
}

export default PinForm;

const Wrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  .form-group {
    width: 100%;
    margin-bottom: 1.2rem;

    label {
      display: block;
      font-size: 1.3rem;
      text-transform: capitalize;
      margin-bottom: 0.5rem;
      color: var(--col-2);
      font-weight: bold;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.8rem;
      border: none;
      border-bottom: 1px solid var(--col-2);
      outline: none;

      &::placeholder {
        color: grey;
        text-transform: capitalize;
      }
    }

    select {
      border: none;
      padding: 0.5rem;
    }
  }
  button {
    padding: 0.5rem 0;
    border: none;
    text-transform: uppercase;
    font-weight: bold;
    background: var(--col-2);
    color: white;
    cursor: pointer;
  }
`;
