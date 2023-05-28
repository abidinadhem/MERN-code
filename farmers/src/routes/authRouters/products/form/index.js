import React from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { Button, Input } from "antd";

function Form(props) {
  const productSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          title: props.product.title,
          image: props.product.image,
          description: props.product.description,
          price: props.product.price,
          quantity: props.product.quantity,
        }}
        validationSchema={productSchema}
        onSubmit={(values) => {
          props.handleSubmit(values)
        }}
      >
        {({ handleSubmit }) => (
          <form>
            <div className="input-group mb-3">
              <Field name="title">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <Input type="string" placeholder="title" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <div className="input-group mb-3">
              <Field name="image">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <Input type="string" placeholder="image" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <div className="input-group mb-3">
              <Field name="description">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <Input type="string" placeholder="description" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <div className="input-group mb-3">
              <Field name="price">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <Input type="number" placeholder="price" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <div className="input-group mb-3">
              <Field name="quantity">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <Input type="number" placeholder="quantity" {...field} />
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
