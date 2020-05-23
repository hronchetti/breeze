import Moment from "moment"

export const convertToAmPmTime = time => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ]

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1) // Remove full string match value
    const fakeDate = new Date()
    fakeDate.setHours(parseInt(time[0]), parseInt(time[2]))
    return Moment(fakeDate).format("h:mma")
  }
  return time
}
