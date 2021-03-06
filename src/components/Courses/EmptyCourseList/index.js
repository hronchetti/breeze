import React, { useState } from "react"
import PropTypes from "prop-types"
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
            <h3>Courses coming soon</h3>
            <p>
              We don&apos;t currently have any courses planned for this
              criteria, but we do offer them!
            </p>
            <p>
              To learn more about courses not on our website join our mailing
              list or contact us directly, we&apos;d love to hear from you
            </p>
            <Input name="email" type="email" placeholder="Your email" />
            <button
              disabled={isSubmitting}
              className="button buttonPrimary"
              type="submit"
            >
              Join mailing list
            </button>
          </Form>
        )}
      </Formik>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClick={() =>
          setToast((toast) => ({
            ...toast,
            visible: false,
          }))
        }
      />
    </section>
  )
}
