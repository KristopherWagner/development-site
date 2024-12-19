module.exports = {
  siteMetadata: {
    title: 'kwagner development site',
    description: 'Development website for Kristopher Wagner',
    author: '@KristopherWagner',
    siteUrl: `localhost:8000`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
  ],
};
