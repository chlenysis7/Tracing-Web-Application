import { Routes, Route, Navigate } from "react-router-dom";
import { IAuthState } from "../interfaces/globalInterfaces";
import { useSelector } from "react-redux";

// Route Pages
import { Login } from "../pages/auth/Login";
import { Main } from "../pages/main/Main";

export const AppRoutes = () => {
  const authState = useSelector<any, IAuthState>((state) => state.auth);
  // get user state pake useSelector

  if (
    authState.isAuthenticated === false &&
    authState.user.access_token === ""
  ) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracing" element={<Login nextRoute={"tracing"} />} />
        <Route path="/mobility" element={<Login nextRoute={"mobility"}/>} />
      </Routes>
    );
  } else
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/tracing" />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/tracing" element={<Main />} />
        <Route path="/mobility" element={<Main />} />
      </Routes>
    );

  // return (

  //   <Routes>
  //     {/* Kalau user tidak ada di state */}
  //     {/* <Route path="/" element={<Navigate to="/login" />} />  */}
  //     {/* <Route path="/login" element={<Login />} /> */}
  //     {/* <Route path="/tracing" element={<Navigate to="/login" />} /> */}
  //     {/* <Route path="/mobility" element={<Navigate to="/login" />} /> */}

  //     {/* Kalau user ada di state */}
  //     {/* <Route path="/" element={<Navigate to="/tracing" />} />  */}
  //     {/* <Route path="/login" element={<Navigate to="/tracing" />} /> */}
  //     {/* <Route path="/tracing" element={<Main />} /> */}
  //     {/* <Route path="/mobility" element={<Main />} /> */}

  //     <Route path="/" element={<Navigate to="/tracing" />} />
  //     <Route path="/login" element={<Login />} />
  //     <Route path="/tracing" element={<Main />} />
  //     <Route path="/mobility" element={<Main />} />
  //   </Routes>
  // );
};
