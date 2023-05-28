import React from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { Button, Input, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function Form(props) {
  const userSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("Required"),
    password: props.add
      ? Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required")
      : undefined,
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          firstName: props.user.firstName,
          lastName: props.user.lastName,
          email: props.user.email,
          password: props.user.password,
          roles: props.user.roles,
          age: props.user.age,
        }}
        validationSchema={userSchema}
        onSubmit={(values) => {
          props.handleSubmit(values);
        }}
      >
        {({ handleSubmit }) => (
          <form>
            <div className="input-group mb-3">
              <Field name="firstName">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <Input type="string" placeholder="firstName" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <div className="input-group mb-3">
              <Field name="lastName">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <Input type="string" placeholder="lastName" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
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
            {props.add && (
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
            )}
            <div className="input-group mb-3">
              <Field name="age">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <Input type="Number" placeholder="age" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <div className="input-group mb-3">
              <Field name="roles">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors,setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <Select
                      style={{ width: 120 }}
                      {...field}
                      onChange={(e) => {
                        setFieldValue(field.name, e);
                      }}
                      options={[
                        { value: "farmers", label: "Farmers" },
                        { value: "Consumers", label: "Consumer" },
                      ]}
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
              <Button onClick={handleSubmit} type="default">
                Enregistrer
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Form;
