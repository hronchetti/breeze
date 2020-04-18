import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import * as Yup from "yup"
import { Formik, Form } from "formik"

import { Input, Toast } from "../Form"

const SignOffMailingList = () => {
  const [toast, setToast] = useState({
    message: "",
    visible: false,
    type: true,
  })
  const handleSubmit = async (values, actions) => {
    const response = await addToMailchimp(values.email)
    setToast({
      type: response.result === "success" ? true : false,
      visible: true,
      message: response.msg,
    })
    console.log(response)
    actions.setSubmitting(false)
  }
  return (
    <section className="backgroundBlueDark">
      <section className="wrapper padded">
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email address")
              .required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="signOffMailingList">
              <h2 className="textCenter">Don&apos;t miss out, stay updated</h2>
              <p className="textCenter">
                We&apos;ll email you about new courses and discounts
              </p>
              <Input name="email" type="email" placeholder="Your email" />
              <button
                disabled={isSubmitting}
                className="button buttonPrimary"
                type="submit"
              >
                Join our mailing list
              </button>
            </Form>
          )}
        </Formik>
      </section>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClick={() =>
          setToast(toast => ({
            ...toast,
            visible: false,
          }))
        }
      />
    </section>
  )
}

export default SignOffMailingList
