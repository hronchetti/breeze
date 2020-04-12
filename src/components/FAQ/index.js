import React, { useState } from "react"
import PropTypes from "prop-types"

const FAQ = ({ question, answer }) => {
  const [questionShown, setQuestionShown] = useState(false)
  return (
    <div
      className={`faq ${questionShown ? "active" : ""}`}
      onClick={() => setQuestionShown(!questionShown)}
      role="button"
      tabIndex="0"
      onKeyDown={e =>
        e.keyCode == 13 ? setQuestionShown(!questionShown) : null
      }
    >
      <span className="control"></span>
      <div>
        <h4>{question}</h4>
        <section className="answer">
          <p>{answer}</p>
        </section>
      </div>
    </div>
  )
}

FAQ.defaultProps = {
  question: "",
  answer: "",
}

FAQ.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
}

export default FAQ
