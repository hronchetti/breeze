import React from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import Chevron from "../../images/icons/chevron--scalable.svg"
import { ReactSVG } from "react-svg"

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const FaqElement = React.useRef(null)

  const toggleFaq = () => {
    const FaqBody = FaqElement.current
    const FaqBodyHeight = FaqBody.scrollHeight

    if (FaqBody.style.maxHeight) {
      FaqBody.style.maxHeight = null
      setIsOpen(false)
    } else {
      FaqBody.style.maxHeight = FaqBodyHeight + "px"
      setIsOpen(true)
    }
  }
  return (
    <div className="faq">
      <button className="faqButton" onClick={() => toggleFaq()}>
        <h4>{question}</h4>
        <ReactSVG
          className={`faqButtonIcon${isOpen ? " active" : ""}`}
          src={Chevron}
        />
      </button>
      <section className="faqAnswer" ref={FaqElement}>
        <div className="faqAnswerContent">
          <ReactMarkdown source={answer} />
        </div>
      </section>
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
