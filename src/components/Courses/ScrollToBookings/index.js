import React from "react"
import { Link } from "react-scroll"

export const ScrollToBookings = () => {
  return (
    <section className="sidebarItem">
      <h3 className="title">Take this course</h3>
      <p className="sideNote">
        View our bookings to see if we&apos;re holding an event near you
      </p>
      <Link
        className="button buttonPrimary"
        spy={true}
        to="bookings"
        smooth={true}
        offset={-112}
        duration={500}
      >
        View bookings
      </Link>
    </section>
  )
}
