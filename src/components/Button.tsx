import styled from "styled-components";
import { IButtonProps } from "../interfaces/globalInterfaces";

export const Button = (props: IButtonProps) => {
  return (
    <ButtonStyle
      onClick={props.disabled ? undefined : props.onClick}
      {...props}
    >
      {props.children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  cursor: ${(props: IButtonProps) => (props.disabled ? "unset" : "pointer")};
  display: flex;
  align-items: center;
  background: ${(props: IButtonProps) =>
    props.disabled
      ? "#CCCCCC"
      : props.nobg
      ? "transparent"
      : props.primary
      ? "var(--color-blue)"
      : props.warning
      ? "var(--color-yellow)"
      : props.danger
      ? "var(--color-red-darker)"
      : props.green
      ? "var(--color-green-darker)"
      : "#FD7E14"};
  border-radius: var(--px-xs, 10px);
  padding: ${(props: IButtonProps) => (props.cta ? "1em 2em" : "0.6em 2em")};
  color: ${(props: IButtonProps) => (props.blacktext ? "black" : "white")};
  font-weight: 600;
  font-size: 16px;
  transition: 100ms ease-in;
  border: none;
  margin-left: ${(props: IButtonProps) => (props.marginLeft ? "5px" : "0")};
  width: ${(props: IButtonProps) => (props.fullwidth ? "100%" : "")};

  :hover {
    background: ${(props: IButtonProps) =>
      props.disabled
        ? "#CCCCCC"
        : props.nobg
        ? "#FD7E14AA"
        : "var(--color-orange)"};
  }

  img {
    margin-right: 1em;
  }
`;

export default Button;