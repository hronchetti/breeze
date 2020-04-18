import React from "react"
import * as Yup from "yup"
import { Formik, Form } from "formik"

import Divider from "../Divider"
import { Input, TextArea } from "../Form"

import MagnifyingGlass from "../../images/magnifying-glass.svg"

const SignOffStillLooking = () => {
  const handleSubmit = async (values, actions) => {
    console.log(values)
    actions.setSubmitting(false)
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
              <Form>
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
                  Help us improve
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
    </section>
  )
}

export default SignOffStillLooking
