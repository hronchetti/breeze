import React from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import * as Yup from "yup"
import { Formik, Form } from "formik"

const SignOffMailingList = () => {
  const handleSubmit = async (values, actions) => {
    addToMailchimp(values.email, {
      PATHNAME: "",
      FNAME: values.firstName,
      LNAME: values.lastName,
    })
    actions.setSubmitting(false)
  }
  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(
            "Must be a valid email address in the format 'example@example.com'"
          )
          .required("Required"),
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
      })}
      onSubmit={handleSubmit()}
    >
      {({ isSubmitting }) => (
        <Form>
          <button disabled={isSubmitting} className="button buttonPrimary">
            Join our mailing list
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default SignOffMailingList
