import PropTypes from "prop-types"
import Moment from "moment"

const createBookingDates = teachingPeriods => {
  let bookingDates = []
  let multipleTeachingPeriods = false

  if (teachingPeriods.length > 1) {
    multipleTeachingPeriods = true
  }

  console.log(multipleTeachingPeriods)

  teachingPeriods.forEach(teachingPeriod => {
    const startDate = Moment(teachingPeriod.start).format("Do")
    const startMonth = Moment(teachingPeriod.start).format("MMM")
    const startYear = Moment(teachingPeriod.start).format("YYYY")

    const endDate = Moment(teachingPeriod.end).format("Do")
    const endMonth = Moment(teachingPeriod.end).format("MMM")
    const endYear = Moment(teachingPeriod.end).format("YYYY")

    if (startYear === endYear) {
      if (startMonth === endMonth) {
        if (startDate === endDate) {
          bookingDates.push(startDate + " " + startMonth + " " + startYear)
        } else {
          bookingDates.push(
            startDate + "-" + endDate + " " + startMonth + " " + startYear
          )
        }
      } else {
        bookingDates.push(
          startDate +
            " " +
            startMonth +
            " - " +
            endDate +
            " " +
            endMonth +
            " " +
            startYear
        )
      }
    } else {
      bookingDates.push(
        startDate +
          " " +
          startMonth +
          " " +
          startYear +
          " - " +
          endDate +
          " " +
          endMonth +
          " " +
          endYear
      )
    }
  })

  if (multipleTeachingPeriods && bookingDates.length > 1) {
    bookingDates = bookingDates.join(", ")
  }

  return bookingDates
}

export default createBookingDates

createBookingDates.propTypes = {
  teachingPeriods: PropTypes.array.isRequired,
}
