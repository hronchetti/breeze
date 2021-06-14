import "./src/style/main.scss"

const initLegalMonster = () => {
  !(function () {
    var i,
      e,
      t,
      s = (window.legal = window.legal || [])
    if (
      ((s.SNIPPET_VERSION = "3.0.0"),
      (i = "https://widgets.legalmonster.com/v1/legal.js"),
      !s.__VERSION__)
    )
      if (s.invoked)
        window.console &&
          console.info &&
          console.info(
            "legal.js: The initialisation snippet is included more than once on this page, and does not need to be."
          )
      else {
        for (
          s.invoked = !0,
            s.methods = [
              "cookieConsent",
              "document",
              "ensureConsent",
              "handleWidget",
              "signup",
              "user",
            ],
            s.factory = function (t) {
              return function () {
                var e = Array.prototype.slice.call(arguments)
                return e.unshift(t), s.push(e), s
              }
            },
            e = 0;
          e < s.methods.length;
          e++
        )
          (t = s.methods[e]), (s[t] = s.factory(t))
        ;(s.load = function (e, t) {
          var n,
            o = document.createElement("script")
          o.setAttribute("data-legalmonster", "sven"),
            (o.type = "text/javascript"),
            (o.async = !0),
            (o.src = i),
            (n = document.getElementsByTagName(
              "script"
            )[0]).parentNode.insertBefore(o, n),
            (s.__project = e),
            (s.__loadOptions = t || {})
        }),
          (s.widget = function (e) {
            s.__project || s.load(e.widgetPublicKey), s.handleWidget(e)
          })
      }
  })()

  legal.widget({
    type: "cookie",
    widgetPublicKey: "QNo77mTLjPaZJ9om4wgvQLsr",
  })
}

export const onClientEntry = () => {
  initLegalMonster()
}
