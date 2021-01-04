import React, { useState } from "react"
import * as Yup from "yup"
import { Formik, Form, Field } from "formik"
import axios from "axios"
import qs from "qs"
import { Link } from "react-scroll"

import { Input, TextArea, Toast } from "../Form"

const RequestACourse = () => {
  const [toast, setToast] = useState({
    message: "",
    visible: false,
    type: true,
  })

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(values),
      url: "/",
    }
    try {
      await axios(options)
      // Success
      setToast({
        type: true,
        visible: true,
        message: "Message sent, we'll be in contact soon!",
      })
      resetForm({})
    } catch (e) {
      // Failed
      setToast({
        type: false,
        visible: true,
        message: "Could not send message, please try again",
      })
    }
    setSubmitting(false)
  }
  return (
    <>
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          phone: "",
          location: "",
          message: "",
          "bot-field": "",
          "form-name": "Request a course",
        }}
        validationSchema={Yup.object().shape({
          fullname: Yup.string().required("Required"),
          email: Yup.string()
            .email("Must be a valid email address")
            .required("Required"),
          phone: Yup.string(),
          location: Yup.string().required("Required"),
          message: Yup.string().required("Required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            className="requestACourse"
            name="Request a course"
            method="post"
            netlify-honeypot="bot-field"
            data-netlify="true"
          >
            <Field type="hidden" name="bot-field" />
            <Field type="hidden" name="form-name" />
            <Input
              label="Your name"
              name="fullname"
              type="text"
              placeholder="Who are we speaking to?"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="How we'll contact you"
            />
            <Input
              label="Phone"
              name="phone"
              type="phone"
              placeholder="In case we need to ring"
              optional="true"
            />
            <Input
              label="Location"
              name="location"
              type="text"
              placeholder="Where are you based?"
            />
            <TextArea
              label="Message"
              name="message"
              rows={5}
              placeholder="Have a specific course in mind? Let us know what you'd like to see near you"
            />
            <section className="headerButtons">
              <button
                disabled={isSubmitting}
                className="button buttonPrimary"
                type="submit"
              >
                Submit
              </button>
              <Link
                to="howItWorks"
                className="button buttonSecondary"
                smooth={true}
                offset={-96}
                duration={500}
              >
                How it works
              </Link>
            </section>
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
    </>
  )
}

export default RequestACourse
