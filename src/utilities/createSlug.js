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
  courseBookingSlug: (courseTopic, courseName, bookingId) => {
    return `/courses/${createSlug(courseTopic)}/${createSlug(
      courseName
    )}/${bookingId}`
  },
}
