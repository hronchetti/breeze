function createSlug(text) {
  text = text.replace(/\s+/g, "-").toLowerCase()
  return text
}

module.exports = {
  blogArticleSlug: title => {
    return `/blog/${createSlug(title)}`
  },
  courseTopicSlug: name => {
    return `/courses/${createSlug(name)}`
  },
  courseSlug: (courseTopic, courseName) => {
    return `/courses/${createSlug(courseTopic)}/${createSlug(courseName)}`
  },
  courseBookingSlug: (courseTopic, courseName, bookingId) => {
    return `/courses/${createSlug(courseTopic)}/${createSlug(
      courseName
    )}?booking=${bookingId}`
  },
  coursePaymentSuccess: bookingId => {
    return `/courses/payment-succeeded/${bookingId}`
  },
  coursePaymentFailed: bookingId => {
    return `/courses/payment-failed/${bookingId}`
  },
}
