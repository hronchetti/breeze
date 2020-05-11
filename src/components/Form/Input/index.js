import React from "react"
import PropTypes from "prop-types"
import { useField } from "formik"

export const Input = props => {
  const [field, meta] = useField(props)

  return (
    <div className="inputWrapper">
      {props.label ? (
        <label htmlFor={props.name}>
          <span>{props.label}</span>
          {props.optional === "true" ? (
            <span className="optional">Optional</span>
          ) : (
            ""
          )}
        </label>
      ) : (
        ""
      )}
      <div className="input">
        <input name={props.name} {...field} {...props} id={props.name} />
        <span
          className={`selector${meta.touched && meta.error ? " error" : ""}`}
        ></span>
      </div>
      <span className="errorText">{meta.touched ? meta.error : ""}</span>
    </div>
  )
}

Input.defaultProps = {
  label: "",
  optional: "false",
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  optional: PropTypes.string,
}
