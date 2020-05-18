import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import * as Yup from "yup"
import { Formik, Form } from "formik"

import { Input, Toast } from "../../Form"
import SearchingIcon from "../../../images/icons/big/searching.svg"

export const EmptyCourseList = () => {
  const [toast, setToast] = useState({
    message: "",
    visible: false,
    type: true,
  })

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const response = await addToMailchimp(values.email)

    setToast({
      type: response.result === "success" ? true : false,
      visible: true,
      message: response.msg,
    })
    setSubmitting(false)

    if (response.result === "success") {
      resetForm({})
    }
  }

  return (
    <section className="emptyCourseList">
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
            <img
              className="searchingIcon searchingIconMargin"
              src={SearchingIcon}
              alt="Magnifying glass searching within computer screen"
            />
            <h3>Coming soon</h3>
            <p>
              We haven’t released any courses in this category yet but we’re
              working on it! Join our mailing list using the form below to be
              notified when we release the first courses
            </p>
            <Input name="email" type="email" placeholder="Your email" />
            <button
              disabled={isSubmitting}
              className="button buttonPrimary"
              type="submit"
            >
              Join the waiting list
            </button>
          </Form>
        )}
      </Formik>
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
