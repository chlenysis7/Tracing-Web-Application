import {
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";

import styled from "styled-components";

import ChevronIcon from "../images/ic-chevron-circled-bottom.svg";
import CloseIcon from "../images/ic-close-btn.svg";

interface ITitledCardProps {
  className: string;
  expandable?: boolean;
  isExpanded?: boolean;
  setIsExpanded?: (isExpanded: boolean) => void | null;
  subtitle?: string;
  title?: string;
  closable?: boolean;
  close?: MouseEventHandler<HTMLImageElement>;
  children: PropsWithChildren<ReactNode>;
  error?: boolean;
  errorMessage?: string;
}

export const TitledCard = (props: ITitledCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <TitledCardStyle {...props}>
      <div
        className="title"
        onClick={() =>
          props.expandable
            ? props.isExpanded !== undefined
              ? props.setIsExpanded!(!props.isExpanded)
              : setIsExpanded(!isExpanded)
            : ""
        }
      >
        {props.subtitle ? (
          <div>
            {props.title}
            <br />
            <span className="subtitle">{props.subtitle}</span>
          </div>
        ) : (
          props.title
        )}
        {props.expandable ? (
          <img
            className="chevron"
            style={{
              transform:
                isExpanded === false || props.isExpanded === false
                  ? "rotate(-90deg)"
                  : "",
            }}
            width="23.03"
            height="23.03"
            src={ChevronIcon}
            alt="Icon"
          />
        ) : props.closable ? (
          <img
            className="close"
            src={CloseIcon}
            alt="Icon"
            onClick={props.close}
          />
        ) : (
          ""
        )}
      </div>
      <div
        className="content"
        style={{
          display:
            isExpanded === false || props.isExpanded === false ? "none" : "",
        }}
      >
        {props.children}
        {props.error && props.errorMessage ? (
          <ErrorTitledCardStyle>
            <div>{props.errorMessage}</div>
          </ErrorTitledCardStyle>
        ) : (
          ""
        )}
      </div>
    </TitledCardStyle>
  );
};

const ErrorTitledCardStyle = styled.div`
  margin: 1em -1em -1em;
  div {
    font-size: 0.8em;
    background-color: var(--color-red);
    color: white;
    padding: 0.5em;
    border-radius: 0 0 8px 8px;
    box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
      0px 3px 5px rgba(176, 190, 197, 0.32);
  }
`;

const TitledCardStyle = styled.div`
  box-sizing: border-box;
  margin-bottom: 1em;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
    0px 3px 5px rgba(176, 190, 197, 0.32);
  outline: ${(props: ITitledCardProps) =>
    props.error ? "2px solid var(--color-red)" : ""};

  .title {
    cursor: pointer;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);
    color: var(--color-blue);
    font-size: 1.2rem;
    font-weight: 800;
    padding: 16px 16px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 4fr 1fr;
    align-items: center;

    .chevron {
      height: 1.2em;
      justify-self: right;
      cursor: pointer;
      transition: 100ms ease-in-out;
    }

    .close {
      position: absolute;
      top: -1em;
      right: -1em;
      height: 2em;
      transition: 100ms ease-in;
      cursor: pointer;
      :hover {
        filter: brightness(0.9);
      }
    }
  }

  .subtitle {
    font-weight: 400;
    color: var(--color-black);
    font-size: 0.8em;
  }

  /* .content {
    padding-top: 1em;
  } */
`;

export default TitledCard;