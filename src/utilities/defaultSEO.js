export const defaultSEO = (title, description, location) => ({
  title: title,
  description: description,
  canonical_href: location,
  og_type: "",
  og_url: location,
  schema_json_string: "",
  image: { absolutePath: "" },
})
