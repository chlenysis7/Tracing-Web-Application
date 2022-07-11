import loadable from "@loadable/component";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// Redux
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getTokenAction, getUserInfoAction } from "../../store/global/auth";

//Images
import LaptopImg from "../../images/login-laptop-min.webp";
import LogoUGM from "../../images/logo-ugm-blue-1.png";

// Enums & Interfaces
import { AuthApiCallStatus } from "../../enums";
import { ILoginState, loginStateActions } from "../../store/global/loginState";

// Any
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Components
const Button = loadable(() => import("../../components/Button"));
const TitledCard = loadable(() => import("../../components/TitledCard"));

export const Login = (props: any) => {
  const dispatch = useDispatch();

  const loginState = useSelector<RootState, ILoginState>(
    (state) => state.loginState
  );

  const status: AuthApiCallStatus = useSelector<RootState, any>(
    (state) => state.auth.status
  );

  const setLoginState = (state: ILoginState) => {
    dispatch(loginStateActions.setLoginState(state));
  };

  const navigate = useNavigate();

  if (
    status === AuthApiCallStatus.LOADING_TOKEN ||
    status === AuthApiCallStatus.LOADING_USER
  ) {
    return (
      <LoginStyle>
        <div className="loading">
          <CircularProgress />
        </div>
      </LoginStyle>
    );
  } else if (status === AuthApiCallStatus.SUCCESS_TOKEN) {
    dispatch(getUserInfoAction());
    return <>Loading User Info</>;
  } else if (status === AuthApiCallStatus.SUCCESS_USER) {
    if (props.nextRoute && props.nextRoute === "mobility")
      navigate("/mobility");
    else if (props.nextRoute && props.nextRoute === "tracing")
      navigate("/tracing");
    return <>Logged in</>;
  } else if (status === AuthApiCallStatus.NO_NETWORK)
    return <Alert severity="error">Error Network</Alert>;
  else if (
    status === AuthApiCallStatus.IDLE ||
    status === AuthApiCallStatus.SUCCESS_LOGOUT ||
    status === AuthApiCallStatus.NO_USER ||
    status === AuthApiCallStatus.FAILED_TOKEN ||
    status === AuthApiCallStatus.FAILED_USER
  ) {
    return (
      <LoginStyle>
        {status === AuthApiCallStatus.FAILED_TOKEN ? (
          <Alert severity="error">Failed getting token</Alert>
        ) : status === AuthApiCallStatus.FAILED_USER ? (
          <Alert severity="error">Failed getting user</Alert>
        ) : (
          ""
        )}
        <img className="laptop" src={LaptopImg} alt="Laptop" />
        <img
          height="50"
          className="indosat-ugm"
          src={LogoUGM}
          alt="Logo UGM & Indosat"
        />
        <h1>Tracing & People Mobility Analysis App</h1>

        <TitledCard title={"Login"} className={"form-login"}>
          <form onSubmit={() => dispatch(getTokenAction())}>
            <input
              type="username"
              className="form-control"
              placeholder="Username"
              onChange={(event) => {
                const username = event.target.value;
                setLoginState({ ...loginState, ...{ username } });
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(event) => {
                const password = event.target.value;
                setLoginState({ ...loginState, ...{ password } });
              }}
            />
            {status === AuthApiCallStatus.NO_USER ? (
              <p>Incorrect username or password</p>
            ) : (
              ""
            )}
            <Button
              fullwidth
              primary
              cta
              onClick={() => dispatch(getTokenAction())}
            >
              <span>Login</span>
            </Button>
          </form>
        </TitledCard>
      </LoginStyle>
    );
  } else return <>Error</>;
};

const LoginStyle = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;

  form {
    display: grid;
    gap: 1em;
  }

  .laptop {
    position: absolute;
    max-width: 70%;
    max-height: 50vh;
    top: 50%;
    transform: translateY(-70%) translateX(-20%);
  }

  .indosat-ugm {
    position: absolute;
    max-height: 4rem;
    bottom: 2%;
    transform: translateX(2rem);
  }

  h1 {
    position: absolute;
    font-size: 2.5rem;
    color: var(--color-blue);
    font-weight: 800;
    max-width: 40%;
    bottom: 15%;
    transform: translateX(2rem);
  }

  button {
    justify-content: center;
  }

  .form-login {
    width: calc(10rem + 20%);
    position: absolute;
    background: white;
    color: black;
    display: flex;
    flex-direction: column;
    position: relative;
    top: 50%;
    left: 100%;
    transform: translateY(-50%) translateX(-45vw);

    p {
      color: red;
    }
  }

  .content {
    display: grid;
  }

  .content > * {
    margin: 1.5rem 1rem 1rem;
  }

  .form-login input:focus {
    box-shadow: none;
    outline: none !important;
    border-color: var(--color-blue);
  }

  .form-login input {
    padding: 1em;
    border: 1px solid var(--color-gray);
    border-radius: 10px;
    font-size: 1.2rem;
  }

  .form-login :nth-child(5) {
    margin-top: 2em;
  }

  .loading {
    width: 100vw;
    height: 100vh;
    position: absolute;
    justify-content: center;
    align-items: center;
    background: #000000dd;
    display: grid;
    z-index: 1000;
  }
`;
