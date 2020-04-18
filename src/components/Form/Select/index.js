import React from "react"
import PropTypes from "prop-types"
import ReactSelect from "react-select"
import { useField } from "formik"

export const Select = props => {
  const [field, meta, form] = useField(props)

  return (
    <div className="SelectWrapper">
      <label htmlFor={props.name}>
        <span>{props.label}</span>
        {props.optional === "true" ? (
          <span className="optional">Optional</span>
        ) : (
          ""
        )}
      </label>
      <div className="select">
        <ReactSelect
          {...field}
          {...props}
          type="select"
          classNamePrefix="reactSelect"
          options={props.options}
          placeholder={props.placeholder}
          onChange={opt => form.setValue(opt.value)}
          onBlur={() => form.setTouched(true)}
          value={props.options.find(opt => opt.value === field.value)}
          theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: "#006cf9",
            },
          })}
        />
        <span
          className={`selector${meta.touched && meta.error ? " error" : ""}`}
        ></span>
      </div>
      <span className="errorText">{meta.touched ? meta.error : ""}</span>
    </div>
  )
}

Select.defaultProps = {
  optional: "false",
  placeholder: "Please select...",
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  optional: PropTypes.string,
  placeholder: PropTypes.string,
}
