module.exports = {
  createSlug: function(title) {
    title = title.replace(/\s+/g, "-").toLowerCase()
    return title
  },
}
