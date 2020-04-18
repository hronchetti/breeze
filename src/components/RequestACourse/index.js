import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import PropTypes from "prop-types"

import { Input, TextArea, Select } from "../Form"

const RequestACourse = ({ courses }) => {
  const [coursesForSelect, setCourses] = useState([])

  useEffect(() => {
    formatCourses(courses)
  }, [courses])

  const formatCourses = courses => {
    let formattedCourses = []

    courses.forEach(course => {
      formattedCourses.push({
        value: course.node.name,
        label: course.node.name,
      })
    })
    setCourses(formattedCourses)
    return formattedCourses
  }

  const handleSubmit = async (values, actions) => {
    console.log(values)
    actions.setSubmitting(false)
  }
  return (
    <Formik
      initialValues={{
        fullname: "",
        email: "",
        course: "",
        location: "",
        message: "",
      }}
      validationSchema={Yup.object().shape({
        fullname: Yup.string().required("Required"),
        email: Yup.string()
          .email("Must be a valid email address")
          .required("Required"),
        course: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        message: Yup.string(),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="requestACourse">
          <Input label="Your name" name="fullname" type="text" />
          <Input label="Email" name="email" type="email" />
          <Select label="Course" name="course" options={coursesForSelect} />
          <Input label="Location" name="location" type="text" />
          <TextArea label="Message" name="message" rows={4} optional="true" />
          <button
            disabled={isSubmitting}
            className="button buttonPrimary"
            type="submit"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

RequestACourse.propTypes = {
  courses: PropTypes.array.isRequired,
}

export default RequestACourse
