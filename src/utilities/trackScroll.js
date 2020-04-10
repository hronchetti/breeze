export const trackScroll = setScrollY => {
  let last_known_scroll_position = 0
  let ticking = false

  window.addEventListener("scroll", e => {
    last_known_scroll_position = window.scrollY
    console.log(e)
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setScrollY(last_known_scroll_position)
        console.log(last_known_scroll_position)
        ticking = false
      })

      ticking = true
    }
  })
}
