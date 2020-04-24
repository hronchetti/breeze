import React from "react"
import PropTypes from "prop-types"
import { useField } from "formik"

export const Checkbox = props => {
  const [field, meta, form] = useField(props)

  return (
    <div className="checkboxWrapper">
      <input
        className={meta.touched && meta.error ? "error" : ""}
        name={props.name}
        type="checkbox"
        onChange={v => form.setValue(v ? 1 : 0)}
        onBlur={() => form.setTouched(true)}
        {...field}
        {...props}
      />
      <span className="checkbox"></span>
      <label htmlFor={props.name}>{props.label}</label>
      <span className="errorText">{meta.touched ? meta.error : ""}</span>
    </div>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}
