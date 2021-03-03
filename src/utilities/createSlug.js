module.exports = {
  blogArticleSlug: (slug) => {
    return `/blog/${slug}/`
  },
  courseTopicSlug: (slug) => {
    return `/courses/${slug}/`
  },
  courseSlug: (courseTopicSlug, courseSlug) => {
    return `/courses/${courseTopicSlug}/${courseSlug}/`
  },
  courseBookingSlug: (courseTopicSlug, courseSlug, bookingId) => {
    return `/courses/${courseTopicSlug}/${courseSlug}/?booking=${bookingId}`
  },
  coursePaymentSuccess: (bookingId) => {
    return `/payment-succeeded/booking/${bookingId}/`
  },
  coursePaymentFailed: (bookingId) => {
    return `/payment-failed/booking/${bookingId}/`
  },
}
