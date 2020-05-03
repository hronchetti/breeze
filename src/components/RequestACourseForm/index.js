import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { Formik, Form, Field } from "formik"
import axios from "axios"
import qs from "qs"
import PropTypes from "prop-types"
import { Link } from "react-scroll"

import { Input, TextArea, Select, Toast } from "../Form"

const RequestACourse = ({ courses }) => {
  const [coursesForSelect, setCourses] = useState([])
  const [toast, setToast] = useState({
    message: "",
    visible: false,
    type: true,
  })

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
          course: "",
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
          course: Yup.string().required("Required"),
          location: Yup.string().required("Required"),
          message: Yup.string(),
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
            <Select label="Course" name="course" options={coursesForSelect} />
            <Input
              label="Location"
              name="location"
              type="text"
              placeholder="Where should the course be held?"
            />
            <TextArea
              label="Message"
              name="message"
              rows={4}
              optional="true"
              placeholder="Any extra information that might help us organise the course"
            />
            <section className="headerButtons">
              <button
                disabled={isSubmitting}
                className="button buttonPrimary"
                type="submit"
              >
                Request course
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

RequestACourse.propTypes = {
  courses: PropTypes.array.isRequired,
}

export default RequestACourse
