import styled from "styled-components";
import { Link } from "react-router-dom";

// Components
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

// Redux
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../store/global/auth";

//Images
import LogoUGM from "../images/logo-ugm-white.png";

// Interfaces
import { IAuthState } from "../interfaces/globalInterfaces";
import { AuthApiCallStatus } from "../enums";

// Icon
import IcLogout from "../images/ic-logout.svg";
import { TitledCard } from "./TitledCard";
import Popup from "reactjs-popup";

export const Navbar = ({ path }: { path: string }) => {
  const auth = useSelector<RootState, IAuthState>((state) => state.auth);

  const navigate = useNavigate();

  if (auth.status === AuthApiCallStatus.SUCCESS_LOGOUT) {
    navigate("/");
    return <>Logout Success</>;
  }

  return (
    <NavbarStyle className="shadow">
      <div className="logo-container">
        <img src={LogoUGM} width="112.59" height="32" alt="Logo" />
      </div>
      <Buttons path={path} />
      <LoginInfo user={auth} />
    </NavbarStyle>
  );
};

const Buttons = (props: any) => {
  return (
    <div className="btn-container">
      <Link to="/tracing">
        <Button nobg={props.path === "/tracing" ? false : true}>
          Individual Tracing
        </Button>
      </Link>
      <Link to="/mobility">
        <Button marginLeft nobg={props.path === "/mobility" ? false : true}>
          Mobility Analysis
        </Button>
      </Link>
    </div>
  );
};

const LoginInfo = ({ user }: { user: IAuthState }) => {
  const dispatch = useDispatch();
  const isMobile = useSelector<RootState, boolean>((state) => state.isMobile);

  if (!isMobile)
    return (
      <LoginInfoStyle>
        <p>{user.user.name}</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 24C2 24 0 24 0 22C0 20 2 14 12 14C22 14 24 20 24 22C24 24 22 24 22 24H2ZM12 12C13.5913 12 15.1174 11.3679 16.2426 10.2426C17.3679 9.11742 18 7.5913 18 6C18 4.4087 17.3679 2.88258 16.2426 1.75736C15.1174 0.632141 13.5913 0 12 0C10.4087 0 8.88258 0.632141 7.75736 1.75736C6.63214 2.88258 6 4.4087 6 6C6 7.5913 6.63214 9.11742 7.75736 10.2426C8.88258 11.3679 10.4087 12 12 12Z"
            fill="#0D6EFD"
          />
        </svg>
        <Button
          className="desktop"
          danger
          cta
          onClick={() => dispatch(logoutUserAction())}
        >
          <img src={IcLogout} width="24" height="24" alt="Trash icon" />
        </Button>
      </LoginInfoStyle>
    );
  else
    return (
      <Popup
        trigger={
          <LoginInfoStyle style={{display: "flex"}}>
            <p>{user.user.name}</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 24C2 24 0 24 0 22C0 20 2 14 12 14C22 14 24 20 24 22C24 24 22 24 22 24H2ZM12 12C13.5913 12 15.1174 11.3679 16.2426 10.2426C17.3679 9.11742 18 7.5913 18 6C18 4.4087 17.3679 2.88258 16.2426 1.75736C15.1174 0.632141 13.5913 0 12 0C10.4087 0 8.88258 0.632141 7.75736 1.75736C6.63214 2.88258 6 4.4087 6 6C6 7.5913 6.63214 9.11742 7.75736 10.2426C8.88258 11.3679 10.4087 12 12 12Z"
                fill="#0D6EFD"
              />
            </svg>
          </LoginInfoStyle>
        }
        modal
        className={"modal-a popup-overlay-mobile"}
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        {(close: () => void) => (
          <TitledCard
            className={"input-popup-mobile"}
            closable
            close={close}
            title="User"
            subtitle={"User information"}
          >
            <LoginInfoStyle>
              <div className="mobile">
                Name
                <b className="blue">{user.user.name}</b>
                <br/>
                Email
                <b className="blue">{user.user.email}</b>
                <Button
                  fullwidth
                  danger
                  cta
                  onClick={() => dispatch(logoutUserAction())}
                >
                  <img src={IcLogout} alt="Trash icon" />
                  Logout
                </Button>
              </div>
            </LoginInfoStyle>
          </TitledCard>
        )}
      </Popup>
    );
};

const LoginInfoStyle = styled.div`
  align-items: center;
  display: flex;

  p {
    margin-right: 1em;
    font-size: 14px;
    font-weight: bold;
    color: white;
  }

  svg {
    margin-right: 1.5em;

    path {
      fill: white;
    }
  }

  .blue {
    color: var(--color-blue);
    font-size: 1.2em;
  }

  button {
    flex-basis: content;
    margin-right: 1em;
    height: 1em;
    padding: 1.2em 1em;
    font-weight: 400;

    img {
      margin-right: 0;
      max-width: 24px;
    }
  }

  button.desktop:before {
    content: "";
    height: 2em;
    position: relative;
    left: -28px;
    border: 1px solid white;
  }

  @media only screen and (max-width: 768px) {
    cursor: pointer;
    box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
      0px 3px 5px rgba(176, 190, 197, 0.32);
    grid-column-start: 2;
    grid-row-start: 2;
    height: 100%;
    background: white;
    padding: 0.5em;
    text-align: center;
    border-radius: 10px;
    justify-content: center;
    display: block;

    svg {
      margin: 0;

      path {
        fill: var(--color-blue);
      }
    }

    p {
      display: none;
    }

    .mobile {
      cursor: initial;
      display: grid;
    }

    button {
      margin: 1em 0 0 0;
      flex-basis: content;
      width: 100%;
      padding: 1.5em 2em;
      font-weight: 400;
      justify-content: center;

      img {
        margin-right: 1em;
        max-width: 24px;
      }
    }
  }
`;

const NavbarStyle = styled.div`
  background: var(--color-blue);
  padding: 1.2em 0.5em;
  margin-bottom: var(--px-xl);
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  align-items: center;
  position: sticky;
  width: 100%;

  .btn-container {
    padding: 0.5em 0.8em;
    background: #0a58ca;
    display: inline-flex;
    border-radius: 10px;
    position: absolute;
    right: 50%;
    transform: translateX(50%);
  }

  .logo-container img {
    max-height: 2em;
    margin-left: 1em;
  }

  @media screen and (max-width: 892px) {
    padding-top: 1.6em;
    padding-bottom: 1.6em;
  }

  @media only screen and (max-width: 768px) {
    height: auto;
    padding: 0;
    background: none;
    box-shadow: none !important;
    flex-direction: column;
    padding-left: 0;
    padding-right: 0;
    gap: 0.5em;
    display: grid;
    grid-template-columns: 2fr 0.3fr;
    grid-template-rows: 0.1fr 0.1fr;
    justify-content: stretch;

    .logo-container {
      box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
        0px 3px 5px rgba(176, 190, 197, 0.32);
      background: var(--color-blue);
      padding: 0.5em;
      height: 3em;
      width: 100%;
      align-items: center;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      grid-row-start: 1;
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .btn-container {
      box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
        0px 3px 5px rgba(176, 190, 197, 0.32);
      width: 100%;
      justify-content: center;
      grid-row-start: 2;
      grid-column-end: 2;
      position: initial;
      transform: initial;
      margin-top: 0;
      button {
        font-size: clamp(0.8rem, 1vw, 1rem) !important;
      }
    }
  }
`;

export default Navbar;