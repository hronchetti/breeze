import React from "react"
import PropTypes from "prop-types"
import { useField } from "formik"

export const TextArea = props => {
  const [field, meta] = useField(props)

  return (
    <div className="textAreaWrapper">
      <label htmlFor={props.name}>
        <span>{props.label}</span>
        {props.optional === "true" ? (
          <span className="optional">Optional</span>
        ) : (
          ""
        )}
      </label>
      <div className="textArea">
        <textarea
          rows={props.rows}
          name={props.name}
          {...field}
          {...props}
          placeholder={props.placeholder}
          id={props.name}
        ></textarea>
        <span
          className={`selector${meta.touched && meta.error ? " error" : ""}`}
        ></span>
      </div>
      <span className="errorText">{meta.touched ? meta.error : ""}</span>
    </div>
  )
}

TextArea.defaultProps = {
  optional: "false",
  placeholder: "",
  rows: 3,
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  optional: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
}
