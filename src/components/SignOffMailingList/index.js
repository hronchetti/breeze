import React from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import * as Yup from "yup"
import { Formik, Form } from "formik"

import { Input } from "../Form"

const SignOffMailingList = () => {
  const handleSubmit = async (values, actions) => {
    addToMailchimp(values.email, {
      PATHNAME: "",
    })
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
              .email(
                "Must be a valid email address in the format 'example@example.com'"
              )
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
    </section>
  )
}

export default SignOffMailingList
