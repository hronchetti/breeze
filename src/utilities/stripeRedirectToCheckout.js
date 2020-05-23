import { loadStripe } from "@stripe/stripe-js"

import { coursePaymentSuccess, coursePaymentFailed } from "./"

const stripePromise = loadStripe("pk_live_J12GUSpNDvSBoKImEzslnzjC00ppZQgzEW")

export const redirectToCheckout = async (
  stripeProduct,
  bookingId,
  location
) => {
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({
    items: [{ sku: stripeProduct, quantity: 1 }],
    successUrl: location.origin + coursePaymentSuccess(bookingId),
    cancelUrl: location.origin + coursePaymentFailed(bookingId),
  })
  if (error) {
    console.warn("Error:", error)
  }
}
