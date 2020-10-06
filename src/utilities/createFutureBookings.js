import Moment from "moment"

export const createFutureBookings = allBookings => {
  return allBookings.filter(booking =>
    Moment(booking.node.start_date).isAfter()
  )
}
