import React, { useState } from "react"
import PropTypes from "prop-types"
import addToMailchimp from "gatsby-plugin-mailchimp"
import * as Yup from "yup"
import { Formik, Form } from "formik"

import { Input, Toast } from "../../Form"
import SearchingIcon from "../../../images/icons/big/searching.svg"

export const EmptyCourseList = ({ courseTopic }) => {
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
              We haven&apos;t uploaded our {courseTopic.toLowerCase()} courses
              yet, but they&apos;re on their way!
            </p>
            <p>
              To learn more about the courses we offer that aren&apos;t on our
              website join our mailing list or contact us directly by emailing
              enquiries@breeze.academy
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
          setToast(toast => ({
            ...toast,
            visible: false,
          }))
        }
      />
    </section>
  )
}

EmptyCourseList.propTypes = {
  courseTopic: PropTypes.string.isRequired,
}
