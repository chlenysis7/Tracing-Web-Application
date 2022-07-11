import React from "react";
import styled from "styled-components";

export const TracingForm = (props) => {

  return (
    <FormStyle>
      <input
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        value={props.changedValue}
        onChange={(event) => props.onInputChange(event.target.value)}
      />
    </FormStyle>
  );
};

const FormStyle = styled.div`
  width: 100%;

  .form {
    width: 100%;
    background: white;
    color: black;
    display: flex;
    flex-direction: column;
    /* top: 50%;
    left: 100%;
    transform: translateY(-50%) translateX(-45vw); */
  }

  .content {
    display: grid;
    padding-top: 1em;
  }

  .content > * {
    margin: 0.5rem 1rem;
  }

  input:focus {
    box-shadow: none;
    outline: none !important;
    border-color: var(--color-blue);
  }

  input {
    padding: 0.8em;
    border: 1px solid var(--color-gray);
    border-radius: 10px;
    font-size: 1rem;
  }

  .form-control {
    width: 100%;
  }
`;
