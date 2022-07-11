import { SnackbarOrigin } from "@mui/material";
import { MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { AuthApiCallStatus } from "../enums";

export interface IAuthState {
  status?: AuthApiCallStatus;
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    access_token: string;
  };
}

export interface ISnackBarState {
  severity: string;
  text: string;
  isOpen: boolean;
  anchorOrigin: SnackbarOrigin;
  autoHideDuration: number;
}

// START SECTION: GLOBAL COMPONENTS
export interface IButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: PropsWithChildren<ReactNode>;
  className?: any;

  // Color
  nobg?: boolean;
  primary?: boolean;
  warning?: boolean;
  danger?: boolean;
  green?: boolean;

  // Any
  cta?: boolean;
  blacktext?: boolean;
  marginLeft?: boolean;
  fullwidth?: boolean;

  disabled?: boolean;
}
// END SECTION: GLOBAL COMPONENTS
