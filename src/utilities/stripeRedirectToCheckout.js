import { loadStripe } from "@stripe/stripe-js/pure"
import { coursePaymentSuccess, coursePaymentFailed } from "."

export const stripeRedirectToCheckout = async (stripeProduct, bookingId) => {
  const stripe = await loadStripe(process.env.GATSBY_STRIPE)
  await stripe
    .redirectToCheckout({
      lineItems: [{ price: stripeProduct, quantity: 1 }],
      mode: "payment",
      successUrl: "https://breeze.academy" + coursePaymentSuccess(bookingId),
      cancelUrl: "https://breeze.academy" + coursePaymentFailed(bookingId),
    })
    .catch((e) => {
      console.log(e, e.response)
    })
}
