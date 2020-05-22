import React from "react"
import { Button } from "../../Button"

export const RequestNearYou = () => (
  <section className="sidebarItem">
    <h3 className="title">No bookings</h3>
    <p className="sideNote">
      We haven&apos;t planned the next event for this course yet, make sure
      it&apos;s near you when we do!
    </p>
    <Button styles="buttonPrimary iconLeft iconArrow" to="/request-a-course/">
      Request this course
    </Button>
  </section>
)
