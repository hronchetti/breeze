import React from "react"
import PropTypes from "prop-types"
import { useField } from "formik"

export const Input = props => {
  const [field, meta] = useField(props)

  return (
    <div className="input">
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
      <input name={props.name} {...field} {...props} />
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
