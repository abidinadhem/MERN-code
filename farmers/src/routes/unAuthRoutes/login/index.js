import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./slice";
import { selectLoading } from "./slice/selectors";

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <div style={{display: 'flex',
      alignItems: 'center',
      height : '70vh',

      justifyContent: 'center',
      width: '100%'}}>
      <div className="form-box">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
          </h4>
          <div className="image"></div>
        </div>
        <div className="body-form">
          <Formik
            initialValues={{
              password: "1234",
              email: "nadhem@gmail.com",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              dispatch(authActions.login(values));
            }}
          >
            {({ handleSubmit }) => (
              <form>
                <div className="input-group mb-3">
                  <Field name="email">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }) => (
                      <div>
                        <Input
                          type="email"
                          placeholder="email"
                          {...field}
                          prefix={<UserOutlined />}
                        />
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="input-group mb-3">
                  <Field name="password">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }) => (
                      <div>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                          prefix={<LockOutlined />}
                        />
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 50,
                  }}
                >
                  <Button color="green" onClick={handleSubmit} type="default">
                    Login
                  </Button>
                </div>
                {loading === "error" && (
                  <div className="error">something went wrong</div>
                )}
                <div className="message">
                  <div>
                    <input type="checkbox" /> Remember ME
                  </div>
                  <div className="mb-3" style={{ color: "blue" }}>
                    Forgot your password
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
