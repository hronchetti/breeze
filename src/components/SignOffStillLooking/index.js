import React, { useState } from "react"
import * as Yup from "yup"
import { Formik, Form, Field } from "formik"
import axios from "axios"
import qs from "qs"

import Divider from "../Divider"
import { Input, TextArea, Toast } from "../Form"

import MagnifyingGlass from "../../images/magnifying-glass.svg"

const SignOffStillLooking = () => {
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
        message: "Message sent successfully",
      })
      resetForm({})
    } catch (e) {
      // Failed
      setToast({
        type: false,
        visible: true,
        message: "Could not send message",
      })
    }
    setSubmitting(false)
  }
  return (
    <section className="backgroundBlueDark">
      <section className="wrapper padded signOffStillLooking">
        <h2>Can&apos;t find what you&apos;re looking for?</h2>
        <Divider />
        <div className="grid">
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              "bot-field": "",
              "form-name": "Can't find what you're looking for?",
              like_to_see: "",
            }}
            validationSchema={Yup.object().shape({
              fullname: Yup.string().required("Required"),
              email: Yup.string()
                .email("Must be a valid email address")
                .required("Required"),
              like_to_see: Yup.string().required("Required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form
                name="Can't find what you're looking for?"
                method="post"
                netlify-honeypot="bot-field"
                data-netlify="true"
              >
                <Field type="hidden" name="bot-field" />
                <Field type="hidden" name="form-name" />
                <p>
                  If you’re a healthcare professional and you think there’s a
                  course missing from our platform we want to hear from you!
                </p>
                <Input name="fullname" label="Your name" type="text" />
                <Input name="email" label="Your email" type="email" />
                <TextArea
                  name="like_to_see"
                  label="What would you like to see on Breeze?"
                />
                <button
                  disabled={isSubmitting}
                  className="button buttonPrimary"
                  type="submit"
                >
                  Send us your ideas
                </button>
              </Form>
            )}
          </Formik>
          <img
            className="illustration"
            src={MagnifyingGlass}
            alt="Magnifying glass illustration"
            title="Magnifying glass illustration"
          />
        </div>
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

export default SignOffStillLooking
