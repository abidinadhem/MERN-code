/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import UnAuthenticatedRoutes from "./unAuthRoutes";
import AuthenticatedRoutes from "./authRouters";
import { useDispatch, useSelector } from "react-redux";
import {
  selectuser,
  selectAppLoading,
} from "./unAuthRoutes/login/slice/selectors";
import { authActions } from "./unAuthRoutes/login/slice";
import { Spin } from "antd";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectuser);
  const loading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(authActions.init());
  }, []);
  
  if (loading !== "done" && loading !== "error") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin style={{color: 'green'}} size="large" />
      </div>
    );
  }

  if (user) {
    return <AuthenticatedRoutes />;
  }
  return <UnAuthenticatedRoutes />;
}

export default Home;
