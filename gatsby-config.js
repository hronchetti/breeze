module.exports = {
  siteMetadata: {
    title: `Breeze`,
    description: `Online courses and face-to-face training for Healthcare professionals, view our courses now to see how you can maximise your career potential today.`,
    author: `Dr. Carl Clarkson`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-eslint`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://breeze-academy.herokuapp.com`,
        contentTypes: [
          `blog-article-topics`,
          `blog-articles`,
          `course-topics`,
          `course-bookings`,
          `courses`,
          `resources`,
        ],
        singleTypes: [
          `homepage`,
          `contact-us`,
          `about`,
          `resources-page`,
          `blog-page`,
          `request-a-course`,
          `terms-and-conditions`,
          `privacy-policy`,
        ],
        queryLimit: 1000,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Breeze Academy`,
        short_name: `Breeze`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/images/breeze-logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: `https://hotmail.us9.list-manage.com/subscribe/post?u=e9728b56d79222d6a4f34a26d&amp;id=eec00e0717`, // add your MC list endpoint here; see instructions below
      },
    },
    `gatsby-plugin-offline`,
  ],
}
